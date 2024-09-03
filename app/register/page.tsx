"use client";
import React, { useState, useEffect } from "react";
import 'react-phone-number-input/style.css';
import login from '@/public/log.svg';
import register from '@/public/register.svg';
import Image from "next/image";
import {useLoginUserMutation, useRegisterUserMutation} from "@/lib/query/register.query";
import Cookies from "js-cookie";
import {cookies} from "next/headers";
import {redirect, useRouter} from "next/navigation";
import {BsTelegram} from "react-icons/bs";


const Page: React.FC = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [registerUser, { isLoading: isRegistering, isSuccess: isRegisterSuccess, error: registerError }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn, isSuccess: isLoginSuccess, error: loginError }] = useLoginUserMutation();
  const router = useRouter()

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    password: "",
    science_degree: "",
    birthday: "",
    job: "",
    place_position: "",
  });

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData).unwrap();
      Cookies.set('access_token', data.login_data.token);
    } catch (err) {
      console.error('Failed to register user:', err);
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      phone_number: formData.phone_number,
      password: formData.password,
    };

    try {
      const data =  await loginUser(loginData).unwrap();

      if(data.message === "USER_LOGGED_IN"){
        Cookies.set('access_token', data.login_data.token);
        router.push('/profile')
      }
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
      <div className={`auth-container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup-container">
            <form onSubmit={handleSignInSubmit} className={`sign-in-form ${isSignUpMode ? 'inactive' : 'active'}`}>
              <h2 className="title">Kirish</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <input type="submit" value="Login" className="btn solid" disabled={isLoggingIn} />
              {loginError && <p className="error-text">Error: {(loginError as any).message}</p>}

            </form>
            <form onSubmit={handleSignUpSubmit} className={`sign-up-form ${isSignUpMode ? 'active' : 'inactive'}`}>
              <h2 className="title">Ro‘yxatdan o‘tish</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-graduation-cap"></i>
                <input
                    type="text"
                    name="science_degree"
                    placeholder="Science Degree"
                    value={formData.science_degree}
                    onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-birthday-cake"></i>
                <input
                    type="text"
                    name="birthday"
                    placeholder="Birthday (DDMMYYYY)"
                    value={formData.birthday}
                    onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-briefcase"></i>
                <input
                    type="text"
                    name="job"
                    placeholder="Job"
                    value={formData.job}
                    onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-building"></i>
                <input
                    type="text"
                    name="place_position"
                    placeholder="Place Position"
                    value={formData.place_position}
                    onChange={handleInputChange}
                />
              </div>
              <input type="submit" className="btn" value="Ro‘yxatdna o‘tish" disabled={isRegistering} />
              {registerError && <p className="error-text">Error: {(registerError as any).message}</p>}
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="auth-panel auth-left-panel">
            <div className="content">
              <h3>Nordik elektron jurnali</h3>
              <p>
                Agar ro'yxatdan o'tmagaan bo'lsangiz ro'yxatdan o'tish tugmasini bosing!
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
                Ro‘yxatdan o‘tish
              </button>
            </div>
            <Image src={login} className="image" alt="" />
          </div>
          <div className="auth-panel auth-right-panel">
            <div className="content">
              <h3>Nordik elektron jurnali</h3>
              <p>
                Agar ro'yxatdan o'tgan bo'lsangiz hisobingiz mavjud bo'lsa kirish tugmasini bosing!
              </p>
              <button className="btn transparent" id="sign-up-btn" onClick={handleSignInClick}>
                Kirish
              </button>
            </div>
            <Image src={register} className="image" alt=""/>
          </div>
        </div>
      </div>
  );
};

export default Page;
