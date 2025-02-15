import PropTypes from "prop-types";
import { FaArrowRightLong } from "react-icons/fa6";

const ButtonCom = ({ text }) => {
  return (
    <button className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#4169e1] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-white group">
      <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#4169e1] group-hover:h-full"></span>

      <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <FaArrowRightLong className="w-5 h-5 " />
      </span>

      <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <FaArrowRightLong className="w-5 h-5 text-white " />
      </span>

      <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

ButtonCom.propTypes = {
  text: PropTypes.string,
};

export default ButtonCom;
