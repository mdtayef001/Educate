import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { Rating } from "@smastrom/react-rating";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Loading";

const ReviewModal = ({ reviewOpen, reviewClose, application }) => {
  const [rating, setRating] = useState(0);
  const { user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const timeStamp = Date.now();
  const date = new Date(timeStamp);
  const formattedDate = date.toISOString().split("T")[0];

  const onSubmit = async (data) => {
    if (rating === 0) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Rating is require",
      });
    }

    const reviewData = {
      reviewer_image: user?.photoURL,
      reviewer_name: user?.displayName,
      email: user?.email,
      review_date: formattedDate,
      rating_point: rating,
      reviewer_comments: data.comment,
      scholarshipName: application.scholarship_name,
      universityName: application.universityName,
      university_id: application._id,
      subjectCategory: application.subjectCategory,
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Review is added",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      setRating(0);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      reviewClose();
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <Dialog
        open={reviewOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={reviewClose}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border"
            >
              <Button
                className=" rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner data-[hover]:bg-red-600 mb-5"
                onClick={reviewClose}
              >
                x
              </Button>
              <div className="">
                <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Rating Point */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Rating Point*
                    </label>
                    <div>
                      <Rating
                        style={{ maxWidth: 250 }}
                        value={rating}
                        onChange={setRating}
                      />
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">
                      Review Comment*
                    </label>
                    <textarea
                      rows="4"
                      {...register("comment", {
                        required: "Review comment is required",
                        maxLength: {
                          value: 500,
                          message: "Comment cannot exceed 500 characters",
                        },
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    ></textarea>
                    {errors.comment && (
                      <p className="text-red-500 text-sm">
                        {errors.comment.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-4"></div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

ReviewModal.propTypes = {
  reviewOpen: PropTypes.bool,
  reviewClose: PropTypes.func,
  application: PropTypes.object,
};

export default ReviewModal;
