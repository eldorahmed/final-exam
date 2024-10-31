import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/appSlice";
import { Button, DarkThemeToggle } from "flowbite-react";
import toast from "react-hot-toast";
import { Avatar } from "flowbite-react";
import Aside from "./Aside";
import { Pencil1Icon } from "@radix-ui/react-icons";

const Header = () => {
  const { t } = useTranslation();
  const admin = useSelector((state) => state.app.admin);
  const dispatch = useDispatch();
const navigate =useNavigate()
  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  };

  return (
    <div className=" container mx-auto sticky top-0 w-full z-10">
      <header className="flex flex-col bg-sky-50 w-full text-black dark:bg-slate-700 dark:text-white">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-2xl font-bold">
            Woo
          </Link>
          <nav className="flex w-[60%] justify-center space-x-6 py-2">
            <Link to="/" className="hover:underline">
              {t("navbar.home")}
            </Link>
            <Link to="/about" className="hover:underline">
              {t("navbar.about")}
            </Link>
            {admin ? (
              <div className="flex items-center gap-4 ">
                <Link to="/profile" className="hover:underline">
                  {t("navbar.profile")}
                </Link>
                <Link to="/userProfile" className="hover:underline">
                  {t("navbar.userProfile")}
                </Link>
                <Link to="/write" className="hover:underline flex items-center gap-2"> <Pencil1Icon/>
                  {t("navbar.write")}
                </Link>
              </div>

            ) : (
              ""
            )}
          </nav>
          <div className="flex gap-5">
            <DarkThemeToggle />
            <div className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
            <Avatar alt="User settings" img={admin?admin.avatar:'https://image.shutterstock.com/image-vector/profile-user-avatar-minus-search-260nw-2393607617.jpg'} rounded />
            </div>
            {admin ? (
              <Button
                onClick={() => {
                  if (confirm("Tizimdan chiqasizmi?")) {
                    handleLogout();
                    toast.success("Tizimdan chiqdingiz!");
                  }
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/register">
                <Button>Login</Button>
              </Link>
            )}
            <LanguageSelector />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
