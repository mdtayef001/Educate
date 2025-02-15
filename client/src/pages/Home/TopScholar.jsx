import { FaArrowRight } from "react-icons/fa";
import Loading from "../../components/Loading";
import ScholarCard from "../../components/ScholarCard";
import SectionTitle from "../../components/SectionTitle";
import useScholarship from "../../hooks/useScholarship";
import { Link } from "react-router-dom";

const TopScholar = () => {
  const { scholarships, isLoading } = useScholarship();

  if (isLoading) return <Loading />;

  return (
    <section className="lg:my-20 my-10">
      <SectionTitle heading={"our top Scholarship"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-20 mt-10">
        {scholarships.map((scholarship) => (
          <ScholarCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to={"/scholarship"}
          className="mt-3 btn btn-lg bg-[#4169e1] text-white border-none hover:bg-[#3b5ec9]"
        >
          All Scholarship <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default TopScholar;
