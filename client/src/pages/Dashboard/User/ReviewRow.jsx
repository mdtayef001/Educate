import { useState } from "react";
import PropTypes from "prop-types";
import EditReviewModal from "../../../components/Modal/EditReviewModal";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReviewRow = ({ review, refetch }) => {
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
    <tr>
      <td>{review.scholarshipName || "Not Available"}</td>
      <td>{review.universityName}</td>
      <td>{review.reviewer_comments}</td>
      <td>{review.review_date}</td>
      <td className="flex items-center gap-2">
        <button
          onClick={() => handleEdit()}
          className="btn btn-xs text-white  bg-blue-500 rounded hover:bg-blue-600"
        >
          <FaEdit />
          Edit
        </button>
        <button
          onClick={() => handleDelete(review._id)}
          className="btn btn-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <MdDeleteForever />
          Delete
        </button>
      </td>
      <EditReviewModal
        isClose={isClose}
        isOpen={isOpen}
        review={review}
        refetch={refetch}
      />
    </tr>
  );
};
ReviewRow.propTypes = {
  review: PropTypes.object,
  refetch: PropTypes.func,
};

export default ReviewRow;
