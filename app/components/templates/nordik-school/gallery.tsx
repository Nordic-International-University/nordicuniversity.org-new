"use client";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import { Card, Row, Col } from "antd";

const colors = {
  darkBlue: "rgba(3, 46, 99, 1)",
  breadcrumb: "#003161",
  anyColor: "#0C3169",
  textSecondary: "#0b4075",
  lightBlue: "#e0f2fe",
};

const getYouTubeVideoId = (url: any) => {
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
    { type: "image", src: "/images/0.jpg" },
    { type: "image", src: "/images/2.png" },
    { type: "image", src: "/images/3.jpg" },
    { type: "image", src: "/images/4.jpg" },
    { type: "image", src: "/images/5.jpg" },
    { type: "image", src: "/images/6.png" },
    { type: "image", src: "/images/7.jpg" },
    { type: "image", src: "/images/8.png" },
    { type: "image", src: "/images/9.jpg" },
    { type: "image", src: "/images/10.jpg" },
    { type: "image", src: "/images/12.jpg" },
    { type: "image", src: "/images/13.jpg" },
    { type: "image", src: "/images/14.jpg" },
    { type: "image", src: "/images/15.png" },
    { type: "image", src: "/images/19.jpg" },
    { type: "video", url: "https://www.youtube.com/watch?v=Phz-ejKcx74" },
    { type: "video", url: "https://www.youtube.com/watch?v=Hy-OL6GDkZ8" },
    { type: "video", url: "https://www.youtube.com/watch?v=XQ_agxK6fLs" },
  ];

  return (
    <div className="min-h-screen mt-6 bg-gray-50">
      <motion.div
        className="container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
                            alt=""
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
                          src={`https://www.youtube.com/embed/${getYouTubeVideoId(item.url)}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      )}
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
