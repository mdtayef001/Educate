import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import ApplicatonRow from "./ApplicatonRow";
import ApplicatorCard from "./ApplicatorCard";

const MyApplication = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/application/${user?.email}`);
      return data;
    },
  });

  if (loading || isLoading) return <Loading />;

  if (applications.length === 0) {
    return (
      <h1 className="text-center font-black text-5xl">No Applications Added</h1>
    );
  }
  return (
    <section>
      <div className="overflow-x-auto hidden lg:block">
        <table className="w-full bg-white  border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 border">
              <th className="p-2 text-xs border">University Name</th>
              <th className="p-2 text-xs border">University Address</th>
              <th className="p-2 text-xs border">Application Feedback</th>
              <th className="p-2 text-xs border">Subject Category</th>
              <th className="p-2 text-xs border">Applied Degree</th>
              <th className="p-2 text-xs border">Application Fees</th>
              <th className="p-2 text-xs border">Service Charge</th>
              <th className="p-2 text-xs border">Application Status</th>
              <th className="p-2 text-xs border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <ApplicatonRow
                key={index}
                application={application}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* mobile  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3">
        {applications.map((application, i) => (
          <ApplicatorCard key={i} application={application} refetch={refetch} />
        ))}
      </div>
    </section>
  );
};

export default MyApplication;
