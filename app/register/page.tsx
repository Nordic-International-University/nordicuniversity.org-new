"use client";
import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { useLoginUserMutation, useRegisterUserMutation } from "@/lib/query/register.query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import login from '@/public/log.svg';
import register from '@/public/register.svg';
import {validationSchema} from "@/app/validation/auth.validation";

const Page: React.FC = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    password: "",
    science_degree: "",
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
      await validationSchema.validate(formData, { abortEarly: false });

      const data = await registerUser(formData).unwrap();
      Cookies.set('access_token', data?.data?.token);
      router.push('/profile');
    } catch (err: any) {
      console.log(err)
      if (err.name === 'ValidationError') {
        message.warning(err.errors[0]);
      } else if (err?.status === 409) {
        message.warning('Bunday foydalanuvchi allaqachon mavjud!');
      } else {
        message.error('Ro‘yxatdan o‘tishda xatolik yuz berdi');
      }
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      phone_number: formData.phone_number,
      password: formData.password,
    };

    try {
      const data = await loginUser(loginData).unwrap();
      if (data.message === 'USER_LOGGED_IN') {
        Cookies.set('access_token', data.login_data.token);
        router.push('/profile');
        message.success('Muvaffaqiyatli kirildi!');
      }
    } catch (err: any) {
      if (err?.status === 422) {
        message.error('Noto‘g‘ri telefon raqami yoki parol');
      } else if (err?.status === 500) {
        message.error('Kutilmagan xatolik iltimos birozdan so‘ng urinib ko‘ring');
      }
    }
  };

  return (
      <div className={`auth-container overflow-hidden ${isSignUpMode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container overflow-hidden">
          <div className="signin-signup-container">
            <form onSubmit={handleSignInSubmit} className={`sign-in-form ${isSignUpMode ? 'inactive' : 'active'}`}>
              <h2 className="title">Kirish</h2>
              <div className="w-[300px]">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="text"
                    name="phone_number"
                    placeholder="Telefon Raqam"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="w-[300px] mt-5">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="password"
                    name="password"
                    placeholder="Parol"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
              </div>
              <div className="w-[300px]">
                <Button htmlType="submit" type="primary" size="large" className="w-full mt-5 py-[25px] rounded-3xl" disabled={isLoggingIn}>Kirish</Button>
              </div>
            </form>

            <form onSubmit={handleSignUpSubmit} className={`sign-up-form ${isSignUpMode ? 'active' : 'inactive'}`}>
              <h2 className="title">Ro‘yxatdan o‘tish</h2>
              <div className="max-w-[380px] w-full mt-5">
                <Input
                    type="text"
                    className="w-full py-3 rounded-3xl pl-3"
                    name="full_name"
                    placeholder="Ism, Familiya"
                    value={formData.full_name}
                    onChange={handleInputChange}
                />
              </div>
              <div className="max-w-[380px] w-full mt-5">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="text"
                    name="phone_number"
                    placeholder="Telefon Raqam"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                />
              </div>
              <div className="max-w-[380px] w-full mt-5">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="password"
                    name="password"
                    placeholder="Parol"
                    value={formData.password}
                    onChange={handleInputChange}
                />
              </div>
              <div className="max-w-[380px] w-full mt-5">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="text"
                    name="place_position"
                    placeholder="Ish Joyingiz"
                    value={formData.place_position}
                    onChange={handleInputChange}
                />
              </div>
              <div className="max-w-[380px] w-full mt-5">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="text"
                    name="job"
                    placeholder="Kasbingiz"
                    value={formData.job}
                    onChange={handleInputChange}
                />
              </div>
              <div className="max-w-[380px] w-full mt-5">
                <Input
                    className="w-full py-3 rounded-3xl pl-3"
                    type="text"
                    name="science_degree"
                    placeholder="Ilmiy Daraja"
                    value={formData.science_degree}
                    onChange={handleInputChange}
                />
              </div>
              <Button htmlType="submit" type="primary" className="rounded-3xl mt-4 py-[22px] max-w-[380px] w-full" loading={isRegistering} disabled={isRegistering}>Ro‘yxatdan o‘tish</Button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="auth-panel max-sm:pt-2 max-sm:px-0 auth-left-panel">
            <div className="content">
              <h3 className="text-2xl">Nordik elektron jurnali</h3>
              <p className="max-sm:text-sm text-[20px]">Agar ro'yxatdan o'tmagan bo'lsangiz ro'yxatdan o'tish tugmasini bosing!</p>
              <Button className="rounded-3xl px-4 mt-4 bg-transparent text-white font-semibold text-lg py-[20px] border-white border-2" id="sign-up-btn" onClick={handleSignUpClick}>Ro‘yxatdan o‘tish</Button>
            </div>
            <Image src={login} className="image" alt="" />
          </div>
          <div className="auth-panel max-sm:pt-2 max-sm:px-0 auth-right-panel">
            <div className="content">
              <h3 className="text-2xl max-sm:text-xl">Nordik elektron jurnali</h3>
              <p className="max-sm:text-[15px] text-[20px]">Agar ro'yxatdan o'tgan bo'lsangiz profilingiz mavjud bo'lsa kirish tugmasini bosing!</p>
              <Button className="rounded-3xl max-sm:text-md px-16 mt-4 bg-transparent text-white font-semibold text-lg py-[20px] border-white border-2" id="sign-up-btn" onClick={handleSignInClick}>Kirish</Button>
            </div>
            <Image src={register} className="image" alt="register-image" />
          </div>
        </div>
      </div>
  );
};

export default Page;
