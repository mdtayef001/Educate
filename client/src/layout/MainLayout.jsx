import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <div className=" text-black dark:text-white">
      <header className="sticky top-0 z-50  backdrop-blur-lg bg-opacity-80">
        <NavBar />
      </header>
      <main className="container mx-auto">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
