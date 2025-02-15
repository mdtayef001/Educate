import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import { Helmet } from "react-helmet-async";

const DashboardLayout = () => {
  return (
    <>
      <Helmet>
        <title>Educate | Dashboard</title>
      </Helmet>
      <section className=" lg:flex  gap-2">
        <div className="lg:h-screen w-80">
          <Sidebar />
        </div>

        <div className="flex-1 p-2 lg:p-0 lg:pt-10  ">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;
