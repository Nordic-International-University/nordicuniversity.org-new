"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import journal from "@/public/nature-600-min.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
    control,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Received values of form: ", data);
    // Здесь можно добавить логику отправки данных на сервер

    // Очистить поля формы после успешного сабмита
    reset();
  };

  return (
      <div className="container">
        <div className="flex justify-center items-center mt-10 mb-8">
          <div className="h-auto mr-10 max-sm:mr-0 shadow-[0.6em_0.6em_1.2em_#d2dce9,-0.5em_-0.5em_1em_#fff] rounded-3xl">
            <Image
                src={journal}
                alt="image"
                className="w-[500px] h-[700px] rounded-3xl max-md:hidden"
                width={500}
                height={500}
            />
          </div>
          <div>
            <div className="flex">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-6">
                  <strong>Telefon Raqamingiz</strong>
                  <Controller
                      name="phone"
                      control={control}
                      rules={{ required: "Iltimos telefon raqamingizni kiriting" }}
                      render={({ field }) => (
                          <PhoneInput
                              {...field}
                              defaultCountry="UZ"  // Используем defaultCountry вместо country
                              placeholder="Telefon raqamingizni kiriting"
                              value="+998"
                              className="border-gray border-[1px] rounded py-2 px-4 pl-2"
                              onChange={(phone) => setValue("phone", phone || "")}

                          />
                      )}
                  />
                  {errors.phone && <span>{errors.phone.message}</span>}
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
                  {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-[120px] mt-6 py-2"
                >
                  <strong className="text-[20px]">Profilga O'tish</strong>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;
