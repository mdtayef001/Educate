import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner/banner1.jpg";
import banner2 from "../../assets/banner/banner2.jpg";
import banner3 from "../../assets/banner/banner3.jpg";

const Slider = () => {
  return (
    <section className="rounded-r-2xl lg:mt-10 mt-5">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        emulateTouch={true}
        showStatus={false}
        infiniteLoop={true}
        dynamicHeight={true}
        stopOnHover={true}
      >
        <div>
          <img
            className="w-full rounded-2xl md:h-[700px] object-cover"
            src={banner1}
          />
        </div>
        <div>
          <img
            className="w-full rounded-2xl md:h-[700px] object-cover"
            src={banner2}
          />
        </div>
        <div>
          <img
            className="w-full rounded-2xl md:h-[700px] object-cover"
            src={banner3}
          />
        </div>
      </Carousel>
    </section>
  );
};

export default Slider;
