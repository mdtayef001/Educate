import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import ReviewRow from "./ReviewRow";
import MyReviewCard from "./MyReviewCard";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/reviews/${user?.email}`);
      return data;
    },
  });

  if (loading || isLoading) return <Loading />;

  if (reviews.length === 0) {
    return (
      <h1 className="text-center font-black text-5xl">No Reviews Added</h1>
    );
  }

  return (
    <section className="w-[80%] mx-auto">
      {/* large display */}

      <div className="overflow-x-auto hidden lg:block">
        <table className="table ">
          {/* head */}
          <thead>
            <th className="border-b">Scholarship Name</th>
            <th className="border-b">University Name</th>
            <th className="border-b">Review Comments</th>
            <th className="border-b">Review Date</th>
            <th className="border-b">Actions</th>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <ReviewRow key={review._id} review={review} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
      {/* mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {reviews.map((review) => (
          <MyReviewCard key={review._id} review={review} refetch={refetch} />
        ))}
      </div>
    </section>
  );
};

export default MyReviews;
