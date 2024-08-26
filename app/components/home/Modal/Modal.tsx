import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Login from "@/app/components/home/Modal/Login";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isRegisterOpen, setRegisterOpen] = useState(true);
    const [isLoginOpen, setLoginOpen] = useState(false);

    if (!isOpen) return null;

    const handleShowRegister = () => {
        setRegisterOpen(true);
        setLoginOpen(false);
    };

    const handleShowLogin = () => {
        setRegisterOpen(false);
        setLoginOpen(true);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white fixed p-6 rounded-lg relative w-1/4">
                <AiOutlineClose
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl cursor-pointer"
                />
                <div className="relative flex justify-between mb-4">
                    <div
                        className={`absolute inset-0 bg-blue-600 transition-all duration-500 ${
                            isRegisterOpen ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ zIndex: isRegisterOpen ? 0 : -1 }}
                    />
                    <button
                        onClick={handleShowRegister}
                        className={`px-4 py-2 font-bold text-white relative z-10 transition-colors duration-500 ${
                            isRegisterOpen ? "bg-blue-600" : "bg-blue-500"
                        }`}
                    >
                        Register
                    </button>
                    <button
                        onClick={handleShowLogin}
                        className={`px-4 py-2 font-bold text-white relative z-10 transition-colors duration-500 ${
                            isLoginOpen ? "bg-blue-600" : "bg-blue-500"
                        }`}
                    >
                        Login
                    </button>
                    <div
                        className={`absolute inset-0 bg-blue-600 transition-all duration-500 ${
                            isLoginOpen ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ zIndex: isLoginOpen ? 0 : -1 }}
                    />
                </div>
                <hr className="mb-4"/>

                {isLoginOpen && <Login isOpen={isLoginOpen} onClose={onClose} />}
            </div>
        </div>
    );
};

export default Modal;
