import { Button, Dialog, DialogPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { imgUpload } from "../../api/utils";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const EditModal = ({ editOpen, editClose, application, refetch }) => {
  const { _id, phone, address, gender, hsc, ssc, degree } = application;
  const axiosSecure = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelUpdate = async (data) => {
    const image = data.image[0];

    const newImage = await imgUpload(image);
    const updateInfo = {
      newImage,
      phone: parseInt(data.phone),
      address: {
        country: data.country,
        district: data.district,
        village: data.village,
      },
      degree: data.degree,
      gender: data.gender,
      hsc: data.hsc,
      ssc: data.ssc,
    };
    try {
      const res = await axiosSecure.patch(`/application/${_id}`, updateInfo);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Information Updated",
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
                <h2 className="text-2xl font-bold mb-6">
                  Update Your Information
                </h2>

                <form
                  onSubmit={handleSubmit(handelUpdate)}
                  className="space-y-4"
                >
                  {/* Applicant's Phone Number */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Applicant&apos;s Phone Number*
                    </label>
                    <input
                      type="number"
                      placeholder="+880-0120020"
                      defaultValue={phone}
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Applicant Photo */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Applicant Photo*
                    </label>
                    <input
                      type="file"
                      {...register("image", { required: "Photo is required" })}
                      className="file-input file-input-bordered file-input-[#4169e1]  w-full max-w-xs"
                    />
                    {errors.image && (
                      <p className="text-red-500 text-sm">
                        {errors.image.message}
                      </p>
                    )}
                  </div>

                  {/* Applicant Address */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Applicant Address*
                    </label>
                    <div className="lg:flex items-center justify-between gap-4">
                      <div className="w-full">
                        <input
                          {...register("village", {
                            required: "Village is required",
                          })}
                          defaultValue={address.village}
                          placeholder="Village"
                          className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#4169e1] transition-colors duration-300"
                          type="text"
                        />
                        {errors.village && (
                          <p className="text-red-500 text-sm">
                            {errors.village.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <input
                          {...register("district", {
                            required: "District is required",
                          })}
                          defaultValue={address.district}
                          type="text "
                          placeholder="District"
                          className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#4169e1] transition-colors duration-300"
                        />
                        {errors.district && (
                          <p className="text-red-500 text-sm">
                            {errors.district.message}
                          </p>
                        )}
                      </div>
                      <div className="w-full">
                        <input
                          {...register("country", {
                            required: "Country is required",
                          })}
                          defaultValue={address.country}
                          type="text"
                          placeholder="Country"
                          className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#4169e1] transition-colors duration-300"
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Applicant Gender */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Applicant Gender*
                    </label>
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      defaultValue={gender}
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* Applicant Applying Degree */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Applicant Applying Degree*
                    </label>
                    <select
                      {...register("degree", {
                        required: "Degree is required",
                      })}
                      defaultValue={degree}
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                    >
                      <option value="">Select Degree</option>
                      <option value="diploma">Diploma</option>
                      <option value="bachelor">Bachelor</option>
                      <option value="masters">Masters</option>
                    </select>
                    {errors.degree && (
                      <p className="text-red-500 text-sm">
                        {errors.degree.message}
                      </p>
                    )}
                  </div>

                  {/* SSC Result */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      SSC Result*
                    </label>
                    <input
                      type="text"
                      placeholder="GPA"
                      defaultValue={ssc}
                      {...register("ssc", {
                        required: "SSC result is required",
                      })}
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                    />
                    {errors.ssc && (
                      <p className="text-red-500 text-sm">
                        {errors.ssc.message}
                      </p>
                    )}
                  </div>

                  {/* HSC Result */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      HSC Result*
                    </label>
                    <input
                      type="text"
                      placeholder="GPA"
                      {...register("hsc", {
                        required: "HSC result is required",
                      })}
                      defaultValue={hsc}
                      className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                    />
                    {errors.hsc && (
                      <p className="text-red-500 text-sm">
                        {errors.hsc.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-md bg-[#4169e1] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#3151b1] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    >
                      Submit
                    </button>
                  </div>
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
  editOpen: PropTypes.bool,
  editClose: PropTypes.func,
  application: PropTypes.object,
  refetch: PropTypes.func,
};

export default EditModal;
