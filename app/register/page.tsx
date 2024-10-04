"use client";
import React, { useEffect, useState} from "react";
import { Button, Input, message, Modal } from "antd";
import { useLoginUserMutation } from "@/lib/query/register.query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import login from "@/public/log.svg";
import register from "@/public/register.svg";
import OtpInput from "@/app/register/otp.input";
import axios from "axios";
import { validationSchema } from "@/app/validation/auth.validation";
import PhoneInput from "react-phone-input-2";;
import "react-phone-number-input/style.css";
import "react-phone-input-2/lib/style.css";


interface FormData {
  full_name: string;
  phone_number: string;
  password: string;
  science_degree: string;
  job: string;
  place_position: string;
}

interface LoginData {
  phone_number: string;
  password: string;
}

const Page: React.FC = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone_number: "",
    password: "",
    science_degree: "",
    job: "",
    place_position: "",
  });

  const [loginData, setLoginData] = useState({
    phone_number: "",
    password: "",
  });


  const handlePhoneNumberChange = (
      value: string | undefined,
      setState: React.Dispatch<React.SetStateAction<FormData | LoginData>>
  ) => {
    if (value) {
          setState((prevState) => ({
            ...prevState,
            phone_number: value,
          }));

    }
  };


  useEffect(() => {
    const mainElement = document.getElementById("main");
    if (mainElement) {
      mainElement.style.paddingBottom = "0";
    }

    return () => {
      if (mainElement) {
        mainElement.style.paddingBottom = "150px";
      }
    };
  }, []);

  console.log(loginData)

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

  const handleInputChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/sms/check-number`,
        {
          phone_number: formData.phone_number,
        },
      );
      setId(response.data.verifyID);
      setModalVisible(true);

      message.success("Telefon raqamingizga sms yuborildi!");
    } catch (error: any) {
      if (error.name === "ValidationError") {
        message.warning(error.errors[0]);
      }
      if (error?.message === "Network Error") {
        message.error("Server bilan muammo yuz berdi.");
      }
      if (error?.status === 409) {
        message.error(error.response.data.message);
      }
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginDataRequest = {
      phone_number: "+" + loginData.phone_number,
      password: loginData.password,
    };

    try {
      const data = await loginUser(loginDataRequest).unwrap();
      data;
      if (data.message === "USER_LOGGED_IN") {
        Cookies.set("access_token", data.login_data.token);
        Cookies.set("phone", loginData.phone_number);
        router.push("/profile");
        message.success("Muvaffaqiyatli kirildi!");
      }
    } catch (err: any) {
      if (err?.status === 422) {
        message.error("Noto‘g‘ri telefon raqami yoki parol");
      } else if (err?.status === 500) {
        message.error(
          "Kutilmagan xatolik iltimos birozdan so‘ng urinib ko‘ring",
        );
      }
    }
  };

  return (
    <>
      <div className={isModalVisible ? "blur" : "content"}>
        <Modal
          width={400}
          title="Tasdiqlash kodini kiriting"
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          centered={true}
        >
          {id && <OtpInput id={id} formData={formData} />}
        </Modal>
      </div>
      <div
        className={`auth-container overflow-hidden ${isSignUpMode ? "sign-up-mode" : ""}`}
      >
        <div className="forms-container overflow-hidden">
          <div className="signin-signup-container">
            <form
              onSubmit={handleSignInSubmit}
              className={`sign-in-form ${isSignUpMode ? "inactive" : "active"}`}
            >
              <h2 className="title">Kirish</h2>
              <div className="w-[300px]">
                <PhoneInput
                    containerClass="relative"
                    buttonClass="border-none absolute top-[13px] left-1 bg-transparent h-5"
                  inputClass="w-full custom-phone-input py-[22px] border-1 focus:outline-none rounded-3xl pl-10"
                  placeholder="Telefon Raqam"
                  value={loginData.phone_number}
                  enableSearch={false}
                  inputProps={{
                    name: "text",
                    required: true,
                    autoFocus: true,
                  }}
                  disableDropdown={false}
                  disableCountryCode={false}
                  onChange={(value) => handlePhoneNumberChange(value, setLoginData)}
                  country={"uz"}
                />
              </div>
              <div className="w-[300px] mt-5">
                <Input
                  className="w-full py-3 rounded-3xl pl-3"
                  type="password"
                  name="password"
                  placeholder="Parol"
                  value={loginData.password}
                  onChange={handleInputChangeLogin}
                  required
                />
              </div>
              <div className="w-[300px]">
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={isLoggingIn}
                  size="large"
                  className="w-full mt-5 py-[25px] rounded-3xl"
                  disabled={isLoggingIn}
                >
                  Kirish
                </Button>
              </div>
            </form>

            <form
              onSubmit={handleSignUpSubmit}
              className={`sign-up-form ${isSignUpMode ? "active" : "inactive"}`}
            >
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
              <Button
                htmlType="submit"
                type="primary"
                className="rounded-3xl mt-4 py-[22px] max-w-[380px] w-full"
              >
                Ro‘yxatdan o‘tish
              </Button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="auth-panel max-sm:pt-2 max-sm:px-0 auth-left-panel">
            <div className="content">
              <h3 className="text-2xl">Nordik elektron jurnali</h3>
              <p className="max-sm:text-sm text-[20px]">
                Agar ro'yxatdan o'tmagan bo'lsangiz ro'yxatdan o'tish tugmasini
                bosing!
              </p>
              <Button
                className="rounded-3xl px-4 mt-4 bg-transparent text-white font-semibold text-lg py-[20px] border-white border-2"
                id="sign-up-btn"
                onClick={handleSignUpClick}
              >
                Ro‘yxatdan o‘tish
              </Button>
            </div>
            <Image src={login} className="image" alt="login image" />
          </div>
          <div className="auth-panel max-sm:pt-2 max-sm:px-0 auth-right-panel">
            <div className="content">
              <h3 className="text-2xl max-sm:text-xl">
                Nordik elektron jurnali
              </h3>
              <p className="max-sm:text-[15px] text-[20px]">
                Agar ro'yxatdan o'tgan bo'lsangiz profilingiz mavjud bo'lsa
                kirish tugmasini bosing!
              </p>
              <Button
                className="rounded-3xl max-sm:text-md px-16 mt-4 bg-transparent text-white font-semibold text-lg py-[20px] border-white border-2"
                id="sign-up-btn"
                onClick={handleSignInClick}
              >
                Kirish
              </Button>
            </div>
            <Image src={register} className="image" alt="register-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
