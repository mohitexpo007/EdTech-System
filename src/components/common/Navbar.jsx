import React from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import {categories} from "../../services/apis"
import { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  {/* api call to backend for loading all categories for catalog dropdown */}
  const [subLinks,setSubLinks]=useState([]);

  
  const fetchSublinks = async()=>{
      try{
        const result=await apiConnector("GET",categories.CATEGORIES_API)
        console.log("Printing sublinks result", result);
        setSubLinks(result.data.data); 
      }
      catch(error){
        console.log("could not fetch the category list")
      }
  };

  useEffect(()=>{
     fetchSublinks();
  },[])

  {/* Dropdown timeout function */}
    const [catalogOpen, setCatalogOpen] = useState(false);
    const closeTimeout = React.useRef(null);

    const handleCatalogEnter = () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }

      setCatalogOpen(true);
    };

    const handleCatalogLeave = () => {
      closeTimeout.current = setTimeout(() => {
        setCatalogOpen(false);
      }, 500);
    };


  {/*Route matching of navbar icons to color function */}
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="relative z-[100] flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 overflow-visible">

      <div className="relative flex w-11/12 max-w-maxContent items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            width={160}
            height={42}
            loading="lazy"
            alt="StudyNotion"
          />
        </Link>

        {/* Nav Links - CENTER */}
        <nav className="absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-x-6 text-richblack-25">

            {NavbarLinks.map((link, index) => (
              <li key={index}>
                  {
                    link.title === "Catalog" ? (
                      <div
                        className="relative flex items-center gap-2"
                        onMouseEnter={handleCatalogEnter}
                        onMouseLeave={handleCatalogLeave}
                      >
                        {/* Catalog */}
                        <p className="cursor-pointer">
                          {link.title}
                        </p>

                        <IoIosArrowDropdownCircle />

                        {/* Dropdown */}
                        <div
                          className={`
                            absolute left-1/2 top-full z-50
                            w-[220px]
                            -translate-x-1/2
                            pt-2
                            transition-all duration-200
                            ${
                              catalogOpen
                                ? "visible opacity-100"
                                : "invisible opacity-0"
                            }
                          `}
                        >
                          <div
                            className="
                              relative
                              rounded-md
                              bg-richblack-5
                              p-4
                              text-richblack-900
                              shadow-lg
                            "
                          >
                            {/* Arrow */}
                            <div
                              className="
                                absolute
                                left-1/2
                                -top-2
                                h-4
                                w-4
                                -translate-x-1/2
                                rotate-45
                                bg-richblack-5
                              "
                            />

                            {/* Categories */}
                            {subLinks?.length > 0 ? (
                              subLinks.map((subLink, index) => (
                                <Link
                                  to={`/category/${subLink.name}`}
                                  key={index}
                                  className="
                                    relative z-10
                                    block
                                    rounded-md
                                    px-3
                                    py-2
                                    text-sm
                                    hover:bg-richblack-25
                                    hover:text-green-400
                                    transition-all duration-150
                                  "
                                >
                                  {subLink.name}
                                </Link>
                              ))
                            ) : (
                              <p className="text-sm">
                                No categories available
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link to={link.path}>
                        <p
                          className={
                            matchRoute(link.path)
                              ? "text-yellow-25"
                              : "text-richblack-25"
                          }
                        >
                          {link.title}
                        </p>
                      </Link>
                    )
                  }

              </li>
            ))}

          </ul>
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-x-4">

          {/* Cart */}
          {user && user?.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative flex items-center justify-center text-richblack-25 transition-all duration-200 hover:text-yellow-25"
            >
              <AiOutlineShoppingCart className="text-[24px]" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-25 text-[11px] font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}


        </div>

      </div>
    </div>
  );
};

export default Navbar;