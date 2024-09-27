import {navbarInitialState} from "@/types/navbar.types";

export const navbarReducer = {
    openMenu: (state: navbarInitialState) => {
        state.isOpen = true;
    },
    closeMenu: (state: navbarInitialState) => {
        state.isOpen = false;
    },

    changeReFetch: (state: navbarInitialState) => {
        state.reFetch = !state.reFetch;
    }
};
