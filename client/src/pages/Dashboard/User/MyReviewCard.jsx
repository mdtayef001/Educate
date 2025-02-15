import Swal from "sweetalert2";
import PropTypes from "prop-types";
import EditReviewModal from "../../../components/Modal/EditReviewModal";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const MyReviewCard = ({ review, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  // edit
  const handleEdit = () => {
    setIsOpen(true);
  };

  const isClose = () => {
    setIsOpen(false);
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
          const { data } = await axiosSecure.delete(`/reviews/${id}`);
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
  return (
    <div>
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-4 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">
          {review.universityName}
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Scholarship Name:</span>{" "}
          {review.scholarshipName || "Not Available"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Comments:</span>{" "}
          {review.reviewer_comments}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-medium">Date:</span> {review.review_date}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleEdit()}
            className="px-4 py-2 rounded-lg text-white  bg-blue-500  hover:bg-blue-600 flex items-center  gap-2"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={() => handleDelete(review._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
          >
            <MdDeleteForever />
            Delete
          </button>
        </div>
      </div>

      <EditReviewModal
        isClose={isClose}
        isOpen={isOpen}
        review={review}
        refetch={refetch}
      />
    </div>
  );
};
MyReviewCard.propTypes = {
  review: PropTypes.object,
  refetch: PropTypes.func,
};

export default MyReviewCard;
