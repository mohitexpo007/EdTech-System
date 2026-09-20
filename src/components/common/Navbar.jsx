import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import {categories} from "../../services/apis"
import { IoIosArrowDropdownCircle } from "react-icons/io";
import "./Navbar.css";


const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  //api call to backend for loading all categories for catalog dropdown */}
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

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 18);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  //Dropdown timeout function */}
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


  //Route matching of navbar icons to color function */}
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="navbar-shell">
      <header className={`navbar-frame ${isScrolled ? "navbar-frame--scrolled" : ""}`}>

      <div className="navbar-content">

        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            width={160}
            height={42}
            loading="lazy"
            alt="Atlas"
            className="navbar-logo"
          />
        </Link>

        {/* Nav Links - CENTER */}
        <nav className="navbar-links">
          <ul className="flex items-center gap-x-8 text-base text-richblack-25">

            {NavbarLinks.map((link, index) => (
              <li key={index}>
                  {
                    link.title === "Catalog" ? (
                      <div
                        className="relative flex items-center gap-2 text-base"
                        onMouseEnter={handleCatalogEnter}
                        onMouseLeave={handleCatalogLeave}
                      >
                        {/* Catalog */}
                        <p className="cursor-pointer text-base">
                          {link.title}
                        </p>

                        <IoIosArrowDropdownCircle className="text-xl" />

                        {/* Dropdown */}
                        <div
                          className={`absolute left-1/2 top-full z-50 w-[240px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                              catalogOpen
                                ? "visible opacity-100"
                                : "invisible opacity-0"
                            }`}
                        >
                          <div
                            className="navbar-catalog-dropdown relative rounded-md p-5 shadow-lg"
                          >
                            {/* Arrow */}
                            <div
                              className="navbar-catalog-arrow absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45"
                            />

                            {/* Categories */}
                            {subLinks?.length > 0 ? (
                              subLinks.map((subLink, index) => (
                                <Link
                                  to={`/category/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                  key={index}
                                  className="navbar-catalog-link relative z-10 block rounded-md px-4 py-3 text-base transition-all duration-150"
                                >
                                  {subLink.name}
                                </Link>
                              ))
                            ) : (
                                <p className="navbar-catalog-empty text-base">
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
                              ? "text-base text-yellow-25"
                              : "text-base text-richblack-25"
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
        <div className="navbar-actions">

          {/* Cart */}
          {user && user?.accountType !== "Instructor" && (
            <Link
              to="/dashboard/cart"
              className="relative flex items-center justify-center text-richblack-25 transition-all duration-200 hover:text-yellow-25"
            >
              <AiOutlineShoppingCart className="text-[28px]" />

              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-25 text-xs font-bold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="navbar-login-button">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="navbar-signup-button">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropdown />}


        </div>

      </div>
      </header>
    </div>
  );
};

export default Navbar;
