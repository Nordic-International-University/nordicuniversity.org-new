import {createSlice} from "@reduxjs/toolkit";
import {navbarInitialState} from "@/types/navbar.types";
import {navbarReducer} from "@/lib/reducer/navbar.reducer";
import {ProfileFilled} from "@ant-design/icons";
import {GrArticle} from "react-icons/gr";
import {BiLogOut} from "react-icons/bi";

const initialState: navbarInitialState = {
    isOpen: false,
    menuItems: [
        {path: "/about", name: "Jurnal haqida", active: false},
        {path: "/instruction", name: "Yo’riqnoma", active: false},
        {path: "/publications", name: "Nashrlar", active: false},
        {path: "/volumes", name: "Asosiy yo’nalishlar", active: false},
        {path: "/contact", name: "Bog’lanish", active: false},
    ],
    dropDowniItems: [
        {
            key: '1',
            label: 'Profil',
            icon: <ProfileFilled className="text-lg"/>,
        },
        {
            key: '3',
            label: 'Maqola yuborish',
            icon: <GrArticle className="text-lg"/>,
        },
        {
            key: '2',
            label: 'Chiqish',
            icon: <BiLogOut className="text-lg"/>,
        }
    ],
    reFetch: false,
};

const navbarSLice = createSlice({
    name: "navbar",
    initialState: initialState,
    reducers: navbarReducer,
});

export const {openMenu, closeMenu, changeReFetch} = navbarSLice.actions;

export default navbarSLice.reducer;
