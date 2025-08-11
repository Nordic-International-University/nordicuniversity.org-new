"use client";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Card, Typography, Row, Col } from "antd";

const { Title, Paragraph } = Typography;

// Define the custom colors
const colors = {
  darkBlue: "rgba(3, 46, 99, 1)",
  breadcrumb: "#003161",
  anyColor: "#0C3169",
  textSecondary: "#0b4075",
  lightBlue: "#e0f2fe", // A very light blue for subtle accents
};

// Function to extract YouTube video ID from URL
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const Gallery = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const mediaCardVariants = {
    initial: { scale: 0.98, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: {
      y: -5,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.08)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const mediaItems = [
    {
      type: "video",
      url: "https://www.youtube.com/watch?v=Phz-ejKcx74",
      title: "Finlyandiya ta'lim tizimi tajribasi",
      description: "Finlyandiyaning ta'lim sohasidagi yutuqlari.",
    },
    {
      type: "image",
      src: "/images/image2.jpg",
      alt: "Library Study Area",
      title: "Maktab binosi",
      description: "O'quvchilar uchun tinch va qulay o'quv joyi.",
    },
    {
      type: "video",
      url: "https://www.youtube.com/watch?v=Hy-OL6GDkZ8",
      title: "Finlyandiya maktablari",
      description: "Finlyandiya maktablarining boshqa davlatlardan ustunligi.",
    },
    {
      type: "video",
      url: "https://www.youtube.com/watch?v=XQ_agxK6fLs",
      title: "Finlyandiya ta'limi: Nima uchun u eng yaxshi?",
      description: "Finlyandiya ta'lim tizimining sirlari.",
    },
    {
      type: "video",
      url: "https://youtube.com/shorts/i0acMouzf3w?feature=share",
      title: "Nordik Universitetiga tashrif",
      description: "Finlyandiya Tashqi Ishlar Vaziri tashrifi.",
    },
  ];

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
            Maktab Galereyasi
          </Title>
          <Paragraph className="!text-lg !text-gray-600 max-w-2xl mx-auto !mb-0">
            Maktabimizdagi hayajonli lahzalar va yutuqlarni kashf eting
          </Paragraph>
        </motion.div>

        {/* Media Gallery Grid */}
        <motion.div variants={itemVariants}>
          <Row gutter={[24, 24]}>
            {mediaItems.map((item, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <motion.div
                  variants={mediaCardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="h-full"
                >
                  <Card className="border-0 shadow-lg h-full overflow-hidden bg-white relative">
                    <div
                      className="w-full h-48 bg-gray-200 overflow-hidden relative flex items-center justify-center"
                      style={{ borderBottom: `1px solid ${colors.lightBlue}` }}
                    >
                      {item.type === "image" ? (
                        <>
                          <img
                            src={item.src || "/placeholder.svg"}
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                            style={{ backgroundColor: `rgba(0, 0, 0, 0.4)` }}
                          >
                            <ImageIcon className="w-8 h-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.url as any)}`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      )}
                    </div>
                    <div className="p-4">
                      <Title level={4} className="!mb-2 !text-gray-800">
                        {item.title}
                      </Title>
                      <Paragraph className="!text-gray-600 !text-sm">
                        {item.description}
                      </Paragraph>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gallery;
