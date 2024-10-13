import "./Navbar.css";
import navLogo from "../../../assets/logos/fullLogoDark.svg";
import menuIcon from "../../../assets/icons/menuIcon.svg";
import closeIcon from "../../../assets/icons/closeIcon.svg";
import Avatar from "@mui/material/Avatar";
import avatarImg from "../../../assets/images/demoAvatar.webp";
import HomePageIcon from "../../../assets/icons/HomePageIcon.png";
import CreateBasketIcon from "../../../assets/icons/CreateBasketIcon.png";
import liveBasketIcon from "../../../assets/icons/liveBasketIcon.png";
import completedBasketIcon from "../../../assets/icons/completedBasketIcon.png";
import notificationIcon from "../../../assets/icons/notificationIcon.png";
import settingsIcon from "../../../assets/icons/settingsIcon.png";
import arrowRightIcon from "../../../assets/icons/arrowRightIcon.svg";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigate = useNavigate();
  function menuClickHandler(to: string) {
    setOpen(false);
    navigate(to);
  }

  return (
    <div className="sticky top-0 bg-slate-100 px-4 z-50 border-b mb-3">
      <div className="flex align-middle justify-between py-3">
        <img
          src={navLogo}
          alt=""
          className="navLogo"
          style={{ maxWidth: "120px" }}
        />
        <img
          src={menuIcon}
          alt=""
          className="menuIcon"
          style={{ width: "20px" }}
          onClick={toggleDrawer(true)}
        />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="drawerHeader flex align-middle justify-between p-3 border-b w-screen">
          <p className="text-xl">Menu</p>
          <img
            src={closeIcon}
            alt="close"
            className="w-4"
            onClick={toggleDrawer(false)}
          />
        </div>
        <div className="drawerMenu px-3">
          <ul>
            <li className="profileItem flex items-center gap-3 border-b py-3">
              <Avatar
                alt="Lewis Hamilton"
                src={avatarImg}
                sx={{ width: 100, height: 100 }}
                className="border"
              />
              <div className="userDetailsWrapper">
                <p className="w-fit fullName text-xl font-medium">
                  Lewis Hamilton
                </p>
                <p className="email subTitle max-w-52 truncate">
                  Lewishamilton8277@gmail.comLewishamilton8277@gmail.com
                </p>
                <p className="w-fit mobile subTitle">9380248374</p>
              </div>
            </li>
            <li
              className="menuItem border-b"
              onClick={() => menuClickHandler("/home")}
            >
              <div className="menuItemLeft">
                <img src={HomePageIcon} alt="Live" />
                <span>Home</span>
              </div>
              <img src={arrowRightIcon} alt="open" className="arrowIcon" />
            </li>
            <li
              className="menuItem border-b"
              onClick={() => menuClickHandler("/create-new-basket")}
            >
              <div className="menuItemLeft">
                <img src={CreateBasketIcon} alt="Live" />
                <span>Create Basket</span>
              </div>
              <img src={arrowRightIcon} alt="open" className="arrowIcon" />
            </li>
            <li
              className="menuItem border-b"
              onClick={() => menuClickHandler("/live")}
            >
              <div className="menuItemLeft">
                <img src={liveBasketIcon} alt="Live" />
                <span>Live Baskets</span>
              </div>
              <img src={arrowRightIcon} alt="open" className="arrowIcon" />
            </li>
            <li
              className="menuItem border-b"
              onClick={() => menuClickHandler("/completed")}
            >
              <div className="menuItemLeft">
                <img src={completedBasketIcon} alt="Live" />
                <span>Completed Baskets</span>
              </div>
              <img src={arrowRightIcon} alt="open" className="arrowIcon" />
            </li>
            <li
              className="menuItem border-b"
              onClick={() => menuClickHandler("/notifications")}
            >
              <div className="menuItemLeft">
                <img src={notificationIcon} alt="Live" />
                <span>Notifications</span>
              </div>
              <img src={arrowRightIcon} alt="open" className="arrowIcon" />
            </li>
            <li
              className="menuItem border-b"
              onClick={() => menuClickHandler("/settings")}
            >
              <div className="menuItemLeft">
                <img src={settingsIcon} alt="Live" />
                <span>Settings</span>
              </div>
              <img src={arrowRightIcon} alt="open" className="arrowIcon" />
            </li>
            <li>
              <button
                className="w-full bg-red-600 text-white py-2 my-4 rounded-sm"
                id="logoutBtn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </Drawer>
    </div>
  );
}
