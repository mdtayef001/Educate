import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaListUl } from "react-icons/fa6";
import { MdOutlineEditNote } from "react-icons/md";

const UserMenu = () => {
  return (
    <>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink className="flex items-center  gap-2" to={"/dashboard/profile"}>
          <FaUser className="text-base" />
          My Profile
        </NavLink>
      </li>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink
          className="flex items-center gap-2"
          to={"/dashboard/my-application"}
        >
          <FaListUl className="text-base" />
          My Application
        </NavLink>
      </li>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink
          className="flex items-center gap-2"
          to={"/dashboard/my-reviews"}
        >
          <MdOutlineEditNote className="text-lg" />
          My reviews
        </NavLink>
      </li>
    </>
  );
};

export default UserMenu;
