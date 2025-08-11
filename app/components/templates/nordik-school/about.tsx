"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ExternalLink,
  Globe,
  Users,
  BookOpen,
  Award,
} from "lucide-react";
import { Button, Card, Typography, Row, Col, Space } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
    window.open(
      "https://youtube.com/shorts/NXyolQ38gxM?si=djXkaARNsLfnGyoZ",
      "_blank",
    );
  };

  return (
    <div className="min-h-screen mt-6 bg-gray-50">
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
            Xalqaro Nordik Maktabi
          </Title>
          <Paragraph className="!text-lg !text-gray-600 max-w-2xl mx-auto !mb-0">
            Finlyandiya va boshqa Nordik davlatlarining eng ilg'or ta'lim
            tajribasi asosida tashkil etilgan zamonaviy ta'lim muassasasi
          </Paragraph>
        </motion.div>

        {/* Images Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/about.png"
                  alt="Nordic School Building"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/11.png"
                  alt="Students Learning"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </motion.div>
            </Col>
            <Col xs={24} md={8}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/22.png"
                  alt="Educational Environment"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        {/* Video Section ddd*/}
        {/* Video Section ddd*/}
        {/* Video Section ddd*/}
        {/* Video Section ddd*/}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex flex-col md:flex-row items-center gap-8 p-4">
              <div className="flex-1 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <iframe
                    width="100%"
                    height="250"
                    src="https://www.youtube.com/embed/NXyolQ38gxM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-md"
                  ></iframe>
                  <iframe
                    width="100%"
                    height="250"
                    src="https://www.youtube.com/embed/i0acMouzf3w"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="rounded-lg shadow-md"
                  ></iframe>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <Card className="h-full border-0 shadow-md">
                <Space align="start" className="mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <Title level={3} className="!mb-0 !text-gray-800">
                    Maktab haqida
                  </Title>
                </Space>
                <Paragraph className="!text-gray-600 !mb-4">
                  Xalqaro Nordik Maktabi, Toshkentdagi Xalqaro Nordik
                  Universiteti qoshida tashkil etilmoqda. Ushbu maktabni tashkil
                  etilishiga Finlyandiya Respublikasining Tashqi Ishlar Vaziri
                  Elina Valtonen xonimning 2025 yil 11 iyunda tashrifi davomida
                  tamal toshi qo'yildi.
                </Paragraph>
                <Paragraph className="!text-gray-600 !mb-0">
                  Maktab Xalqaro Nordik Universiteti negizida tashkil topgan,
                  Finlyandiya va boshqa Nordik davlatlar ta'lim tajribasi va
                  yutuqlariga asoslangan Xalqaro Ta'lim Habi va klasterining
                  ajralmas bir qismi hisoblanadi.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card className="h-full border-0 shadow-md">
                <Space align="start" className="mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  <Title level={3} className="!mb-0 !text-gray-800">
                    Maqsad va Vazifalar
                  </Title>
                </Space>
                <Paragraph className="!text-gray-600 !mb-4">
                  Maktab nafaqat O'zbekiston yoshlari uchun sifatli maktab
                  ta'limini ta'minlab beradigan maskan, balki maktab ta'limi
                  sohasida Finlyandiya va boshqa Nordik davlatlarining eng
                  ilg'or tajriba, know-how va innovatsiyalarni o'rtoqlashadigan
                  markaz.
                </Paragraph>
                <Paragraph className="!text-gray-600 !mb-0">
                  O'qituvchilar uchun xorijiy mutaxassislar ishtirokida trening
                  va seminarlar tashkil qiladi va O'zbekiston Respublikasidagi
                  tegishli Vazirlik va idoralar bilan yaqindan hamkorlik yo'lga
                  qo'yadi.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* Features Grid */}
        <motion.div variants={itemVariants}>
          <Title
            level={2}
            className="!text-center !mb-12 !text-gray-800 !font-light"
          >
            Bizning Afzalliklarimiz
          </Title>
          <Row gutter={[24, 24]}>
            {[
              {
                icon: Globe,
                title: "Xalqaro Standartlar",
                description:
                  "Finlyandiya va Nordik davlatlarining eng ilg'or ta'lim metodlari",
              },
              {
                icon: Users,
                title: "Malakali O'qituvchilar",
                description:
                  "Xorijiy mutaxassislar ishtirokida trening va seminarlar",
              },
              {
                icon: BookOpen,
                title: "Zamonaviy Ta'lim",
                description:
                  "Innovatsion yondashuvlar va eng so'nggi texnologiyalar",
              },
            ].map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="text-center border-0 shadow-md h-full">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-6"
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <Title level={4} className="!mb-4 !text-gray-800">
                      {feature.title}
                    </Title>
                    <Paragraph className="!text-gray-600 !mb-0">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Call to Action */}
        <motion.div className="text-center mt-16" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              href="/nordic-school/contacts"
              type="primary"
              size="large"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 px-8 py-2 h-auto text-base"
            >
              Biz bilan bog'lanish
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
