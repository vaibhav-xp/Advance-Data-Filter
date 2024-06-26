import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { router } from "../utils/app.routes";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setToggleMenu(true);
      } else {
        setToggleMenu(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="bg-blue-300">
      <div className="flex container mx-auto justify-between items-center py-6 px-4">
        <div className="text-2xl font-bold">Advance Data Filter</div>
        <nav
          className={`${
            toggleMenu ? "flex" : "hidden"
          } md:flex fixed md:relative top-16 left-0 md:top-auto md:left-auto flex-col md:flex-row bg-blue-300 md:bg-transparent p-4 md:p-0 w-full md:w-auto items-center gap-4 text-md`}
        >
          <Link className="block" to={"/"}>
            Home
          </Link>
          <Link className="block" to={"/search-course"}>
            Courses
          </Link>
          <Link className="block" to={"/login"}>
            Login
          </Link>
          <Link className="block" to={"/portal"}>
            Portal
          </Link>
        </nav>
        <FaBars
          className="md:hidden cursor-pointer"
          onClick={() => setToggleMenu(!toggleMenu)}
        />
      </div>
    </header>
  );
};

export default Header;
