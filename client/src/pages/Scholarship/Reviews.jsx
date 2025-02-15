import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/Loading";

// import Swiper core and required modules
import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
// import { BiSolidQuoteRight } from "react-icons/bi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@smastrom/react-rating/style.css";
import { FaQuoteLeft } from "react-icons/fa";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/reviews");
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isPending) return <Loading />;

  return (
    <section className="lg:mt-10 mt-5 lg:w-[70%] mx-auto lg:p-10 p-5">
      <Swiper
        // install Swiper modules
        modules={[Navigation, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        className="shadow-lg"
      >
        {reviews.map((review) => (
          <SwiperSlide className="my-10" key={review._id}>
            <div className="w-[60%] p-4  mx-auto relative">
              <FaQuoteLeft className=" absolute -top-2 left-[5%] text-[1.3rem] text-[#727272]" />

              <img
                src={review.reviewer_image}
                alt="demo/image"
                className="w-[100px] h-[100px] object-cover rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-[#4169e1]"
              />

              <p className="text-text text-[0.9rem] mt-16">
                {review.reviewer_comments}
              </p>

              <div className="md:flex items-start mt-5 justify-between">
                <div>
                  <h2 className="text-[1.2rem] font-[600]">
                    {review.reviewer_name}
                  </h2>

                  <p className="text-[1rem] text-[#727272]">
                    Posted: {review.review_date}
                  </p>
                </div>

                <div className="">
                  <Rating
                    style={{ maxWidth: 100 }}
                    value={parseInt(review.rating_point)}
                  />
                </div>
              </div>

              <FaQuoteLeft className=" absolute -bottom-2 right-[5%] rotate-[180deg] text-[1.3rem] text-[#727272]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
