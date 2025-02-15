import { FaChartLine, FaUser } from "react-icons/fa";
import { MdManageAccounts, MdOutlineEditNote } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdOutlineReviews } from "react-icons/md";
import useRole from "../../../hooks/useRole";
import { RiListSettingsLine } from "react-icons/ri";

const Moderator_AdminMenu = () => {
  const [role] = useRole();
  return (
    <>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink className="flex items-center  gap-2" to={"/dashboard/profile"}>
          <FaUser className="text-base" />
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          className="flex items-center gap-2"
          to={"/dashboard/manage-all-scholarships"}
        >
          <RiListSettingsLine />
          Manage Scholarships
        </NavLink>
      </li>

      {role === "admin" ? (
        <li>
          <NavLink
            className="flex items-center gap-2"
            to={"/dashboard/manage-users"}
          >
            <MdManageAccounts />
            Manage Users
          </NavLink>
        </li>
      ) : (
        ""
      )}
      {role === "admin" ? (
        <li>
          <NavLink
            className="flex items-center gap-2"
            to={"/dashboard/analytics-chart"}
          >
            <FaChartLine />
            Analytics Chart
          </NavLink>
        </li>
      ) : (
        ""
      )}
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink
          className="flex items-center gap-2"
          to={"/dashboard/all-reviews"}
        >
          <MdOutlineReviews className="text-lg" />
          All reviews
        </NavLink>
      </li>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink
          className="flex items-center gap-2"
          to={"/dashboard/applied-scholarship"}
        >
          <MdOutlineEditNote className="text-lg" />
          All applied Scholarship
        </NavLink>
      </li>
      <li className="hover:text-[#4169e1] transition ease-in-out duration-300">
        <NavLink
          className="flex items-center gap-2"
          to={"/dashboard/add-scholarship"}
        >
          <MdLibraryAdd />
          Add Scholarship
        </NavLink>
      </li>
    </>
  );
};

export default Moderator_AdminMenu;
