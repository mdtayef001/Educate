import { Link, NavLink } from "react-router-dom";
import { GiBookAura } from "react-icons/gi";
import ThemeToggle from "../components/ThemeToggle";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Logout Successful`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const links = (
    <>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300 ">
        <NavLink to={"/scholarship"}>All Scholarship</NavLink>
      </li>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300 ">
        <NavLink to={"/dashboard/profile"}>Dashboard</NavLink>
      </li>
    </>
  );
  return (
    <nav>
      <div className="navbar lg:py-10  backdrop-filter container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-base-200"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"}>
            <span className="md:text-4xl text-xl flex items-center justify-center gap-1 ">
              <GiBookAura className="text-[#4169e1]" />{" "}
              <span className="uppercase font-bold hover:text-[#4169e1] transition ease-in-out duration-300">
                Educate
              </span>
            </span>
          </Link>
        </div>

        <div className="navbar-end items-center gap-4">
          <ul className="hidden lg:flex gap-6 items-center text-lg font-medium mr-3">
            {links}
          </ul>
          <ThemeToggle />

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="user" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p className="justify-between">{user.email}</p>
                </li>
                <li>
                  <p>{user.displayName}</p>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn border-none bg-[#4169e1] text-white hover:bg-[#3253b6]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
