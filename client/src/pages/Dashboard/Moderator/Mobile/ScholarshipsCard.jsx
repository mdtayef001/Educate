import { FaEdit } from "react-icons/fa";
import PropTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EditModal from "../../../../components/Moderator/EditModal";

const ScholarshipsCard = ({ scholarship, refetch }) => {
  const [editOpen, setEditOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
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
          const { data } = await axiosSecure.delete(
            `/scholarships/delete/${id}`
          );
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
    <div className=" card bg-white text-black shadow-lg rounded-lg p-2 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">{scholarship.scholarship_name}</h2>
      </div>
      <div className="mt-4">
        <p>
          <span className="font-medium">University Name:</span>{" "}
          {scholarship.name}
        </p>
        <p>
          <span className="font-medium">Degree:</span> {scholarship.degree}
        </p>
        <p>
          <span className="font-medium">Subject Category:</span>{" "}
          {scholarship.subject}
        </p>
        <p>
          <span className="font-medium">Application Fees:</span> $
          {scholarship.fees}
        </p>
        <div className="flex flex-row-reverse items-center mt-5 gap-1 ">
          <Link
            to={`/scholarship-details/${scholarship._id}`}
            className="btn btn-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Details
          </Link>
          <button
            onClick={handleEdit}
            className="btn btn-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 flex items-center space-x-1"
          >
            <span>Edit</span>
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(scholarship._id)}
            className="btn btn-sm bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-1"
          >
            <span>Cancel</span>
            <MdDeleteForever />
          </button>
        </div>
      </div>
      <EditModal
        scholarship={scholarship}
        editOpen={editOpen}
        editClose={editClose}
        refetch={refetch}
      />
    </div>
  );
};
ScholarshipsCard.propTypes = {
  scholarship: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    scholarship_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    fees: PropTypes.number.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ScholarshipsCard;
