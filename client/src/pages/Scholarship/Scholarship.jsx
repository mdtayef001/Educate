import { Helmet } from "react-helmet-async";
import Loading from "../../components/Loading";
import { IoSearch } from "react-icons/io5";
import ScholarCard from "../../components/ScholarCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const Scholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-scholarships"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarships?search=${search}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Educate | All Scholarship</title>
      </Helmet>
      <section className="mt-10 mb-10 p-4">
        {/* search */}
        <div className="lg:w-[70%] mx-auto relative">
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
              refetch();
            }}
            placeholder="Search... scholarship name, university name & degree name."
            className="border border-[#557ae7] py-3 pl-4 pr-[65px] outline-none w-full rounded-md"
          />

          <span className="bg-[#4169e1] text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group">
            <IoSearch className="text-[1.3rem]  group-hover:text-gray-200" />
          </span>
        </div>
        {/* all scholarship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:mt-20 mt-10">
          {scholarships.map((item) => (
            <ScholarCard key={item._id} scholarship={item} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Scholarship;
