"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import journal from "@/public/nature-600-min.jpg";
import { useRegisterUserMutation } from "@/lib/query/register.query";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { message } from "antd";
import Cookies from "js-cookie"; // js-cookie dan import qiling
import { useRouter } from "next/navigation"; // next/router dan useRouter hookini import qiling

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
  const [registerUser, { isLoading, error, isSuccess }] = useRegisterUserMutation();
  const router = useRouter(); // Router ni oling

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const result = await registerUser({
        number: data.phone,
        password: data.password,
        full_name: data.fullName,
        science_degree: data.academicDegree,
        job: data.workplace,
        place_position: data.profession,
      }).unwrap();

      console.log("User registered successfully:", result);

      // Tokenni cookie fayliga saqlash
      if (result?.data?.token) {
        Cookies.set('access_token', result.token, { expires: 7 }); // Tokenni 7 kunga saqlash
        message.success("Siz muvaffaqiyatli ro'yxatdan o'tdingiz");

        // "/profile" sahifasiga yo'naltirish
        router.push('/profile');
      }

      reset(); // Formani tozalash
    } catch (err) {
      console.error("Failed to register user:", err);
      message.error("Ro'yxatdan o'tishda xatolik yuz berdi");
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
                      rules={{required: "Iltimos telefon raqamingizni kiriting"}}
                      render={({field}) => (
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
                  {errors.fullName && <span>{errors.fullName.message}</span>}
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
                  {errors.academicDegree && <span>{errors.academicDegree.message}</span>}
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
                  {errors.workplace && <span>{errors.workplace.message}</span>}
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
                  {errors.profession && <span>{errors.profession.message}</span>}
                </div>

                <div className="flex flex-col mb-8">
                  <strong>Elektron Pochta</strong>
                  <input
                      placeholder="Elektron pochtangizni kiriting"
                      type="email"
                      {...register("email", {
                        required: "Iltimos elektron pochtangizni kiriting",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Elektron pochта notogri formatda kirgizilgan",
                        },
                      })}
                      className="border-gray border-[1px] rounded py-2 px-4 pl-2"
                  />
                  {errors.email && <span>{errors.email.message}</span>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-[120px] mt-6 py-2"
                    disabled={isLoading} // Блокируем кнопку, пока идет загрузка
                >
                  <strong>
                    {isLoading ? "Loading..." : "Ro'yxatdan O'tish"}
                  </strong>
                </button>
                {/* Отображаем ошибку, если она есть */}
                {isSuccess && <p className="text-green-500">User registered
                  successfully!</p>} {/* Уведомление об успешной регистрации */}
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Page;
