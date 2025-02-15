import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addUserToDB } from "../api/utils";

const GoogleBtn = () => {
  const { signupWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handelGoogle = async () => {
    try {
      const { user } = await signupWithGoogle();
      if (user?.email) {
        await addUserToDB(user?.email, user?.displayName, user?.photoURL);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Login Successful`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handelGoogle}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-[#395fce]"
      >
        <FcGoogle className="text-lg" />
        Google
      </button>
    </div>
  );
};

export default GoogleBtn;
