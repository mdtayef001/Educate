import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useScholarship = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", "limit"],

    queryFn: async () => {
      const res = await axiosPublic.get("/scholarships_limit");
      return res.data;
    },
  });
  return { scholarships, isLoading, refetch };
};

export default useScholarship;
