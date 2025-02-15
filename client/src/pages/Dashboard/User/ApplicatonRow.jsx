import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DetailModal from "../../../components/Modal/DetailModal";
import { useState } from "react";
import EditModal from "../../../components/Modal/EditModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ReviewModal from "../../../components/Modal/ReviewModal";

const ApplicatonRow = ({ application, refetch }) => {
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
    <tr className="border">
      <td className="text-lg border p-2">{application.universityName}</td>
      <td className="text-lg border p-2">
        <span>
          {application.universityAddress?.country},
          {application?.universityAddress?.city}
        </span>
      </td>
      <td className="text-lg border p-2">
        {application.applicationFeedback || "No feedback provided"}
      </td>
      <td className="text-lg border p-2">{application.subjectCategory}</td>
      <td className="text-lg border p-2">{application.appliedDegree}</td>
      <td className="text-lg border p-2">${application.applicationFees}</td>
      <td className="text-lg border p-2">${application.serviceCharge}</td>
      <td
        className={`text-sm font-bold border p-1 ${
          application.applicationStatus === "pending"
            ? "text-yellow-600 "
            : application.applicationStatus === "processing"
            ? "text-blue-600"
            : application.applicationStatus === "completed"
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {application.applicationStatus}
      </td>
      <td className="p-2 space-y-2">
        <div className="flex items-center justify-between">
          <button
            onClick={handleDetails}
            className="btn btn-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Details
          </button>
          <button
            onClick={handleReview}
            className="btn btn-xs bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Review
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleEdit}
            disabled={
              application.applicationStatus === "pending" ? false : true
            }
            className="btn btn-xs text-white  bg-blue-500 rounded hover:bg-blue-600"
          >
            Edit
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(application._id)}
            className="btn btn-xs bg-red-500 text-white  rounded-lg hover:bg-red-600"
          >
            Cancel
            <MdDeleteForever />
          </button>
        </div>
      </td>
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
    </tr>
  );
};

ApplicatonRow.propTypes = {
  application: PropTypes.object,
  refetch: PropTypes.func,
};

export default ApplicatonRow;
