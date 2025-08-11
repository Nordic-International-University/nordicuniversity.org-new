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
    message.success("Xabaringiz muvaffaqiyatli yuborildi!");
    form.resetFields();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@nis-tashkent.org",
      href: "mailto:info@nis-tashkent.org",
    },
    {
      icon: Phone,
      title: "Asosiy telefon",
      value: "+998 90 091 85 88",
      href: "tel:+998900918588",
    },
    {
      icon: Phone,
      title: "Qo'shimcha telefon",
      value: "+998 90 350 50 54",
      href: "tel:+998903505054",
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
            Biz bilan bog'lanish
          </Title>
          <Paragraph className="!text-lg !text-gray-600 max-w-2xl mx-auto !mb-0">
            Savollaringiz bormi? Biz bilan bog'laning va barcha ma'lumotlarni
            oling
          </Paragraph>
        </motion.div>

        <Row gutter={[32, 32]}>
          {/* Contact Information */}
          <Col xs={24} lg={10}>
            <motion.div variants={itemVariants}>
              <Title level={3} className="!mb-8 !text-gray-800 !font-light">
                Kontakt ma'lumotlari
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
                            {info.title}
                          </Text>
                          <a
                            href={info.href}
                            className="text-gray-800 hover:text-blue-600 transition-colors duration-200 text-base font-medium"
                          >
                            {info.value}
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
                          Manzil
                        </Text>
                        <Text className="text-gray-800 text-base font-medium">
                          Xalqaro Nordik Maktabi
                          <br />
                          Toshkent, O'zbekiston
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
                  Xabar yuborish
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
                        label="Ism"
                        rules={[
                          {
                            required: true,
                            message: "Iltimos, ismingizni kiriting!",
                          },
                        ]}
                      >
                        <Input placeholder="Ismingiz" className="rounded-lg" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="lastName"
                        label="Familiya"
                        rules={[
                          {
                            required: true,
                            message: "Iltimos, familiyangizni kiriting!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Familiyangiz"
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Iltimos, emailingizni kiriting!",
                          },
                          {
                            type: "email",
                            message: "Iltimos, to'g'ri email kiriting!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="email@example.com"
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="phone"
                        label="Telefon raqam"
                        rules={[
                          {
                            required: true,
                            message: "Iltimos, telefon raqamingizni kiriting!",
                          },
                        ]}
                      >
                        <Input
                          placeholder="+998 90 123 45 67"
                          className="rounded-lg"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="subject"
                    label="Mavzu"
                    rules={[
                      { required: true, message: "Iltimos, mavzuni kiriting!" },
                    ]}
                  >
                    <Input placeholder="Xabar mavzusi" className="rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Xabar"
                    rules={[
                      {
                        required: true,
                        message: "Iltimos, xabaringizni yozing!",
                      },
                    ]}
                  >
                    <TextArea
                      rows={6}
                      placeholder="Xabaringizni bu yerga yozing..."
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
                        Xabar yuborish
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
            Bizning joylashuvimiz
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
