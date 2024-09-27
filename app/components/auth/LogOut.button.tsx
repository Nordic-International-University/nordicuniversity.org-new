"use client";

import React from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("access_token");
        router.push("/register");
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 px-4 text-white py-1 rounded text-[20px] font-bold max-sm:text-[12px] max-sm:px-2 max-sm:py-1"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
