import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditModal from "../../../../components/Moderator/EditModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ScholarshipsRow = ({ scholarship, refetch }) => {
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
    <>
      <tr>
        <th>{scholarship.scholarship_name}</th>
        <td>{scholarship.name}</td>
        <td>{scholarship.degree}</td>
        <td>{scholarship.subject}</td>
        <td>${scholarship.fees}</td>
        <th className="space-x-3">
          <Link
            to={`/scholarship-details/${scholarship._id}`}
            className="btn btn-xs bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Details
          </Link>
          <button
            onClick={handleEdit}
            className="btn btn-xs text-white  bg-blue-500 rounded hover:bg-blue-600"
          >
            Edit
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(scholarship._id)}
            className="btn btn-xs bg-red-500 text-white  rounded-lg hover:bg-red-600"
          >
            Cancel
            <MdDeleteForever />
          </button>
        </th>
      </tr>
      {/* modal */}
      <EditModal
        scholarship={scholarship}
        editOpen={editOpen}
        editClose={editClose}
        refetch={refetch}
      />
    </>
  );
};

ScholarshipsRow.propTypes = {
  scholarship: PropTypes.shape({
    _id: PropTypes.string,
    scholarship_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    degree: PropTypes.string.isRequired,
    fees: PropTypes.number.isRequired,
  }).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ScholarshipsRow;
