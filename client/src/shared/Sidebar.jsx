import { Link } from "react-router-dom";
import UserMenu from "../pages/Dashboard/MenuItem/UserMenu";
import { GiBookAura } from "react-icons/gi";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Moderator_AdminMenu from "../pages/Dashboard/MenuItem/Moderator_AdminMenu";

const Sidebar = () => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return <Loading />;
  }
  const links = (
    <>
      {role === "moderator" || role === "admin" ? (
        <Moderator_AdminMenu />
      ) : (
        <UserMenu />
      )}
    </>
  );
  return (
    <div className="drawer w-0 lg:w-full lg:h-full">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="h-full bg-base-300 ">
          <div className="flex-none lg:hidden mt-4">
            <div className="flex items-center">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <label>
                <Link to={"/"}>
                  <span className="md:text-4xl text-xl flex items-center justify-center gap-1  ">
                    <GiBookAura className="text-[#4169e1]" />{" "}
                    <span className="uppercase font-bold hover:text-[#4169e1] transition ease-in-out duration-300">
                      Educate
                    </span>
                  </span>
                </Link>
              </label>
            </div>
          </div>
          <div className=" flex-1 px-2 pt-8 hidden lg:block">
            <Link to={"/"}>
              <span className="md:text-4xl text-xl flex items-center justify-center gap-1 ">
                <GiBookAura className="text-[#4169e1]" />{" "}
                <span className="uppercase font-bold hover:text-[#4169e1] transition ease-in-out duration-300">
                  Educate
                </span>
              </span>
            </Link>
          </div>
          <div className="hidden flex-none mt-5 p-2  lg:block">
            <ul className="space-y-5 p-4 ps-10 font-medium text-lg">{links}</ul>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="bg-base-200 min-h-full w-[70%] p-4 pt-10 ">{links}</ul>
      </div>
    </div>
  );
};

export default Sidebar;
