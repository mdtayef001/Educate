import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { imgUpload } from "../../../api/utils";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddScholarship = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [adding, setAdding] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const uniLogo = data.image[0];
    const image = await imgUpload(uniLogo);
    setAdding(true);

    const addInfo = {
      scholarship_name: data.scholarship_name,
      name: data.name,
      image,
      location: {
        country: data.country,
        city: data.city,
      },
      rank: data.rank,
      subject: data.subject,
      category: data.category,
      degree: data.degree,
      tuitionFees: parseInt(data.tuitionFees),
      fees: parseInt(data.applicationFees),
      serviceCharge: parseInt(data.applicationFees),
      description: data.description,
      deadline: data.deadline,
      postDate: Date.now(),
      email: user?.email,
      rating: 4,
    };

    try {
      await axiosSecure.post("/scholarships", addInfo);
      setAdding(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your  Updated Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  if (loading) return <Loading />;
  return (
    <section className="lg:w-[70%] mx-auto p-4">
      <h1 className="text-center lg:text-4xl text-2xl mb-6 font-bold uppercase">
        Add Scholarship
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/* Scholarship Name */}
          <div>
            <label className="block text-sm font-medium">
              Scholarship Name
            </label>
            <input
              type="text"
              {...register("scholarship_name", {
                required: "Scholarship name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.scholarship_name && (
              <p className="text-red-500 text-sm">
                {errors.scholarship_name.message}
              </p>
            )}
          </div>

          {/* University Name */}
          <div>
            <label className="block text-sm font-medium">University Name</label>
            <input
              type="text"
              {...register("name", {
                required: "University name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* University Image/Logo */}
          <div>
            <label className="block text-sm font-medium">
              University Image/Logo
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <div className="lg:flex items-center justify-between gap-4">
            {/* University Country */}
            <div className="w-full">
              <label className="block text-sm font-medium">
                University Country
              </label>
              <input
                type="text"
                {...register("country", {
                  required: "Country is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>

            {/* University City */}
            <div className="w-full">
              <label className="block text-sm font-medium">
                University City
              </label>
              <input
                type="text"
                {...register("city", {
                  required: "City is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* University World Rank */}
          <div>
            <label className="block text-sm font-medium">
              University World Rank
            </label>
            <input
              type="number"
              {...register("rank", {
                required: "World rank is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.rank && (
              <p className="text-red-500 text-sm">{errors.rank.message}</p>
            )}
          </div>

          <div className="lg:flex items-center justify-between gap-4">
            {/* Subject Category */}
            <div className="lg:w-full">
              <label className="block text-sm font-medium">
                Subject Category
              </label>
              <select
                {...register("subject", {
                  required: "Subject category is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
              </select>
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            {/* Scholarship Category */}
            <div className="lg:w-full">
              <label className="block text-sm font-medium">
                Scholarship Category
              </label>
              <select
                {...register("category", {
                  required: "Scholarship category is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-Fund</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* Degree */}
            <div className="lg:w-full">
              <label className="block text-sm font-medium">Degree</label>
              <select
                {...register("degree", {
                  required: "Degree is required",
                })}
                className="select select-bordered w-full"
              >
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
              </select>
              {errors.degree && (
                <p className="text-red-500 text-sm">{errors.degree.message}</p>
              )}
            </div>
          </div>

          <div className="lg:flex items-center justify-center gap-4">
            {/* Tuition Fees */}
            <div className="lg:w-full">
              <label className="block text-sm font-medium">
                Tuition Fees (Optional)
              </label>
              <input
                type="number"
                {...register("tuitionFees")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Application Fees */}
            <div className="lg:w-full">
              <label className="block text-sm font-medium">
                Application Fees
              </label>
              <input
                type="number"
                {...register("applicationFees", {
                  required: "Application fees are required",
                })}
                className="input input-bordered w-full"
              />
              {errors.applicationFees && (
                <p className="text-red-500 text-sm">
                  {errors.applicationFees.message}
                </p>
              )}
            </div>

            {/* Service Charge */}
            <div className="lg:w-full">
              <label className="block text-sm font-medium">
                Service Charge
              </label>
              <input
                type="number"
                {...register("serviceCharge", {
                  required: "Service charge is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.serviceCharge && (
                <p className="text-red-500 text-sm">
                  {errors.serviceCharge.message}
                </p>
              )}
            </div>
          </div>
          {/* Application description */}

          <div>
            <label className="block text-sm font-medium">
              Application description
            </label>
            <textarea
              cols={10}
              {...register("description", {
                required: "description is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          {/* Application Deadline */}

          <div>
            <label className="block text-sm font-medium">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("deadline", {
                required: "Deadline is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm">{errors.deadline.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={adding ? true : false}
            type="submit"
            className="btn bg-[#4169e1] hover:bg-[#2c499e]   text-white w-full"
          >
            Submit{" "}
            {adding ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              ""
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddScholarship;
