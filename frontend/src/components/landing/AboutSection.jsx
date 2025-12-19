import { motion } from 'framer-motion';
import { useState } from 'react';

const AboutSection = () => {
  const [hovered, setHovered] = useState(false);

  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80',
      alt: 'Handshake in front of house',
      className: 'col-span-2 row-span-2',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
      alt: 'Woman presenting to couple',
      className: 'col-span-1 row-span-1',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&q=80',
      alt: 'Discussion at table',
      className: 'col-span-1 row-span-1',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80',
      alt: 'Business meeting',
      className: 'col-span-2 row-span-1',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Crect x='0' y='0' width='20' height='20'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Squares */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-blue-500/20 rounded-lg"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-24 h-24 bg-orange-500/20 rounded-lg"
        animate={{
          rotate: [360, 270, 180, 90, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-blue-600 mb-8 font-display"
            variants={itemVariants}
          >
            About Us
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Collage */}
          <motion.div
            className="grid grid-cols-3 grid-rows-3 gap-4 h-96"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className={`${image.className} overflow-hidden rounded-lg shadow-lg relative group cursor-pointer`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, z: 10 }}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="text-lg text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              We are a trusted real estate consulting firm with years of experience in helping clients 
              maximize their property value through expert consultation, innovative design, and strategic 
              marketing. Our team of professionals is dedicated to providing top-notch services that 
              deliver exceptional results.
            </motion.p>
            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We understand what buyers are looking for and suggest projects that will bring clients 
              top dollar for the sale of their homes. Our comprehensive approach combines market insights, 
              design expertise, and marketing strategies to ensure your property stands out.
            </motion.p>
            <motion.button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                LEARN MORE
                <motion.span
                  className="text-xl"
                  animate={{ x: hovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-blue-700"
                initial={{ x: '-100%' }}
                animate={{ x: hovered ? 0 : '-100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
