import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    full_name: Yup.string()
        .required('Ism Familiya majburiy')
        .test('is-valid-fullname', 'Ism Familiya noto‘g‘ri formatda', (value) => !!value), // O'z qo'shimcha qoida
    phone_number: Yup.string()
        .required('Telefon raqami majburiy')
        .max(13, 'Telefon raqami 13 ta belgidan oshmasligi kerak')
        .test(
            'is-valid-phone',
            'Telefon raqami formati noto‘g‘ri (+998123456789)',
            (value) => !value || /^\+998\d{9}$/.test(value)
        ),
    password: Yup.string()
        .required('Parol majburiy')
        .min(8, 'Parol kamida 8 ta belgidan iborat bo‘lishi kerak'),
    place_position: Yup.string()
        .required('Ish joyingiz majburiy'),
    job: Yup.string()
        .required('Kasbingiz majburiy'),
    science_degree: Yup.string()
        .required('Ilmiy daraja majburiy'),
});

export { validationSchema };
