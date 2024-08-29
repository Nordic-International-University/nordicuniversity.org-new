"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import journal from "@/public/nature-600-min.jpg";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useLoginUserMutation } from "@/lib/query/register.query";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

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
  const { register, handleSubmit, reset, control, formState: { errors }, setValue } = useForm<IFormInput>();
  const [loginUser, { isLoading, error, isSuccess }] = useLoginUserMutation();
  const router = useRouter(); // Инициализируем useRouter для перенаправления

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await loginUser({
        number: data.phone,
        password: data.password,
      }).unwrap();


      if(result.login_data.token){
        Cookies.set('access_token',result.login_data.token)
      reset();
      router.push('/profile');
      }
      console.log("User logged in successfully:", result);
    } catch (err) {
      console.error("Failed to login:", err);
    }
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
                              defaultCountry="UZ"
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
                    disabled={isLoading} // Блокируем кнопку, пока идет загрузка
                >
                  <strong className="text-[20px]">
                    {isLoading ? "Loading..." : "Profilga O'tish"}
                  </strong>
                </button>

                {/* Отображаем ошибку, если она есть */}

                {isSuccess && <p className="text-green-500">User logged in successfully!</p>} {/* Уведомление об успешном логине */}
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;
