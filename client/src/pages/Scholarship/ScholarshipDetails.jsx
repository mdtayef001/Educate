import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";
import { MdLocationPin } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import Reviews from "./Reviews";
import SectionTitle from "../../components/SectionTitle";
import useScholarshipDetails from "../../hooks/useScholarshipDetails";

const ScholarshipDetails = () => {
  const { id } = useParams();

  const [scholarDetails, isLoading] = useScholarshipDetails(id);
  const {
    _id,
    name,
    image,
    description,
    location,
    category,
    subject,
    fees,
    deadline,
    stipend,
    postDate,
    serviceCharge,
    degree,
    scholarship_name,
  } = scholarDetails;

  const stringDate = Date(postDate).toString().split("T")[0];

  if (isLoading) return <Loading />;

  return (
    <section className="mt-5 lg:my-10">
      <Helmet>
        <title>Educate | scholarships Details</title>
      </Helmet>
      <div className="p-4">
        <div>
          {/* logo section */}
          <div className="max-w-screen-md mx-auto text-center">
            <div className="w-44 h-44 mx-auto mb-5 bg-gray-800 rounded-full p-2 border shadow-md">
              <img className="w-full " src={image} alt="" />
            </div>
            <p className="text-2xl font-bold">{name}</p>
            <p className="mt-2 flex items-center justify-center gap-2">
              <MdLocationPin className="text-lg text-[#4169e1]" />
              {location.country}, {location.city}
            </p>
          </div>
          {/* others */}
          <div className="lg:w-[70%] mx-auto bg-gray-50 dark:bg-[#191e24] lg:p-10 p-2 rounded-lg shadow-sm mt-10">
            <div className="space-y-5">
              <p className="lg:text-center lg:text-lg">{description}</p>
              <div className="lg:flex items-center justify-between space-y-5 lg:space-y-0 lg:border border-gray-700 lg:p-2 lg:rounded-md">
                <p className="">
                  <b>Scholarship Name</b>: {scholarship_name}
                </p>
                <p className="">
                  <b>Degree</b>: {degree}
                </p>
              </div>
              <div className="lg:flex items-center justify-between space-y-5 lg:space-y-0 lg:border border-gray-700 lg:p-2 lg:rounded-md">
                <p className="">
                  <b>Scholarship category</b>: {category}
                </p>
                <p className="">
                  <b>Subject Name</b>: {subject}
                </p>
              </div>
              <div className="lg:flex items-center justify-between space-y-5 lg:space-y-0 lg:border border-gray-700 lg:p-2 lg:rounded-md">
                <p className="">
                  <b>Post Date</b>: {stringDate}
                </p>
                <p className="">
                  <b>Stipend</b>: {stipend ? stipend : "Not Available"}
                </p>
              </div>
              <div className="lg:flex items-center justify-between space-y-5 lg:space-y-0 lg:border border-gray-700 lg:p-2 lg:rounded-md">
                <p className="">
                  <b>Application Fees</b>: ${fees}
                </p>

                <p className="">
                  <b>Service Charge</b>: ${serviceCharge}
                </p>
              </div>
              <p className="">
                <b className="text-[#4169e1]">Application Deadline</b>:{" "}
                {deadline}
              </p>
              <div className="text-center">
                <Link
                  to={`/payment/${_id}`}
                  className="mt-3 btn bg-[#4169e1] text-white border-none hover:bg-[#3b5ec9]"
                >
                  Apply Scholarship <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* reviews */}
      <div className="lg:mt-10 mt-5 p-4 ">
        <SectionTitle heading={"reviews"} />
        <Reviews />
      </div>
    </section>
  );
};

export default ScholarshipDetails;
