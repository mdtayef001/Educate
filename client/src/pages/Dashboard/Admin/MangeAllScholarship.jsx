import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ScholarshipsRow from "../Moderator/ModeatorCompnents/ScholarshipsRow";
import ScholarshipsCard from "../Moderator/Mobile/ScholarshipsCard";

const MangeAllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manege-scholarships", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/scholarships?search=${""}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  if (scholarships.length === 0)
    return (
      <h1 className="text-center font-black text-5xl">No Scholarships Added</h1>
    );
  return (
    <section className="w-[80%] mx-auto">
      <div className="overflow-x-auto hidden lg:block">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Scholarship name</th>
              <th> University Name</th>
              <th>Degree</th>
              <th>Subject Category</th>
              <th>Application Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {scholarships.map((scholarship) => (
              <ScholarshipsRow
                key={scholarship._id}
                scholarship={scholarship}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {scholarships.map((scholarship) => (
          <ScholarshipsCard
            key={scholarship._id}
            scholarship={scholarship}
            refetch={refetch}
          />
        ))}
      </div>
    </section>
  );
};

export default MangeAllScholarship;
