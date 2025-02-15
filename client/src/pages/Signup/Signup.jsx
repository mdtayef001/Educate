import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GoogleBtn from "../../components/GoogleBtn";
import { useForm } from "react-hook-form";
import { addUserToDB, imgUpload } from "../../api/utils";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const Signup = () => {
  const { user, createUser, updateUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (user) return <Navigate to={"/"} />;

  const handleSignup = async (data) => {
    const email = data.email;
    const name = data.name;
    const password = data.password;
    const image = data.image[0];
    const photoURL = await imgUpload(image);

    try {
      const { user: currentUser } = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await addUserToDB(
        currentUser?.email,
        currentUser?.displayName,
        currentUser?.photoURL
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Signup Successful`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
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
    <section className="p-4 lg:p-0">
      <Helmet>
        <title>Educate | Signup</title>
      </Helmet>
      <div className="min-h-screen flex  items-center justify-center bg-gray-100 dark:bg-[#1d232a] text-black dark:text-white">
        <div className="bg-white dark:bg-[#191e24]  shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Account <span className="wave">👋</span>
          </h2>
          <form
            onSubmit={handleSubmit(handleSignup)}
            className="text-black dark:text-white"
          >
            {/* name */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium ">
                Your Name*
              </label>
              <input
                type="name"
                {...register("name", { required: true })}
                placeholder="Enter Your name"
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm"
              />
              {errors.name && (
                <div role="alert" className="alert alert-error mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! This field is required</span>
                </div>
              )}
            </div>
            {/* email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium ">
                Your Email*
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Enter Your Email"
                className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm"
              />
              {errors.email && (
                <div role="alert" className="alert alert-error mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! This field is required</span>
                </div>
              )}
            </div>
            {/* password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Your Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password", {
                    pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/,
                  })}
                  placeholder="********"
                  className="mt-1 block  w-full px-3 py-2 border rounded-lg shadow-sm"
                />
                {errors.password && (
                  <div role="alert" className="alert alert-error mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      <ul>
                        <li>Contains at least one uppercase letter</li>
                        <li>Contains at least one special character</li>
                        <li>Contains at least one number</li>
                        <li>Has a minimum length of 6 characters</li>
                        <li>Like: P@assW0rd</li>
                      </ul>
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* photo */}
            <label className="form-control w-full max-w-xs mb-4">
              <div className="label">
                <label htmlFor="password" className="block text-sm font-medium">
                  Pick Photo*
                </label>
              </div>
              <input
                type="file"
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <div role="alert" className="alert alert-error mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Error! This field is required</span>
                </div>
              )}
            </label>

            <div className="flex items-center justify-between mb-4">
              <p href="#" className="text-sm text-[#4169e1] hover:underline">
                Forgot Password?
              </p>
            </div>
            {/* button */}
            <button
              type="submit"
              className="w-full bg-[#4169e1] text-white py-2 px-4 rounded-lg hover:bg-[#385ac2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Signup
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 dark:text-gray-300">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleBtn />
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
