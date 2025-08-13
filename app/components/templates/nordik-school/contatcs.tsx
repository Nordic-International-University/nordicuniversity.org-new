"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { useTranslations } from "next-intl";

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// Define the custom colors
const colors = {
  darkBlue: "rgba(3, 46, 99, 1)",
  breadcrumb: "#003161",
  anyColor: "#0C3169",
  textSecondary: "#0b4075",
};

const Contact = () => {
  const t = useTranslations();
  const [form] = Form.useForm();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const onFinish = (values: any) => {
    console.log("Form values:", values);
    message.success(t("nordic_school.contact.form.success_message"));
    form.resetFields();
  };

  const contactInfo = [
    {
      icon: Mail,
      titleKey: "nordic_school.contact.contact_info.email.title",
      valueKey: "nordic_school.contact.contact_info.email.value",
      href: "mailto:info@nis-tashkent.org",
    },
    {
      icon: Phone,
      titleKey: "nordic_school.contact.contact_info.main_phone.title",
      valueKey: "nordic_school.contact.contact_info.main_phone.value",
      href: "tel:+998900918588",
    },
    {
      icon: Phone,
      titleKey: "nordic_school.contact.contact_info.additional_phone.title",
      valueKey: "nordic_school.contact.contact_info.additional_phone.value",
      href: "tel:+998908304913",
    },
  ];

  return (
    <div className="min-h-screen mt-6 rounded-xl bg-gray-50">
      <motion.div
        className="container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Title
            level={1}
            className="!text-4xl md:!text-5xl !font-light !text-gray-800 !mb-6"
          >
            {t("nordic_school.contact.title")}
          </Title>
          <Paragraph className="!text-lg !text-gray-600 max-w-2xl mx-auto !mb-0">
            {t("nordic_school.contact.description")}
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]}>
          {/* Contact Information */}
          <Col xs={24} lg={10}>
            <motion.div variants={itemVariants}>
              <Title level={3} className="!mb-8 !text-gray-800 !font-light">
                {t("nordic_school.contact.contact_info.title")}
              </Title>
              <Space direction="vertical" size="large" className="w-full">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    variants={cardHoverVariants}
                    whileHover="hover"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <Space align="start">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: colors.darkBlue }}
                        >
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <Text className="text-gray-500 text-sm block">
                            {t(info.titleKey)}
                          </Text>
                          <a
                            href={info.href}
                            className="text-gray-800 hover:text-blue-600 transition-colors duration-200 text-base font-medium"
                          >
                            {t(info.valueKey)}
                          </a>
                        </div>
                      </Space>
                    </Card>
                  </motion.div>
                ))}
              </Space>

              {/* Address */}
              <motion.div
                className="mt-8"
                variants={itemVariants}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div variants={cardHoverVariants} whileHover="hover">
                  <Card className="border-0 shadow-sm">
                    <Space align="start">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: colors.darkBlue }}
                      >
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <Text className="text-gray-500 text-sm block">
                          {t(
                            "nordic_school.contact.contact_info.address.title",
                          )}
                        </Text>
                        <Text className="text-gray-800 text-base font-medium">
                          {t(
                            "nordic_school.contact.contact_info.address.line1",
                          )}
                          <br />
                          {t(
                            "nordic_school.contact.contact_info.address.line2",
                          )}
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </Col>

          {/* Contact Form */}
          <Col xs={24} lg={14}>
            <motion.div
              variants={itemVariants}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-0 shadow-md">
                <Title level={3} className="!mb-6 !text-gray-800 !font-light">
                  {t("nordic_school.contact.form.title")}
                </Title>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={onFinish}
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="firstName"
                        label={t(
                          "nordic_school.contact.form.fields.first_name.label",
                        )}
                        rules={[
                          {
                            required: true,
                            message: t(
                              "nordic_school.contact.form.fields.first_name.error",
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t(
                            "nordic_school.contact.form.fields.first_name.placeholder",
                          )}
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="lastName"
                        label={t(
                          "nordic_school.contact.form.fields.last_name.label",
                        )}
                        rules={[
                          {
                            required: true,
                            message: t(
                              "nordic_school.contact.form.fields.last_name.error",
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t(
                            "nordic_school.contact.form.fields.last_name.placeholder",
                          )}
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label={t(
                          "nordic_school.contact.form.fields.email.label",
                        )}
                        rules={[
                          {
                            required: true,
                            message: t(
                              "nordic_school.contact.form.fields.email.error",
                            ),
                          },
                          {
                            type: "email",
                            message: t(
                              "nordic_school.contact.form.fields.email.format_error",
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t(
                            "nordic_school.contact.form.fields.email.placeholder",
                          )}
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="phone"
                        label={t(
                          "nordic_school.contact.form.fields.phone.label",
                        )}
                        rules={[
                          {
                            required: true,
                            message: t(
                              "nordic_school.contact.form.fields.phone.error",
                            ),
                          },
                        ]}
                      >
                        <Input
                          placeholder={t(
                            "nordic_school.contact.form.fields.phone.placeholder",
                          )}
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="subject"
                    label={t("nordic_school.contact.form.fields.subject.label")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "nordic_school.contact.form.fields.subject.error",
                        ),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t(
                        "nordic_school.contact.form.fields.subject.placeholder",
                      )}
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label={t("nordic_school.contact.form.fields.message.label")}
                    rules={[
                      {
                        required: true,
                        message: t(
                          "nordic_school.contact.form.fields.message.error",
                        ),
                      },
                    ]}
                  >
                    <TextArea
                      rows={6}
                      placeholder={t(
                        "nordic_school.contact.form.fields.message.placeholder",
                      )}
                      className="rounded-lg"
                    />
                  </Form.Item>

                  <Form.Item className="!mb-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        icon={<Send className="w-4 h-4" />}
                        className="rounded-lg px-8"
                        style={{
                          backgroundColor: colors.darkBlue,
                          borderColor: colors.darkBlue,
                        }}
                      >
                        {t("nordic_school.contact.form.submit_button")}
                      </Button>
                    </motion.div>
                  </Form.Item>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Map Section */}
        <motion.div
          className="mt-16"
          variants={itemVariants}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Title
            level={3}
            className="!mb-8 !text-gray-800 !font-light text-center"
          >
            {t("nordic_school.contact.location.title")}
          </Title>
          <Card className="border-0 shadow-md overflow-hidden">
            <div className="relative w-full h-96 md:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d922.2286159032001!2d69.2187274!3d41.2876501!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e1!3m2!1sru!2s!4v1754888042152!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
