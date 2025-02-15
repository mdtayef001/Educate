import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import ApplicationRow from "./ModeatorCompnents/ApplicationRow";
import ApplicationCard from "./Mobile/ApplicationCard";
import { useState } from "react";

const AppliedScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/application");
      setApplications(data);
      return data;
    },
  });

  const handleShort = async (value = "") => {
    try {
      const { data } = await axiosSecure.get(`/application?sort=${value}`);
      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;
  if (applications.length === 0)
    return (
      <h1 className="text-center font-black text-5xl">No Applications Added</h1>
    );

  return (
    <section className="lg:w-[90%] mx-auto">
      <div className="text-center">
        <select
          onChange={(e) => handleShort(e.target.value)}
          defaultValue={"Who shot first"}
          className="select select-bordered w-full max-w-xs mb-5"
        >
          <option disabled selected>
            shot by
          </option>
          <option value={"appliedDate"}>Applied Date</option>
          <option value={"deadline"}>Scholarship Deadline</option>
        </select>
      </div>
      <div className="overflow-x-auto hidden lg:block">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Degree</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {applications.map((application) => (
              <ApplicationRow
                key={application._id}
                application={application}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3">
        {applications.map((application) => (
          <ApplicationCard
            key={application._id}
            refetch={refetch}
            application={application}
          />
        ))}
      </div>
    </section>
  );
};

export default AppliedScholarship;
