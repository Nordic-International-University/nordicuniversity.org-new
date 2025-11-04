"use client";

import { motion } from "framer-motion";
import { Globe, Users, BookOpen, Award } from "lucide-react";
import { Button, Card, Typography, Row, Col, Space } from "antd";
import { useTranslations } from "next-intl";

const { Title, Paragraph } = Typography;

const About = () => {
  const t = useTranslations();

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
            {t("nordic_school.title")}
          </Title>
          <Paragraph className="!text-lg !text-gray-600 max-w-2xl mx-auto !mb-0">
            {t("nordic_school.description")}
          </Paragraph>
        </motion.div>

        {/* Images Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex flex-col md:flex-row items-center gap-8 p-4">
              <div className="flex-1 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Title
                      level={5}
                      className="!text-white !mb-2 flex items-center"
                      style={{ minHeight: "60px" }}
                    >
                      {t("nordic_school.president_visit.subtitle")}
                    </Title>
                    <video
                      src="/video/video.mp4"
                      poster="/images/nordic-school-images/Screenshot_8.png"
                      className="h-64"
                      controls
                      width="100%"
                    >
                      Video yuklanmadi
                    </video>
                  </div>
                  {/* Video 1 */}
                  <div>
                    <Title
                      level={5}
                      className="!text-white !mb-2 flex items-center"
                      style={{ minHeight: "60px" }}
                    >
                      {t("nordic_school.videos.video1_title")}
                    </Title>
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
                  </div>

                  {/* Video 2 */}
                  <div>
                    <Title
                      level={5}
                      className="!text-white !mb-2 flex items-center"
                      style={{ minHeight: "60px" }}
                    >
                      {t("nordic_school.videos.video2_title")}
                    </Title>
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

                  {/* Video 3 */}
                  <div>
                    <Title
                      level={5}
                      className="!text-white !mb-2 flex items-center"
                      style={{ minHeight: "60px" }}
                    >
                      {t("nordic_school.videos.video3_title")}
                    </Title>
                    <iframe
                      width="100%"
                      height="250"
                      src="https://www.youtube.com/embed/-BK43uEb1bU"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-lg shadow-md"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/35.png"
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
                  src="/images/34.png"
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
                  src="/images/11.png"
                  alt="Educational Environment"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <motion.div className="mb-16" variants={itemVariants}>
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={12}>
              <Card className="h-full border-0 shadow-md">
                <Space align="start" className="mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <Title level={3} className="!mb-0 !text-gray-800">
                    {t("nordic_school.about.title")}
                  </Title>
                </Space>
                <Paragraph className="!text-gray-600 !mb-4">
                  {t("nordic_school.about.paragraph1")}
                </Paragraph>
                <Paragraph className="!text-gray-600 !mb-0">
                  {t("nordic_school.about.paragraph2")}
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
                    {t("nordic_school.goals.title")}
                  </Title>
                </Space>
                <Paragraph className="!text-gray-600 !mb-4">
                  {t("nordic_school.goals.paragraph1")}
                </Paragraph>
                <Paragraph className="!text-gray-600 !mb-0">
                  {t("nordic_school.goals.paragraph2")}
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* main */}

        {/* President Visit Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <Title
            level={2}
            className="!text-center !mb-8 !text-gray-800 !font-light"
          >
            {t("nordic_school.president_visit.title")}
          </Title>

          {/* Image Grid 3x2 */}
          <Row gutter={[16, 16]} className="mb-8">
            {[
              "Screenshot_4.png",
              "Screenshot_5.png",
              "Screenshot_7.png",
              "Screenshot_8.png",
              "Screenshot_9.png",
              "Screenshot_11.png",
            ].map((image, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={`/images/nordic-school-images/${image}`}
                    alt={`President visit ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </motion.div>
              </Col>
            ))}
          </Row>

          <Card className="h-full border-0 shadow-md">
            <Title level={4} className="!mb-4 !text-gray-800">
              {t("nordic_school.president_visit.subtitle")}
            </Title>
            <Paragraph className="!text-gray-600 !mb-0">
              {t("nordic_school.president_visit.description")}
            </Paragraph>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Title
            level={2}
            className="!text-center !mb-12 !text-gray-800 !font-light"
          >
            {t("nordic_school.advantages.title")}
          </Title>
          <Row gutter={[24, 24]}>
            {[
              {
                icon: Globe,
                titleKey:
                  "nordic_school.advantages.features.international_standards.title",
                descriptionKey:
                  "nordic_school.advantages.features.international_standards.description",
              },
              {
                icon: Users,
                titleKey:
                  "nordic_school.advantages.features.qualified_teachers.title",
                descriptionKey:
                  "nordic_school.advantages.features.qualified_teachers.description",
              },
              {
                icon: BookOpen,
                titleKey:
                  "nordic_school.advantages.features.modern_education.title",
                descriptionKey:
                  "nordic_school.advantages.features.modern_education.description",
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
                      {t(feature.titleKey)}
                    </Title>
                    <Paragraph className="!text-gray-600 !mb-0">
                      {t(feature.descriptionKey)}
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
              {t("nordic_school.contact_button")}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
