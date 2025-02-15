import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import FeedBackModal from "../../../../components/Moderator/FeedBackModal";
import DetailsModal from "../../../../components/Moderator/DetailsModal";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ApplicationCard = ({ application, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [feedBackOn, setFeedBackOn] = useState(false);
  const {
    _id,
    userName,
    applicantPhoto,
    email,
    degree,
    hsc,
    ssc,
    phone,
    status,
    applyDate,
  } = application;

  //   details
  const handleDetails = () => {
    setDetailsOpen(true);
  };
  const detailClose = () => {
    setDetailsOpen(false);
  };
  //   feedback
  const handleFeedback = () => {
    setFeedBackOn(true);
  };
  const closeFeedBack = () => {
    setFeedBackOn(false);
  };

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.patch(
            `/application/status/${id}`,
            { status: "rejected" }
          );
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Successful",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        }
      }
    });
  };
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-black border border-gray-200 rounded-xl shadow-md overflow-hidden p-4">
      <div className="flex items-center">
        <img
          className="w-16 h-16 rounded-full border-2 border-gray-300"
          src={applicantPhoto}
        />
        <div className="ml-4">
          <h3 className="text-lg font-bold">{userName}</h3>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>
          <span className="font-bold">Phone:</span> {phone}
        </p>

        <p>
          <span className="font-bold">Degree:</span> {degree}
        </p>
        <p>
          <span className="font-bold">HSC:</span> {hsc}
        </p>
        <p>
          <span className="font-bold">SSC:</span> {ssc}
        </p>

        <p>
          <span className="font-bold">Applied Date:</span>{" "}
          {new Date(applyDate).toLocaleString()}
        </p>
        <p>
          <span className="font-bold">Status:</span>{" "}
          <span
            className={` ${
              status === "pending"
                ? "text-yellow-600 "
                : status === "processing"
                ? "text-blue-600"
                : status === "completed"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status}
          </span>
        </p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handleDetails}
          className="btn btn-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Details
        </button>
        <button
          onClick={handleFeedback}
          className="btn btn-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center "
        >
          <span>Feedback</span>
          <FaEdit />
        </button>
        <button
          onClick={() => handleCancel(_id)}
          className="btn btn-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center "
        >
          <span>Cancel</span>
          <MdDeleteForever />
        </button>
      </div>
      <DetailsModal
        detailsOpen={detailsOpen}
        detailClose={detailClose}
        application={application}
      />
      <FeedBackModal
        feedBackOn={feedBackOn}
        closeFeedBack={closeFeedBack}
        id={application._id}
      />
    </div>
  );
};
ApplicationCard.propTypes = {
  application: PropTypes.object,
  refetch: PropTypes.func.isRequired,
};

export default ApplicationCard;
