import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AnalyticsChart = () => {
  const axiosSecure = useAxiosSecure();
  const { data: adminStats } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });

  return (
    <div>
      <Chart adminStats={adminStats} />
    </div>
  );
};

export default AnalyticsChart;
