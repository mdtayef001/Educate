// import { useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { imgUpload } from "../../api/utils";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditModal = ({ scholarship, refetch, editClose, editOpen }) => {
  const {
    name,
    category,
    location,
    subject,
    fees,
    description,
    serviceCharge,
    degree,
    rank,
    scholarship_name,
  } = scholarship;
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelUpdate = async (data) => {
    const image = data.image[0];
    const newImage = await imgUpload(image);
    const updateInfo = {
      id: scholarship._id,
      applicationDeadline: data.applicationDeadline,
      applicationFees: parseInt(data.applicationFees),
      degree: data.degree,
      image: newImage,
      scholarshipCategory: data.scholarshipCategory,
      scholarshipName: data.scholarshipName,
      serviceCharge: parseInt(data.serviceCharge),
      subjectCategory: data.subjectCategory,
      tuitionFees: data.tuitionFees || "Not Available",
      address: {
        city: data.universityCity,
        country: data.universityCountry,
      },
      universityName: data.universityName,
      universityRank: parseInt(data.universityRank),
      description: data.description,
      updateTime: Date.now(),
    };

    try {
      const res = await axiosSecure.patch(`/scholarships-update`, updateInfo);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your  Updated Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      editClose();
    }
  };

  return (
    <>
      <Dialog
        open={editOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={editClose}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border"
            >
              <Button
                className="rounded-md bg-red-500 py-1 px-3 text-sm/6 font-semibold text-white s data-[hover]:bg-red-700 mb-5"
                onClick={editClose}
              >
                x
              </Button>
              {/* forms */}
              <div className=" mx-auto  text-black dark:text-white dark:bg-[#191e24] ">
                <h2 className="text-2xl font-bold mb-6">Update Information</h2>

                <form
                  onSubmit={handleSubmit(handelUpdate)}
                  className="space-y-4 "
                >
                  {/* Scholarship Name */}
                  <div>
                    <label className="block text-sm font-medium">
                      Scholarship Name
                    </label>
                    <input
                      type="text"
                      {...register("scholarshipName", {
                        required: "Scholarship name is required",
                      })}
                      defaultValue={scholarship_name}
                      className="input input-bordered w-full"
                    />
                    {errors.scholarshipName && (
                      <p className="text-red-500 text-sm">
                        {errors.scholarshipName.message}
                      </p>
                    )}
                  </div>

                  {/* University Name */}
                  <div>
                    <label className="block text-sm font-medium">
                      University Name
                    </label>
                    <input
                      type="text"
                      {...register("universityName", {
                        required: "University name is required",
                      })}
                      defaultValue={name}
                      className="input input-bordered w-full"
                    />
                    {errors.universityName && (
                      <p className="text-red-500 text-sm">
                        {errors.universityName.message}
                      </p>
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
                      <p className="text-red-500 text-sm">
                        {errors.image.message}
                      </p>
                    )}
                  </div>

                  {/* University Country */}
                  <div>
                    <label className="block text-sm font-medium">
                      University Country
                    </label>
                    <input
                      type="text"
                      {...register("universityCountry", {
                        required: "Country is required",
                      })}
                      defaultValue={location.country}
                      className="input input-bordered w-full"
                    />
                    {errors.universityCountry && (
                      <p className="text-red-500 text-sm">
                        {errors.universityCountry.message}
                      </p>
                    )}
                  </div>

                  {/* University City */}
                  <div>
                    <label className="block text-sm font-medium">
                      University City
                    </label>
                    <input
                      type="text"
                      {...register("universityCity", {
                        required: "City is required",
                      })}
                      defaultValue={location.city}
                      className="input input-bordered w-full"
                    />
                    {errors.universityCity && (
                      <p className="text-red-500 text-sm">
                        {errors.universityCity.message}
                      </p>
                    )}
                  </div>

                  {/* University World Rank */}
                  <div>
                    <label className="block text-sm font-medium">
                      University World Rank
                    </label>
                    <input
                      type="number"
                      defaultValue={rank}
                      {...register("universityRank", {
                        required: "World rank is required",
                      })}
                      className="input input-bordered w-full"
                    />
                    {errors.universityRank && (
                      <p className="text-red-500 text-sm">
                        {errors.universityRank.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Category */}
                  <div>
                    <label className="block text-sm font-medium">
                      Subject Category
                    </label>
                    <select
                      {...register("subjectCategory", {
                        required: "Subject category is required",
                      })}
                      defaultValue={subject}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Category</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Doctor">Doctor</option>
                    </select>
                    {errors.subjectCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.subjectCategory.message}
                      </p>
                    )}
                  </div>

                  {/* Scholarship Category */}
                  <div>
                    <label className="block text-sm font-medium">
                      Scholarship Category
                    </label>
                    <select
                      {...register("scholarshipCategory", {
                        required: "Scholarship category is required",
                      })}
                      defaultValue={category}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Category</option>
                      <option value="Full fund">Full Fund</option>
                      <option value="Partial">Partial</option>
                      <option value="Self-fund">Self-Fund</option>
                    </select>
                    {errors.scholarshipCategory && (
                      <p className="text-red-500 text-sm">
                        {errors.scholarshipCategory.message}
                      </p>
                    )}
                  </div>

                  {/* Degree */}
                  <div>
                    <label className="block text-sm font-medium">Degree</label>
                    <select
                      {...register("degree", {
                        required: "Degree is required",
                      })}
                      defaultValue={degree}
                      className="select select-bordered w-full"
                    >
                      <option value="">Select Degree</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Masters">Masters</option>
                    </select>
                    {errors.degree && (
                      <p className="text-red-500 text-sm">
                        {errors.degree.message}
                      </p>
                    )}
                  </div>

                  {/* Tuition Fees */}
                  <div>
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
                  <div>
                    <label className="block text-sm font-medium">
                      Application Fees
                    </label>
                    <input
                      type="number"
                      {...register("applicationFees", {
                        required: "Application fees are required",
                      })}
                      defaultValue={fees}
                      className="input input-bordered w-full"
                    />
                    {errors.applicationFees && (
                      <p className="text-red-500 text-sm">
                        {errors.applicationFees.message}
                      </p>
                    )}
                  </div>

                  {/* Service Charge */}
                  <div>
                    <label className="block text-sm font-medium">
                      Service Charge
                    </label>
                    <input
                      type="number"
                      {...register("serviceCharge", {
                        required: "Service charge is required",
                      })}
                      defaultValue={serviceCharge}
                      className="input input-bordered w-full"
                    />
                    {errors.serviceCharge && (
                      <p className="text-red-500 text-sm">
                        {errors.serviceCharge.message}
                      </p>
                    )}
                  </div>

                  {/* Application Deadline */}
                  <div>
                    <label className="block text-sm font-medium">
                      Application Deadline
                    </label>
                    <textarea
                      rows={6}
                      defaultValue={description}
                      {...register("description", {
                        required: "Deadline is required",
                      })}
                      className="input input-bordered w-full"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium">
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      {...register("applicationDeadline", {
                        required: "Deadline is required",
                      })}
                      className="input input-bordered w-full"
                    />
                    {errors.applicationDeadline && (
                      <p className="text-red-500 text-sm">
                        {errors.applicationDeadline.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn bg-[#4169e1] text-white w-full"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
EditModal.propTypes = {
  refetch: PropTypes.func.isRequired,
  scholarship: PropTypes.object,
  editClose: PropTypes.func.isRequired,
  editOpen: PropTypes.bool.isRequired,
};

export default EditModal;
