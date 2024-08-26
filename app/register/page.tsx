"use client"
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import journal from "@/public/nature-600-min.jpg";
import "react-phone-input-2/lib/style.css";

interface IFormInput {
  phone: string;
  email: string;
  password: string;
  fullName: string;
  academicDegree: string;
  workplace: string;
  profession: string;
}



const Page: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Received values of form: ", data.phone);
    // Здесь можно добавить логику отправки данных на сервер

    // Очистить поля формы после успешного сабмита``
    reset();
  };

  return (
      <div className="container">
        <div className="flex justify-center items-center mt-10 mb-8">
          <div className="h-auto mr-10 max-sm:mr-0 shadow-[0.6em_0.6em_1.2em_#d2dce9,-0.5em_-0.5em_1em_#fff] rounded-3xl">
            <Image
                src={journal}
                alt="image"
                className="w-[500px] h-[700px] rounded-3xl max-md:hidden "
                width={500}
                height={500}
            />
          </div>
          <div>
            <div className="flex">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-6">
                  <strong>Telefon Raqamingiz</strong>
                  <input
                      placeholder="Telefon raqamingizni kiriting"
                      type="tel"
                      {...register("phone", {
                        required: "Iltimos telefon raqamingizni kiriting",
                      })}
                      className="border-gray border-[1px] rounded py-2 px-4 pl-2"
                  />
                  {errors.phone && (
                      <span>{errors.phone.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <strong>Parol</strong>
                  <input
                      placeholder="Parolingizni kiriting"
                      type="password"
                      {...register("password", {
                        required: "Iltimos parolingizni kiriting",
                      })}
                      className="border-gray border-[1px] rounded py-2 px-[100px] pl-2"
                  />
                  {errors.password && (
                      <span>{errors.password.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <strong>To'liq ism, familiya</strong>
                  <input
                      placeholder="F.I.SH kiriting"
                      type="text"
                      {...register("fullName", {
                        required: "Iltimos F.I.SH kiriting",
                      })}
                      className="border-gray border-[1px] rounded py-2 px-[100px] pl-2"
                  />
                  {errors.fullName && (
                      <span>{errors.fullName.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <strong>Ilmiy daraja va unvoningiz</strong>
                  <input
                      placeholder="Ilmiy daraja va unvoningizni kiriting"
                      type="text"
                      {...register("academicDegree", {
                        required: "Iltimos ilmiy daraja va unvoningizni kiriting",
                      })}
                      className="border-gray border-[1px] rounded py-2 px-[100px] pl-2"
                  />
                  {errors.academicDegree && (
                      <span>{errors.academicDegree.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <strong>Ish joyi</strong>
                  <input
                      placeholder="Ish joyini kiriting"
                      type="text"
                      {...register("workplace", {
                        required: "Iltimos ish joyini kiriting",
                      })}
                      className="border-gray border-[1px] rounded py-2 px-[100px] pl-2"
                  />
                  {errors.workplace && (
                      <span>{errors.workplace.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <strong>Kasb</strong>
                  <input
                      placeholder="Kasbingizni kiriting"
                      type="text"
                      {...register("profession", {
                        required: "Iltimos kasbingizni kiriting",
                      })}
                      className="border-gray border-[1px] rounded py-2 px-[100px] pl-2"
                  />
                  {errors.profession && (
                      <span>{errors.profession.message}</span>
                  )}
                </div>

                <div className="flex flex-col mb-8">
                  <strong>Elektron Pochta</strong>
                  <input
                      placeholder="Elektron pochtangizni kiriting"
                      type="email"
                      {...register("email", {
                        required: "Iltimos elektron pochtangizni kiriting",
                        pattern: {
                          value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Elektron pochta notogri formatda kirgizilgan",
                        },
                      })}
                      className="border-gray border-[1px] rounded py-2 px-4 pl-2"
                  />
                  {errors.email && (
                      <span>{errors.email.message}</span>
                  )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-[120px] mt-6 py-2"
                >
                  <strong>
                    Ro'yxatdan O'tish
                  </strong>

                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;
