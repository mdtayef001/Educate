import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SK_KEY);
// middleware
app.use(
  cors({
    origin: [
      "https://educate-23aca.web.app",
      "https://educate-23aca.firebaseapp.com",
      // "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a4nf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // data base
    const scholarshipsCollection = client
      .db("educate")
      .collection("scholarships");
    const reviewsCollection = client.db("educate").collection("reviews");
    const usersCollection = client.db("educate").collection("users");
    const applicationsCollection = client
      .db("educate")
      .collection("applications");

    // jwt
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.send(token);
    });

    // admin stats
    app.get("/admin-stats", async (req, res) => {
      const users = await usersCollection.estimatedDocumentCount();
      const application = await applicationsCollection.estimatedDocumentCount();
      const scholarship = await scholarshipsCollection.estimatedDocumentCount();
      const adminChart = [
        { name: "Users", count: users },
        { name: "Applications", count: application },
        { name: "Scholarships", count: scholarship },
      ];
      res.send(adminChart);
    });

    // users apis
    // get all the user
    app.get("/users", async (req, res) => {
      const role = req.query.role;
      const sortQuery = {};

      if (role) {
        sortQuery.role = role;
      }

      const result = await usersCollection.find(sortQuery).toArray();
      res.send(result);
    });

    // checking the role of a user
    app.get("/users/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      res.send({ role: result.role });
    });

    // checking  the user exist and if no insert user
    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const userInfo = req.body;
      const query = { email };
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send({ _id: isExist._id });
      }
      const result = await usersCollection.insertOne({
        ...userInfo,
        role: "user",
        timeStamp: Date.now(),
      });
      res.send(result);
    });

    // update user role
    app.patch("/users/role/:id", async (req, res) => {
      const id = req.params.id;
      const { role } = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // scholarships apis for all data
    app.get("/scholarships", async (req, res) => {
      const { search } = req.query;
      const result = await scholarshipsCollection
        .find({
          $or: [
            { scholarship_name: { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
            { degree: { $regex: search, $options: "i" } },
          ],
        })
        .toArray();
      res.json(result);
    });

    // scholarship api for limit data and sorting
    app.get("/scholarships_limit", async (req, res) => {
      const result = await scholarshipsCollection
        .find()
        .sort({ fees: 1, postDate: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    // get api fetch data by id
    app.get("/scholarships_details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await scholarshipsCollection.findOne(query);
      res.json(result);
    });

    app.post("/scholarships", async (req, res) => {
      const addInfo = req.body;
      const result = await scholarshipsCollection.insertOne(addInfo);
      res.send(result);
    });

    // patch api by id
    app.patch("/scholarships-update", async (req, res) => {
      const id = req.body.id;
      const updateInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          name: updateInfo.universityName,

          image: updateInfo.image,
          category: updateInfo.scholarshipCategory,

          location: updateInfo.address,
          deadline: updateInfo.applicationDeadline,
          subject: updateInfo.subjectCategory,
          fees: updateInfo.applicationFees,
          description: updateInfo.description,
          postDate: updateInfo.updateTime,
          serviceCharge: updateInfo.serviceCharge,
          degree: updateInfo.degree,
          scholarship_name: updateInfo.scholarshipName,
          rank: updateInfo.universityRank,
          stipend: updateInfo.tuitionFees,
        },
      };
      const result = await scholarshipsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // delete api
    app.delete("/scholarships/delete/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await scholarshipsCollection.deleteOne(query);
      res.send(result);
    });

    // application api

    app.get("/application", async (req, res) => {
      const sort = req.query.sort;
      const sortQuery = {};

      // Define sorting based on the `sort` query parameter
      if (sort === "appliedDate") {
        sortQuery.applyDate = 1; // Ascending order
      } else if (sort === "deadline") {
        sortQuery.deadline = 1; // Ascending order
      }
      const aggregationPipeline = [
        {
          $addFields: {
            scholarshipID: { $toObjectId: "$scholarshipID" },
          },
        },
        {
          $lookup: {
            from: "scholarships",
            localField: "scholarshipID",
            foreignField: "_id",
            as: "appliedDetails",
          },
        },
        {
          $unwind: "$appliedDetails",
        },
        {
          $project: {
            _id: 1,
            phone: 1,
            degree: 1,
            gender: 1,
            hsc: 1,
            ssc: 1,
            address: 1,
            applicantPhoto: 1,
            phone: 1,
            userName: 1,
            email: 1,
            applyDate: 1,
            status: 1,
            deadline: 1,
            universityName: "$universityName",
            category: "$appliedDetails.category",
          },
        },
      ];

      if (Object.keys(sortQuery).length > 0) {
        aggregationPipeline.push({ $sort: sortQuery });
      }
      const result = await applicationsCollection
        .aggregate(aggregationPipeline)
        .toArray();
      res.send(result);
    });

    // -> get the application data for a specific user
    app.get("/application/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await applicationsCollection
        .aggregate([
          {
            $match: query,
          },
          {
            $addFields: {
              scholarshipID: { $toObjectId: "$scholarshipID" },
            },
          },
          {
            $lookup: {
              from: "scholarships",
              localField: "scholarshipID",
              foreignField: "_id",
              as: "appliedDetails",
            },
          },
          {
            $unwind: "$appliedDetails",
          },
          {
            $project: {
              _id: 1,
              phone: 1,
              degree: 1,
              gender: 1,
              hsc: 1,
              ssc: 1,
              address: 1,
              universityName: "$universityName",
              universityAddress: "$appliedDetails.location",
              applicationFeedback: {
                $ifNull: ["$feedback", "No feedback provided"],
              },
              subjectCategory: "$appliedDetails.subject",
              appliedDegree: "$degree",
              applicationFees: "$appliedDetails.fees",
              serviceCharge: "$appliedDetails.serviceCharge",
              applicationStatus: "$status",
              scholarship_name: "$appliedDetails.scholarship_name",
            },
          },
        ])
        .toArray();

      res.send(result);
    });

    // application post api
    app.post("/apply", async (req, res) => {
      const appliedData = req.body;
      const result = await applicationsCollection.insertOne({
        ...appliedData,
        status: "pending",
        applyDate: Date.now(),
      });
      res.send(result);
    });

    // application update api
    app.patch("/application/:id", async (req, res) => {
      const id = req.params.id;
      const updateInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const newAddress = updateInfo.address;
      const updateDoc = {
        $set: {
          applicantPhoto: updateInfo.newImage,
          phone: updateInfo.phone,
          address: newAddress,
          degree: updateInfo.degree,
          gender: updateInfo.gender,
          hsc: updateInfo.hsc,
          ssc: updateInfo.ssc,
        },
      };
      const result = await applicationsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // status and feedback  update api
    app.patch("/application/status/:id", async (req, res) => {
      const id = req.params.id;
      const updateInfo = req.body;
      const query = { _id: new ObjectId(id) };
      if (updateInfo.status) {
        const updateDoc = {
          $set: {
            status: updateInfo.status,
          },
        };
        const result = await applicationsCollection.updateOne(query, updateDoc);
        return res.send(result);
      }
      if (updateInfo.feedback) {
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            feedback: updateInfo.feedback,
          },
        };
        const result = await applicationsCollection.updateOne(
          query,
          updateDoc,
          options
        );
        return res.send(result);
      }
      res.send({ message: "Noting" });
    });

    // application delete  api
    app.delete("/application/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await applicationsCollection.deleteOne(query);
      res.send(result);
    });

    // reviews api
    app.get("/reviews", async (req, res) => {
      // const result = await reviewsCollection.find().toArray();
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    app.get("/reviews/:email", async (req, res) => {
      const email = req.params.email;
      const result = await reviewsCollection.find({ email }).toArray();
      res.send(result);
    });
    // post reviews api
    app.post("/reviews", async (req, res) => {
      const reviewData = req.body;
      const result = await reviewsCollection.insertOne(reviewData);
      res.send(result);
    });

    // reviews edit api
    app.patch("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          review_date: updateData?.review_date,
          rating_point: updateData?.rating_point,
          reviewer_comments: updateData?.reviewer_comments,
        },
      };
      const result = await reviewsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // delete api for reviews
    app.delete("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    });

    // payment apis
    app.post("/create-payment-intent", async (req, res) => {
      const { id } = req.body;

      const scholarships = await scholarshipsCollection.findOne({
        _id: new ObjectId(id),
      });
      const price = scholarships.fees;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({ clientSecret: paymentIntent.client_secret });
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
