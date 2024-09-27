import {createSlice} from "@reduxjs/toolkit";
import {socialMedia} from "@/types/socialMedia.types";
import {SocialMediaReducer} from "@/lib/reducer/socialMedia.reducer";

const initialState: socialMedia = {
    ilovalar: "https://www.instagram.com/nordic_edu/",
};
const socialSlice = createSlice({
    name: "socialMedia",
    initialState,
    reducers: SocialMediaReducer,
});
export const {navigateTo} = socialSlice.actions;
export default socialSlice.reducer;
