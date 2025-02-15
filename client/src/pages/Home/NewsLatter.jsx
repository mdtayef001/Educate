import SectionTitle from "../../components/SectionTitle";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import news1 from "../../assets/newslatter/news1.jpg";
import news2 from "../../assets/newslatter/news2.jpg";
import ButtonCom from "../../components/ButtonCom";

const NewsLatter = () => {
  return (
    <section className="mb-20">
      <div className="lg:flex justify-between">
        <SectionTitle heading={"Our latest news & upcoming blog posts"} />
        <div className="hidden lg:flex">
          <ButtonCom text={"All Blog Post"} />
        </div>
      </div>
      <div className="mt-10 lg:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* 1 */}
        <div className="rounded-lg shadow-md">
          <div className="w-full lg:h-[495px] rounded-lg ">
            <img className="w-full lg:h-full rounded-lg" src={news1} alt="" />
          </div>
          <div className="mb-5 p-4">
            <div className="flex items-center justify-between mt-4">
              <p className="flex items-center gap-3">
                <FaRegUser className="text-[#4169e1]" />
                <span>Joan Wick</span>
              </p>
              <p className="flex items-center gap-3">
                <IoCalendarOutline className="text-[#4169e1]" />
                <span>24 May 2025</span>
              </p>
            </div>
            <h2 className="text-2xl lg:text-4xl font-semibold mt-4">
              Unlocking Opportunities: Your Ultimate Guide to Scholarships
            </h2>

            <div className="mt-4">
              <ButtonCom text={"Read More"} />
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="rounded-lg shadow-md">
          <div className="w-full lg:h-[495px] rounded-lg ">
            <img className="w-full lg:h-full rounded-lg" src={news2} alt="" />
          </div>
          <div className="mb-5 p-4">
            <div className="flex items-center justify-between mt-4">
              <p className="flex items-center gap-3">
                <FaRegUser className="text-[#4169e1]" />
                <span>Jonathon Lopez</span>
              </p>
              <p className="flex items-center gap-3">
                <IoCalendarOutline className="text-[#4169e1]" />
                <span>14 June 2025</span>
              </p>
            </div>
            <h2 className="text-2xl lg:text-4xl font-semibold mt-4">
              The Best Scholarships for the Best Students
            </h2>

            <div className="mt-4">
              <ButtonCom text={"Read More"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLatter;
