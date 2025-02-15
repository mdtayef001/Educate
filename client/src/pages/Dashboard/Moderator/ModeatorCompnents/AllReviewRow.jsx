import { MdDeleteForever } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const AllReviewRow = ({ review, refetch }) => {
  const axiosSecure = useAxiosSecure();
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
      <th>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={reviewer_image} alt="imgae" />
            </div>
          </div>
          <div>
            <div className="font-bold">{reviewer_name}</div>
            <div className="text-sm opacity-50">Rating: {rating_point}</div>
          </div>
        </div>
      </th>
      <td>{email}</td>
      <td>
        <div className="font-bold">{universityName}</div>
        <div className="text-sm opacity-50">
          Subject Category: {subjectCategory}
        </div>
      </td>

      <th>{review_date}</th>
      <th>{reviewer_comments}</th>

      <th className="">
        <button
          onClick={() => handleDelete(_id)}
          className="btn btn-xs bg-red-500 text-white  rounded-lg hover:bg-red-600"
        >
          <span className="flex items-center gap-2">
            {" "}
            Cancel
            <MdDeleteForever />
          </span>
        </button>
      </th>
    </tr>
  );
};

AllReviewRow.propTypes = {
  review: PropTypes.object,
  refetch: PropTypes.func,
};

export default AllReviewRow;
