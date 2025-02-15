import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./checkout.css";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { addUserToDB, imgUpload } from "../../api/utils";

const CheckoutForm = ({ scholarShipID, scholarDetails }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // payment
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", scholarShipID)
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [axiosSecure, scholarShipID]);

  const handlePayment = async (event) => {
    // Block native form submission.
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } else if (paymentMethod) {
      // confirm card
      const { paymentIntent, err } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email,
              name: user?.displayName,
            },
          },
        }
      );
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Payment Successfully done",
          showConfirmButton: false,
          timer: 1500,
        });
        setTransactionId(paymentIntent.id);
        setIsPaid(true);
        setLoading(false);
      }
    }
  };

  const date = scholarDetails.deadline;
  const deadline = new Date(date).getTime();

  // application

  const { _id, category, name, subject } = scholarDetails;

  const handleApply = async (data) => {
    const { _id: userID } = await addUserToDB(user?.email);
    const image = data.image[0];
    const applicantPhoto = await imgUpload(image);

    const applicantInfo = {
      userName: user.displayName,
      applicantPhoto,
      phone: parseInt(data.phone),
      address: {
        country: data.country,
        district: data.district,
        village: data.village,
      },
      degree: data.degree,
      gender: data.gender,
      hsc: data.hsc,
      ssc: data.ssc,
      studyGap: data.studyGap,
      scholarshipID: _id,
      category,
      universityName: name,
      subject,
      email: user.email,
      userID,
      transactionId,
      deadline,
    };

    const res = await axiosSecure.post("/apply", applicantInfo);
    if (res.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Application Successfully Applied",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      navigate("/dashboard/my-application");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong",
      });
    }
  };

  return (
    <section className="mt-10">
      {/* payment from */}
      <div className="mt-10 p-4 mb-20">
        <form onSubmit={handlePayment}>
          <h1 className="mb-5 lg:mb-20 text-[#4169e1] text-center text-2xl lg:text-3xl font-bold">
            Pay the Application fees for Apply Scholarship
          </h1>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div className="text-center mt-5">
            <button
              className="btn text-lg font-bold text-white bg-[#4169e1] hover:bg-[#2f51b8]"
              type="submit"
              disabled={!stripe || isPaid}
            >
              Pay
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                ""
              )}
            </button>
          </div>
        </form>
        {/* user info field */}
        {isPaid ? (
          <div className="max-w-4xl mx-auto p-8 text-black dark:text-white dark:bg-[#191e24] shadow-md rounded-md mt-10 ">
            <h2 className="text-2xl font-bold mb-6">Scholarship Application</h2>
            <form onSubmit={handleSubmit(handleApply)} className="space-y-4">
              {/* Applicant's Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Applicant&apos;s Phone Number*
                </label>
                <input
                  type="number"
                  placeholder="+880-0120020"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Applicant Photo */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Applicant Photo*
                </label>
                <input
                  type="file"
                  {...register("image", { required: "Photo is required" })}
                  className="file-input file-input-bordered file-input-[#4169e1]  w-full max-w-xs"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              {/* Applicant Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Applicant Address*
                </label>
                <div className="lg:flex items-center justify-between gap-4">
                  <div className="w-full">
                    <input
                      {...register("village", {
                        required: "Village is required",
                      })}
                      placeholder="Village"
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#4169e1] transition-colors duration-300"
                      type="text"
                    />
                    {errors.village && (
                      <p className="text-red-500 text-sm">
                        {errors.village.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      {...register("district", {
                        required: "District is required",
                      })}
                      type="text "
                      placeholder="District"
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#4169e1] transition-colors duration-300"
                    />
                    {errors.district && (
                      <p className="text-red-500 text-sm">
                        {errors.district.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <input
                      {...register("country", {
                        required: "Country is required",
                      })}
                      type="text"
                      placeholder="Country"
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#4169e1] transition-colors duration-300"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm">
                        {errors.country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Applicant Gender */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Applicant Gender*
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Applicant Applying Degree */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Applicant Applying Degree*
                </label>
                <select
                  {...register("degree", { required: "Degree is required" })}
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                >
                  <option value="">Select Degree</option>
                  <option value="diploma">Diploma</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="masters">Masters</option>
                </select>
                {errors.degree && (
                  <p className="text-red-500 text-sm">
                    {errors.degree.message}
                  </p>
                )}
              </div>

              {/* SSC Result */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  SSC Result*
                </label>
                <input
                  type="text"
                  placeholder="GPA"
                  {...register("ssc", { required: "SSC result is required" })}
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                />
                {errors.ssc && (
                  <p className="text-red-500 text-sm">{errors.ssc.message}</p>
                )}
              </div>

              {/* HSC Result */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  HSC Result*
                </label>
                <input
                  type="text"
                  placeholder="GPA"
                  {...register("hsc", { required: "HSC result is required" })}
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                />
                {errors.hsc && (
                  <p className="text-red-500 text-sm">{errors.hsc.message}</p>
                )}
              </div>

              {/* Study Gap */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Study Gap (Optional)
                </label>
                <select
                  {...register("studyGap")}
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                >
                  <option value="">No Gap</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2 Years</option>
                  <option value="3-years">3 Years</option>
                </select>
              </div>

              {/* University Name (Read-only) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  University Name
                </label>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                />
              </div>

              {/* Scholarship Category (Read-only) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Scholarship Category
                </label>
                <input
                  type="text"
                  value={category}
                  readOnly
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                />
              </div>

              {/* Subject Category (Read-only) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject Category
                </label>
                <input
                  type="text"
                  value={subject}
                  readOnly
                  className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

CheckoutForm.propTypes = {
  scholarShipID: PropTypes.object,
  scholarDetails: PropTypes.object,
};

export default CheckoutForm;
