import { Helmet } from "react-helmet-async";
import Slider from "./Slider";
import TopScholar from "./TopScholar";
import NewsLatter from "./NewsLatter";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <section className="p-2 md:p-3 lg:p-4 ">
      <Helmet>
        <title>Educate | Home</title>
      </Helmet>
      <Slider />
      <TopScholar />
      <NewsLatter />
      <ContactUs />
    </section>
  );
};

export default Home;
