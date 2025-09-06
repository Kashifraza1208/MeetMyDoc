import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-200">
      <div
        className="flex items-center cursor-pointer gap-2"
        onClick={() => navigate("/")}
      >
        <img src={assets.logo} alt="" className="h-8 w-8 object-contain" />

        <span className="text-2xl font-bold text-[var(--parimary)]">
          MeetMyDoc
        </span>
      </div>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-[var(--primary)] m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-[var(--primary)] m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-[var(--primary)] m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-[var(--primary)] m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex border border-gray-100 w-full justify-center gap-x-1.5 rounded-md bg-white/10 md:px-3 px-1.5 py-1 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
              <img className="w-8 rounded-full" src={userData.image} alt="" />

              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 size-5 text-gray-400"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to={"/my-profile"}
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                  >
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to={"/my-appointments"}
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                  >
                    My Appointments
                  </Link>
                </MenuItem>

                <form onSubmit={handleLogout}>
                  <MenuItem>
                    <button
                      type="submit"
                      className="block cursor-pointer w-full px-4 py-2 text-left text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </form>
              </div>
            </MenuItems>
          </Menu>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[var(--primary)] text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          src={assets.menu_icon}
          alt=""
          className="w-6 md:hidden"
          onClick={() => setShowMenu(true)}
        />

        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden top-0 right-0 bottom-0 bg-white z-20 overflow-hidden transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={() => navigate("/")}
            >
              <img
                src={assets.logo}
                alt=""
                className="h-8 w-8 object-contain"
              />
              <span className="text-2xl font-bold text-[var(--parimary)]">
                MeetMyDoc
              </span>
            </div>
            <img
              className="w-7"
              src={assets.cross_icon}
              alt=""
              onClick={() => setShowMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              {" "}
              <p className="px-4 py-2 rounded inline-block">DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
            <button
              onClick={() => navigate("/login")}
              className="bg-[var(--primary)] text-center  text-white px-8 py-3 rounded-full font-light  block md:hidden"
            >
              Create Account
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
