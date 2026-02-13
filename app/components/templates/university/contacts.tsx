import { useTranslations } from "next-intl";
import { Button, Col, Form, Input, message, Row } from "antd";
import { BiPhone } from "react-icons/bi";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { HiOutlineClock, HiOutlineLocationMarker } from "react-icons/hi";
import { useState } from "react";
import { ContactMessage } from "@/types/api/apiTypes";
import { sendMessageEmail } from "@/app/[lang]/university/contacts/sendMessage";
import { ContactInfo } from "@/types/templates/contacts.types";
import { useSearchParams } from "next/navigation";

const Contacts = ({ props }: { props: ContactInfo | any }) => {
  const t = useTranslations("university.contacts");
  const email = useSearchParams().get("email");

  const [formData, setFormData] = useState<ContactMessage>({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: email ? email.toString() : "",
    message: "",
  });

  const phones = Array.from(
    { length: 5 },
    (_, i) => props[`phone_${i + 1}`],
  ).filter(Boolean);
  const emails = Array.from(
    { length: 5 },
    (_, i) => props[`email_${i + 1}`],
  ).filter(Boolean);

  const sendMessageFormSubmit = async () => {
    try {
      const response = await sendMessageEmail(formData);
      if (response.ok) {
        message?.success("Xabar muvaffaqiyarli yuborildi!");
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Xabar yuborishda xatolik yuz berdi");
      }
    } catch (error) {
      console.error("Serverga ulanishda xatolik:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <article className="mt-8 mb-4">
      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {/* Phone */}
        <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="w-10 h-10 rounded-lg bg-text_secondary/10 flex items-center justify-center mb-3">
            <BiPhone className="text-text_secondary text-lg" />
          </div>
          <h3 className="text-text_secondary text-sm font-bold uppercase tracking-wider mb-2">
            {t("labels.contactUs")}
          </h3>
          <div className="flex flex-col gap-1.5">
            {phones.map((item: string, index: number) => (
              <Link
                key={index}
                href={`tel:${item.replace(/\s/g, "")}`}
                className="text-gray-600 text-[15px] hover:text-text_secondary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="w-10 h-10 rounded-lg bg-text_secondary/10 flex items-center justify-center mb-3">
            <MdEmail className="text-text_secondary text-lg" />
          </div>
          <h3 className="text-text_secondary text-sm font-bold uppercase tracking-wider mb-2">
            Email
          </h3>
          <div className="flex flex-col gap-1.5">
            {emails.map((item: string, index: number) => (
              <Link
                key={index}
                href={`mailto:${item}`}
                className="text-gray-600 text-[15px] hover:text-text_secondary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Working Hours */}
        <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
          <div className="w-10 h-10 rounded-lg bg-text_secondary/10 flex items-center justify-center mb-3">
            <HiOutlineClock className="text-text_secondary text-lg" />
          </div>
          <h3 className="text-text_secondary text-sm font-bold uppercase tracking-wider mb-2">
            {t("labels.workingHours")}
          </h3>
          <p className="text-gray-600 text-[15px]">{props.reception_time}</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 lg:p-8 mb-10">
        <h2 className="text-text_secondary text-xl font-bold mb-6">
          {t("labels.send")}
        </h2>
        <Form onFinish={sendMessageFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="first_name"
              size="large"
              required
              value={formData.first_name}
              onChange={handleInputChange}
              className="rounded-lg"
              placeholder={t("labels.name")}
            />
            <Input
              required
              name="last_name"
              size="large"
              value={formData.last_name}
              onChange={handleInputChange}
              className="rounded-lg"
              placeholder={t("labels.surname")}
            />
            <Input
              name="phone_number"
              required
              size="large"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="rounded-lg"
              placeholder={t("labels.yourPhone")}
            />
            <Input
              name="email"
              type="email"
              size="large"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="rounded-lg"
              placeholder={t("labels.yourEmail")}
            />
          </div>
          <Input.TextArea
            name="message"
            required
            size="large"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="rounded-lg mt-4"
            placeholder={t("labels.yourMessage")}
          />
          <Button
            htmlType="submit"
            className="mt-5 h-10 px-8 text-base bg-text_secondary text-white font-medium rounded-lg
              hover:bg-text_secondary/90 border-none"
          >
            {t("labels.send")}
          </Button>
        </Form>
      </div>

      {/* Map */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineLocationMarker className="text-text_secondary text-xl" />
          <h2 className="text-text_secondary text-xl font-bold">
            {t("map")}
          </h2>
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-200 h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.992487234805!2d69.21628937673012!3d41.28726797131281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e0!3m2!1sru!2s!4v1732694331956!5m2!1sru!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </article>
  );
};

export default Contacts;
