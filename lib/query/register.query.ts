import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://journal2.nordicun.uz", // Базовый URL вашего API
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/author/create", // URL для регистрации пользователя
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Устанавливаем тип контента
                },
                body: {
                    phone_number: `+${userData.phone_number}`,
                    password: userData.password,
                    full_name: userData.full_name,
                    science_degree: userData.science_degree,
                    birthday: userData.birthday,
                    job: userData.job,
                    place_position: userData.place_position,
                },
            }),
        }),
        loginUser: builder.mutation({
            query: (loginData) => ({
                url: "/author/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    phone_number: `${loginData.phone_number}`,
                    password: loginData.password,
                },
            }),
        }),
    }),
});

// Экспортируем хуки для использования мутации в компонентах
export const { useRegisterUserMutation,useLoginUserMutation } = registerApi;







