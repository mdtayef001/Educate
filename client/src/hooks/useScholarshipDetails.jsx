import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useScholarshipDetails = (id = "") => {
  const axiosSecure = useAxiosSecure();
  const { data: scholarDetails = [], isLoading } = useQuery({
    queryKey: ["scholarship-details", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/scholarships_details/${id}`);
      return response.data;
    },
  });

  return [scholarDetails, isLoading];
};

export default useScholarshipDetails;
