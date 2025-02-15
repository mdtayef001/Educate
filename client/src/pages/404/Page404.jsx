import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="boxShadow px-10 w-full flex items-center flex-col justify-center pb-[50px] rounded-xl">
      <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
        <img
          src="https://i.ibb.co/cgfgxGH/Illustrations.png"
          alt="empty/image"
          className="w-full sm:w-[200px]"
        />

        <h1 className="text-[1.4rem] mt-6 font-[500] text-black">
          Result Not Found
        </h1>

        <p className="text-[0.9rem] text-gray-500">
          Whoops ... this information is not available for a moment
        </p>
        <Link to={"/"}>
          <button className="py-3 px-6 sm:px-8 rounded-full bg-[#fff] text-[#1C3177] border border-[#1C3177] mt-4 flex items-center gap-[10px]">
            <FaArrowLeftLong /> Back to home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
