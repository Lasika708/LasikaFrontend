import { motion } from 'framer-motion';

const NotAverageSection = () => {
  const images = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      alt: 'Realtor with house model',
      className: 'absolute top-0 left-0 w-48 h-48 rounded-full border-4 border-white shadow-xl',
      delay: 0.1,
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&q=80',
      alt: 'Happy couple receiving keys',
      className: 'absolute top-8 right-0 w-44 h-44 rounded-full border-4 border-white shadow-xl',
      delay: 0.2,
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&q=80',
      alt: 'Professional realtor',
      className: 'absolute bottom-8 left-8 w-40 h-40 rounded-full border-4 border-white shadow-xl',
      delay: 0.3,
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
      alt: 'Woman presenting to couple',
      className: 'absolute bottom-0 right-8 w-44 h-44 rounded-full border-4 border-white shadow-xl',
      delay: 0.4,
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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Left Side - Text */}
          <motion.div variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-blue-600 mb-6 font-display"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Not Your Average Realtor
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We go beyond traditional real estate services. Our team combines expertise in consultation, 
              innovative design, and strategic marketing to help you achieve exceptional results. We understand 
              what buyers are looking for and suggest projects that will bring clients top dollar for the sale 
              of their homes.
            </motion.p>
          </motion.div>

          {/* Right Side - Image Collage */}
          <motion.div
            className="relative h-96 perspective-1000"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Decorative Circles */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full blur-2xl opacity-50"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-100 rounded-full blur-xl opacity-50"
              animate={{
                scale: [1, 0.9, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Images */}
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                className={`${image.className} overflow-hidden cursor-pointer`}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: image.delay,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.1,
                  z: 50,
                  rotate: [0, 5, -5, 0],
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotAverageSection;







