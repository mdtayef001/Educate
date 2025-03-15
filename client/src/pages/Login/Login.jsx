import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import GoogleBtn from "../../components/GoogleBtn";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { IoArrowBack } from "react-icons/io5";

const Login = () => {
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.pathName || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (user) return <Navigate to={from} />;

  const handleLogin = async (data) => {
    const email = data.email;
    const password = data.password;

    // login user
    try {
      await loginUser(email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Login Successful`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <section className="p-2 lg:p-0">
      <Helmet>
        <title>Educate | Login</title>
      </Helmet>
      <div className="min-h-screen flex  items-center justify-center bg-gray-100 dark:bg-[#1d232a] text-black dark:text-white">
        <div className="bg-white dark:bg-[#191e24]  shadow-lg rounded-lg p-8 w-full max-w-md">
          <Link
            to={"/"}
            className="flex items-center mb-6 hover:text-[#4169e1]"
          >
            <IoArrowBack className="text-xl" /> Home
          </Link>
          <h2 className="text-2xl font-bold text-center mb-6">
            Sign in to Your Account <span className="wave">👋</span>
          </h2>
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="text-black dark:text-white"
          >
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium ">
                Your Email
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Your Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="********"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm "
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
                    <span>Error! This field is required</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p href="#" className="text-sm text-[#4169e1] hover:underline">
                Forgot Password?
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#4169e1] text-white py-2 px-4 rounded-lg hover:bg-[#385ac2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 dark:text-gray-300">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <GoogleBtn />
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-[#4169e1] hover:underline">
              Sign Up for free
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
