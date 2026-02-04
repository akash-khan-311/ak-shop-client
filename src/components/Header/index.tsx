"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { Fade as Hamburger } from "hamburger-react";
import { PhoneCall, User, ShoppingCart, Search } from "lucide-react";
import Logo from "../Logo";
import NavbarRight from "./NavbarRight";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hook";

import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import UserDropDown from "../ui/Dropdown/user.dropdown";
import { usePathname } from "next/navigation";

import Container from "../ui/Container";

import AppThemeSwitch from "../ui/ThemeSwitch";

import { USER_ROLE } from "@/constant";
import AdminDropDown from "../ui/Dropdown/admin.dropdown";
import { useGetMyCartQuery } from "@/redux/features/cart/cartApi";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();
  const wishlists = useSelector((state: RootState) => state.wishlist.items);
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const { data: cartData } = useGetMyCartQuery(undefined);
  const cart = cartData?.data || null;
  const cartItems = cart?.items;
  const pathname = usePathname();
  const handleOpenCartModal = () => {
    openCartModal();
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  const handleSearch = () => {
    console.log({ searchQuery });
  };

  const isVendorDashboard = pathname.startsWith("/vendor/");
  const isAdminDashboard = pathname.startsWith("/admin/");
  const isSuperAdminDashboard = pathname.startsWith("/superAdmin/");

  return (
    <header
      className={`${isVendorDashboard && "hidden"} ${isAdminDashboard && "hidden"} ${isSuperAdminDashboard && "hidden"} fixed  left-0 top-0 w-full z-9999 bg-white dark:bg-dark-2 transition-all ease-in-out duration-300 ${
        stickyMenu &&
        "shadow-[0px_2px_20px_1px_rgba(0,_0,_0,_0.7)] dark:shadow-[0px_15px_18px_5px_rgba(255,_255,_255,_0.05)] "
      }`}
    >
      <Container>
        {/* <!-- header top start --> */}
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
            stickyMenu ? "py-4" : "py-6"
          }`}
        >
          {/* <!-- header top left --> */}
          <div className="w-full flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
            <div className="shrink-0 w-full sm:w-auto">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <div className=" relative xl:w-1/3 w-full ">
              <form className="">
                <div className="flex items-center">
                  <div className="relative  w-full ">
                    <input
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      type="search"
                      name="search"
                      id="search"
                      placeholder="I am shopping for..."
                      autoComplete="off"
                      className=" w-full rounded-md bg-gray-1 dark:bg-dark-3 border border-gray-6 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
                    />

                    <button
                      type="submit"
                      id="search-btn"
                      aria-label="Search"
                      className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-pink"
                    >
                      <Search size={20} color="#A3004C" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <!-- header top right --> */}
          <div className=" flex w-full justify-end items-center gap-7.5 ">
            <div className="hidden xl:flex items-center gap-3.5">
              <PhoneCall color="#A3004C" size={22} />

              <div>
                <span className="block text-2xs text-dark-4 uppercase dark:text-white">
                  24/7 SUPPORT
                </span>
                <p className="font-medium text-custom-sm text-dark dark:text-white">
                  <a href="tel:+0123456789">+0123 456 789</a>
                </p>
              </div>
            </div>
            {/* <Logout /> */}
            {/* <!-- divider --> */}
            <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span>

            <div className="flex w-full lg:w-auto justify-between items-center gap-5">
              <div className="flex items-center gap-5">
                {user ? (
                  <>
                    {user?.role === "user" && (
                      <UserDropDown setIsOpen={setIsOpen} isOpen={isOpen} />
                    )}
                    {user?.role === USER_ROLE.admin && (
                      <AdminDropDown setIsOpen={setIsOpen} isOpen={isOpen} />
                    )}
                    {user?.role === USER_ROLE.superAdmin && (
                      <AdminDropDown setIsOpen={setIsOpen} isOpen={isOpen} />
                    )}
                  </>
                ) : (
                  <Link href="/signin" className="flex items-center gap-2.5">
                    <User color="#A3004C" size={25} />
                    <div>
                      <span className="block text-2xs text-dark-4 uppercase dark:text-white">
                        account
                      </span>
                      <p className="font-medium text-custom-sm text-dark dark:text-white">
                        Sign In
                      </p>
                    </div>
                  </Link>
                )}

                <button
                  onClick={handleOpenCartModal}
                  className="flex items-center gap-2.5"
                >
                  <span className="inline-block relative">
                    <ShoppingCart color="#A3004C" size={25} />

                    <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-pink w-4.5 h-4.5 rounded-full text-white">
                      {cartItems?.length}
                    </span>
                  </span>

                  <div>
                    <span className="block text-2xs text-dark-4 uppercase dark:text-white">
                      cart
                    </span>
                    <p className="font-medium text-custom-sm text-dark dark:text-white">
                      {/* ${totalPrice} */}
                    </p>
                  </div>
                </button>
              </div>

              <div className="flex justify-center items-center gap-x-5">
                {/* <!-- Hamburger Toggle BTN --> */}
                <button
                  id="Toggle"
                  aria-label="Toggler"
                  className="xl:hidden block "
                  onClick={() => setNavigationOpen(!navigationOpen)}
                >
                  <Hamburger
                    size={25}
                    toggled={navigationOpen}
                    toggle={setNavigationOpen}
                  />
                </button>
                {/* //   <!-- Hamburger Toggle BTN --> */}
                <AppThemeSwitch />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- header top end --> */}
      </Container>

      <div className="border-t border-gray-3">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div className="flex items-center justify-between">
            {/* <!--=== Main Nav Start ===--> */}
            <div
              className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                navigationOpen &&
                `!visible bg-white dark:bg-dark-2 shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
              }`}
            >
              {/* <!-- Main Nav Start --> */}
              <nav>
                <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown
                        key={i}
                        menuItem={menuItem}
                        stickyMenu={stickyMenu}
                      />
                    ) : (
                      <li
                        key={i}
                        className="group relative before:w-0 before:h-[3px] dark:before:bg-white before:bg-pink before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                      >
                        <Link
                          href={menuItem.path}
                          className={`hover:text-pink dark:hover:text-gray dark:text-white text-custom-sm font-medium text-dark flex ${
                            stickyMenu ? "xl:py-4" : "xl:py-6"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
              {/* //   <!-- Main Nav End --> */}
            </div>
            {/* // <!--=== Main Nav End ===--> */}

            {/* // <!--=== Nav Right Start ===--> */}
            <NavbarRight user={user} wishlists={wishlists} />
            {/* <!--=== Nav Right End ===--> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
