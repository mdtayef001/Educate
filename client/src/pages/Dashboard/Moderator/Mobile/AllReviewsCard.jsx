import Swal from "sweetalert2";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";

const AllReviewsCard = ({ review, refetch }) => {
  const {
    _id,
    email,
    rating_point,
    review_date,
    reviewer_comments,
    reviewer_image,
    reviewer_name,
    subjectCategory,
    universityName,
  } = review;
  const axiosSecure = useAxiosSecure();

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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 ">
      {/* Reviewer Image */}
      <div className="mr-4">
        <img
          src={reviewer_image}
          alt={reviewer_name}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* Reviewer Details */}
      <div className=" space-y-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {reviewer_name}{" "}
          <span className="text-sm font-medium text-gray-500">
            (Rating: {rating_point})
          </span>
        </h3>
        <p className="text-sm text-gray-500">{email}</p>

        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700">
            University: {universityName}
          </h4>
          <p className="text-sm text-gray-500">Subject: {subjectCategory}</p>
        </div>

        <div className="mt-2">
          <p className="text-sm text-gray-700">
            <strong>Review Date:</strong> {review_date}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Comments:</strong> {reviewer_comments}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <button
          onClick={() => handleDelete(_id)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Cancel
          <MdDeleteForever className="ml-2" />
        </button>
      </div>
    </div>
  );
};
AllReviewsCard.propTypes = {
  review: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default AllReviewsCard;
