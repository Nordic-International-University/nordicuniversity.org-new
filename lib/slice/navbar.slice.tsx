import { createSlice } from "@reduxjs/toolkit";
import { navbarInitialState } from "@/types/navbar.types";
import { navbarReducer } from "@/lib/reducer/navbar.reducer";
import { ProfileFilled } from "@ant-design/icons";
import { GrArticle } from "react-icons/gr";
import { BiCategory, BiLogOut } from "react-icons/bi";
import { IoHome, IoNewspaperOutline } from "react-icons/io5";
import { MdIntegrationInstructions } from "react-icons/md";
import { FaLink } from "react-icons/fa";

const initialState: navbarInitialState = {
  isOpen: false,
  menuItems: [
    {
      path: "/about",
      name: "Jurnal haqida",
      active: false,
      icon: (
        <IoHome
          style={{ color: "#0196e3" }}
          className="
       text-xl"
        />
      ),
    },
    {
      path: "/instruction",
      name: "Yo’riqnoma",
      active: false,
      icon: (
        <MdIntegrationInstructions
          style={{ color: "#0196e3" }}
          className="
       text-xl"
        />
      ),
    },
    {
      path: "/publications",
      name: "Nashrlar",
      active: false,
      icon: (
        <IoNewspaperOutline style={{ color: "#0196e3" }} className="text-xl" />
      ),
    },
    {
      path: "/volumes",
      name: "Asosiy yo’nalishlar",
      active: false,
      icon: <BiCategory style={{ color: "#0196e3" }} className="text-xl" />,
    },
    {
      path: "/contact",
      name: "Bog’lanish",
      active: false,
      icon: (
        <FaLink
          style={{ color: "#0196e3" }}
          className="
       text-xl"
        />
      ),
    },
  ],
  dropDowniItems: [
    {
      key: "1",
      label: "Profil",
      icon: <ProfileFilled className="text-lg" />,
    },
    {
      key: "3",
      label: "Maqola yuborish",
      icon: <GrArticle className="text-lg" />,
    },
    {
      key: "2",
      label: "Chiqish",
      icon: <BiLogOut className="text-lg" />,
    },
  ],
  reFetch: false,
};

const navbarSLice = createSlice({
  name: "navbar",
  initialState: initialState,
  reducers: navbarReducer,
});

export const { openMenu, closeMenu, changeReFetch } = navbarSLice.actions;

export default navbarSLice.reducer;
