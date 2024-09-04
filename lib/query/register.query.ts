import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerApi = createApi({
    reducerPath: "registerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://journal2.nordicun.uz",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "/author/create",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    phone_number: userData.number,
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
                url: "/author/login",  // URL для авторизации пользователя
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    phone_number: `+${loginData.number}`, // Телефонный номер пользователя
                    password: loginData.password,  // Пароль пользователя
                },
            }),
        }),
    }),
});

// Экспортируем хуки для использования мутации в компонентах
export const { useRegisterUserMutation,useLoginUserMutation } = registerApi;







