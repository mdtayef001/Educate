import PropTypes from "prop-types";
import { MdLocationPin, MdOutlineStar } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ScholarCard = ({ scholarship }) => {
  const {
    _id,
    name,
    image,
    description,
    location,
    category,
    subject,
    fees,
    rating,
    deadline,
  } = scholarship;

  return (
    <div className="w-full relative bg-white dark:bg-slate-950 shadow-md rounded-xl p-4 ">
      <div className="flex gap-4 ">
        <img className="w-14" src={image} alt="" />
        <div>
          <h1 className="text-[1.4rem] font-bold leading-[24px]">{name}</h1>
          <p className="text-[0.9rem] text-gray-400 flex items-center gap-2 mt-1">
            <MdLocationPin className="text-[#4169e1]" />
            <span>
              {location.country}, {location.city}
            </span>
          </p>
        </div>
      </div>
      <div>
        <div className=" mt-3 text-sm">
          <p className="">
            <b>Scholarship category:</b> {category}
          </p>
          <p className="">
            <b>Subject:</b> {subject}
          </p>
          <p className="">
            <b>Application Fees:</b> ${fees}
          </p>
          <p className="">
            <b>Deadline:</b> {deadline}
          </p>
          <p className="flex gap-1">
            <b>Rating:</b>
            <span className="text-yellow-500 flex items-center justify-center">
              {rating} <MdOutlineStar />
            </span>
          </p>
        </div>
        <p className="text-gray-600 mt-3 text-[0.9rem]">{description}</p>
        <Link
          to={`/scholarship-details/${_id}`}
          className="mt-3 btn bg-[#4169e1] text-white border-none hover:bg-[#3b5ec9]"
        >
          Scholarship Details <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

ScholarCard.propTypes = {
  scholarship: PropTypes.object,
};

export default ScholarCard;
