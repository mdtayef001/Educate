import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import NavBar from "../shared/Navbar";

const MainLayout = () => {
  return (
    <div className="container mx-auto text-black dark:text-white">
      <header className="sticky top-0 z-50 ">
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
