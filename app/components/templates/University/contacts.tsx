import { useTranslations } from "next-intl";
import { Button, Col, Form, Input, Row } from "antd";
import { BiPhone } from "react-icons/bi";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

const Contacts = () => {
  const t = useTranslations("university.contacts");

  return (
    <article className="mt-12 mb-4">
      <div className="flex items-start max-lg:flex-col justify-between gap-10">
        <Form className="w-2/3 max-lg:w-full">
          <Row gutter={[12, 12]}>
            <Col span={12} className="max-sm:w-full">
              <Input
                size="large"
                className="rounded placeholder:text-brodCrumbColor bg-text-brodCrumbColor w-full"
                placeholder={t("labels.name")}
              />
            </Col>
            <Col span={12} className="max-sm:w-full">
              <Input
                size="large"
                className="rounded placeholder:text-brodCrumbColor bg-text-brodCrumbColor w-full"
                placeholder={t("labels.surname")}
              />
            </Col>
          </Row>
          <Row gutter={[12, 12]} className="mt-4">
            <Col span={12} className="max-sm:w-full">
              <Input
                size="large"
                className="rounded placeholder:text-brodCrumbColor bg-text-brodCrumbColor w-full"
                placeholder={t("labels.yourPhone")}
              />
            </Col>
            <Col span={12} className="max-sm:w-full">
              <Input
                size="large"
                className="rounded placeholder:text-brodCrumbColor bg-text-brodCrumbColor w-full"
                placeholder={t("labels.yourEmail")}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col span={24} className="max-sm:w-full">
              <Input.TextArea
                size="large"
                rows={4}
                className="rounded placeholder:text-brodCrumbColor bg-text-brodCrumbColor w-full"
                placeholder={t("labels.yourMessage")}
              />
            </Col>
          </Row>
          <Button className="mt-5 px-10 text-md bg-text_secondary text-white font-semibold">
            {t("labels.send")}
          </Button>
        </Form>

        {/* Contact Info */}
        <div className="w-1/4 max-lg:w-full">
          <h2 className="text-lg font-medium mb-2 text-tertiary">
            {t("labels.contactUs")}
          </h2>
          <div className="mb-3">
            <div className="flex items-center text-secondary gap-2">
              <BiPhone className="text-lg" />
              <Link href="tel:+998555084400" className="text-secondary">
                +998 55 508 44 00
              </Link>
            </div>
            <div className="flex items-center text-secondary gap-2">
              <BiPhone className="text-lg" />
              <Link href="tel:+998955053300" className="text-secondary">
                +998 95 505 33 00
              </Link>
            </div>
            <div className="flex items-center mt-3 text-secondary gap-2">
              <MdEmail className="text-lg" />
              <Link
                href="mailto:info@nordicuniversity.org"
                className="text-primary"
              >
                info@nordicuniversity.org
              </Link>
            </div>
          </div>
          <h2 className="text-md font-medium mb-2 text-tertiary">
            {t("labels.workingHours")}
          </h2>
          <p className="text-sm text-secondary">{t("hours")}</p>
        </div>
      </div>
      <div className="relative mt-10 h-[400px]">
        <h2 className="text-xl mb-5 font-medium mb-2 text-tertiary">
          {t("map")}
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.834410582869!2d69.20874141542286!3d41.299495879271095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef3dfc39e4b1b%3A0xd4ed1f4ea1bb6c5!2sNordic%20International%20University!5e0!3m2!1sen!2sus!4v1641248920373!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </article>
  );
};

export default Contacts;
