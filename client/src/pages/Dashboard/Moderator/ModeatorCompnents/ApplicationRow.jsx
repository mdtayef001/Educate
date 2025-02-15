import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import DetailsModal from "../../../../components/Moderator/DetailsModal";
import FeedBackModal from "../../../../components/Moderator/FeedBackModal";

const ApplicationRow = ({ application, refetch }) => {
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
    deadline,
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
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={applicantPhoto} alt="user imf" />
            </div>
          </div>
          <div>
            <div className="font-bold">{userName}</div>
            <div className="text-sm opacity-50">{email}</div>
          </div>
        </div>
      </td>
      <td>+880 {phone}</td>
      <td>
        Degree: {degree}
        <br />
        <span className="badge badge-ghost badge-sm">HSC: {hsc}</span>
        <span className="badge badge-ghost badge-sm">SSC: {ssc}</span>
      </td>
      <td>
        Apply Date:{new Date(applyDate).toString().split("GMT")[0]}
        <br />
        Deadline:{new Date(deadline).toString().split("GMT")[0]}
      </td>
      <td
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
      </td>
      <th className="flex items-center gap-1">
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
      </th>
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
    </tr>
  );
};
ApplicationRow.propTypes = {
  application: PropTypes.object,
  refetch: PropTypes.func,
};

export default ApplicationRow;
