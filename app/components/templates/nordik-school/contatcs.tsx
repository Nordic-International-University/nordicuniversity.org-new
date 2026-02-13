"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const Contact = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: HiOutlineMail,
      titleKey: "nordic_school.contact.contact_info.email.title",
      valueKey: "nordic_school.contact.contact_info.email.value",
      href: "mailto:info@nis-tashkent.org",
    },
    {
      icon: HiOutlinePhone,
      titleKey: "nordic_school.contact.contact_info.main_phone.title",
      valueKey: "nordic_school.contact.contact_info.main_phone.value",
      href: "tel:+998900918588",
    },
    {
      icon: HiOutlinePhone,
      titleKey: "nordic_school.contact.contact_info.additional_phone.title",
      valueKey: "nordic_school.contact.contact_info.additional_phone.value",
      href: "tel:+998908304913",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "subject",
      "message",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData].trim()) {
        newErrors[field] = true;
      }
    });

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 ${
      errors[field] ? "ring-2 ring-red-300" : ""
    }`;

  return (
    <div className="bg-white">
      <div className="py-10 max-sm:py-6">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl max-sm:text-2xl font-bold text-text_secondary mb-4">
            {t("nordic_school.contact.title")}
          </h1>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(11,64,117,0.6)" }}
          >
            {t("nordic_school.contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info — Left */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-text_secondary mb-5">
              {t("nordic_school.contact.contact_info.title")}
            </h3>

            <div className="flex flex-col gap-3">
              {contactInfo.map((info, index) => (
                <Link
                  key={index}
                  href={info.href}
                  className="group rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
                  style={{ border: "1px solid rgba(11,64,117,0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(11,64,117,0.06)" }}
                    >
                      <info.icon
                        className="text-lg"
                        style={{ color: "#0b4075" }}
                      />
                    </div>
                    <div>
                      <span
                        className="text-xs block"
                        style={{ color: "rgba(11,64,117,0.4)" }}
                      >
                        {t(info.titleKey)}
                      </span>
                      <span className="text-sm font-medium text-text_secondary">
                        {t(info.valueKey)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Address */}
              <div
                className="rounded-2xl p-4"
                style={{ border: "1px solid rgba(11,64,117,0.08)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(11,64,117,0.06)" }}
                  >
                    <HiOutlineLocationMarker
                      className="text-lg"
                      style={{ color: "#0b4075" }}
                    />
                  </div>
                  <div>
                    <span
                      className="text-xs block"
                      style={{ color: "rgba(11,64,117,0.4)" }}
                    >
                      {t("nordic_school.contact.contact_info.address.title")}
                    </span>
                    <span className="text-sm font-medium text-text_secondary leading-relaxed">
                      {t("nordic_school.contact.contact_info.address.line1")}
                      <br />
                      {t("nordic_school.contact.contact_info.address.line2")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form — Right */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8 max-sm:p-5"
              style={{
                backgroundColor: "rgba(11,64,117,0.02)",
                border: "1px solid rgba(11,64,117,0.06)",
              }}
            >
              <h3 className="text-lg font-semibold text-text_secondary mb-6">
                {t("nordic_school.contact.form.title")}
              </h3>

              {submitted && (
                <div
                  className="rounded-xl px-4 py-3 mb-5 text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(16,185,129,0.1)",
                    color: "#059669",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  {t("nordic_school.contact.form.success_message")}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "rgba(11,64,117,0.5)" }}
                    >
                      {t(
                        "nordic_school.contact.form.fields.first_name.label",
                      )}
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t(
                        "nordic_school.contact.form.fields.first_name.placeholder",
                      )}
                      className={inputClasses("firstName")}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid rgba(11,64,117,0.1)",
                        color: "#0b4075",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "rgba(11,64,117,0.5)" }}
                    >
                      {t(
                        "nordic_school.contact.form.fields.last_name.label",
                      )}
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t(
                        "nordic_school.contact.form.fields.last_name.placeholder",
                      )}
                      className={inputClasses("lastName")}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid rgba(11,64,117,0.1)",
                        color: "#0b4075",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "rgba(11,64,117,0.5)" }}
                    >
                      {t("nordic_school.contact.form.fields.email.label")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t(
                        "nordic_school.contact.form.fields.email.placeholder",
                      )}
                      className={inputClasses("email")}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid rgba(11,64,117,0.1)",
                        color: "#0b4075",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs font-medium mb-1.5 block"
                      style={{ color: "rgba(11,64,117,0.5)" }}
                    >
                      {t("nordic_school.contact.form.fields.phone.label")}
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t(
                        "nordic_school.contact.form.fields.phone.placeholder",
                      )}
                      className={inputClasses("phone")}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid rgba(11,64,117,0.1)",
                        color: "#0b4075",
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="text-xs font-medium mb-1.5 block"
                    style={{ color: "rgba(11,64,117,0.5)" }}
                  >
                    {t("nordic_school.contact.form.fields.subject.label")}
                  </label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t(
                      "nordic_school.contact.form.fields.subject.placeholder",
                    )}
                    className={inputClasses("subject")}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid rgba(11,64,117,0.1)",
                      color: "#0b4075",
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label
                    className="text-xs font-medium mb-1.5 block"
                    style={{ color: "rgba(11,64,117,0.5)" }}
                  >
                    {t("nordic_school.contact.form.fields.message.label")}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t(
                      "nordic_school.contact.form.fields.message.placeholder",
                    )}
                    className={`${inputClasses("message")} resize-none`}
                    style={{
                      backgroundColor: "white",
                      border: "1px solid rgba(11,64,117,0.1)",
                      color: "#0b4075",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: "#0b4075",
                    boxShadow: "0 4px 16px rgba(11,64,117,0.25)",
                  }}
                >
                  {t("nordic_school.contact.form.submit_button")}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-text_secondary text-center mb-6">
            {t("nordic_school.contact.location.title")}
          </h3>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(11,64,117,0.08)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d922.2286159032001!2d69.2187274!3d41.2876501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e1!3m2!1sru!2s!4v1754888042152!5m2!1sru!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
