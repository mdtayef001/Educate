import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../hooks/useAxiosPublic";
import AllReviewRow from "./ModeatorCompnents/AllReviewRow";
import Loading from "../../../components/Loading";
import AllReviewsCard from "./Mobile/AllReviewsCard";

const AllReview = () => {
  const axiosSecure = useAxiosPublic();

  const {
    data: reviews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/reviews");
      return data;
    },
  });

  if (isLoading) return <Loading />;
  if (reviews.length === 0)
    return (
      <h1 className="text-center font-black text-5xl">No Reviews Added</h1>
    );
  return (
    <section>
      <div className="overflow-x-auto w-[90%] mx-auto hidden lg:block">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Scholarship</th>
              <th>ApplyDate</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {reviews.map((review) => (
              <AllReviewRow
                key={review._id}
                review={review}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3">
        {reviews.map((review) => (
          <AllReviewsCard key={review._id} review={review} refetch={refetch} />
        ))}
      </div>
    </section>
  );
};

export default AllReview;
