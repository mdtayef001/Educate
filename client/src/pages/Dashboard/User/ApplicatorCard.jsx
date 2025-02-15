import PropTypes from "prop-types";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DetailModal from "../../../components/Modal/DetailModal";
import EditModal from "../../../components/Modal/EditModal";
import ReviewModal from "../../../components/Modal/ReviewModal";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ApplicatorCard = ({ application, refetch }) => {
  let [detailsOpen, setDetailsOpen] = useState(false);
  let [editOpen, setEditOpen] = useState(false);
  let [reviewOpen, setReviewOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // details
  const handleDetails = () => {
    setDetailsOpen(true);
  };
  const detailClose = () => {
    setDetailsOpen(false);
  };

  // edit
  const handleEdit = () => {
    setEditOpen(true);
  };

  const editClose = () => {
    setEditOpen(false);
  };

  //delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/application/${id}`);
          if (data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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

  // review
  const handleReview = () => {
    setReviewOpen(true);
  };

  const reviewClose = () => {
    setReviewOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-4 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          {application.universityName}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">
            Address: <span>{application.universityAddress.country}</span>,{" "}
            <span>{application.universityAddress.city}</span>
          </span>{" "}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Feedback:</span>{" "}
          {application.feedback || "No feedback provided"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Category:</span>{" "}
          {application.subjectCategory}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Degree:</span>{" "}
          {application.appliedDegree}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Application Fees:</span> $
          {application.applicationFees}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Service Charge:</span> $
          {application.serviceCharge}
        </p>
        <p
          className={`text-sm font-medium mb-4 ${
            application.applicationStatus === "pending"
              ? "text-yellow-500"
              : application.status === "processing"
              ? "text-blue-500"
              : application.status === "completed"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          Status: {application.applicationStatus}
        </p>
        <div className="flex space-x-4">
          <div className="space-y-3">
            <button
              onClick={() => handleDetails()}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Details
            </button>
            <button
              onClick={() => handleEdit()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
            >
              <span className="flex items-center gap-3">
                Edit
                <FaEdit />
              </span>
            </button>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleDelete(application._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              <span className="flex items-center gap-3">
                Cancel
                <MdDeleteForever />
              </span>
            </button>
            <button
              onClick={() => handleReview()}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add Review
            </button>
          </div>
        </div>
        {/* modals */}
        <DetailModal
          application={application}
          detailsOpen={detailsOpen}
          detailClose={detailClose}
        />
        <EditModal
          application={application}
          editOpen={editOpen}
          editClose={editClose}
          refetch={refetch}
        />
        <ReviewModal
          reviewOpen={reviewOpen}
          reviewClose={reviewClose}
          application={application}
        />
      </div>
    </>
  );
};

ApplicatorCard.propTypes = {
  application: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ApplicatorCard;
