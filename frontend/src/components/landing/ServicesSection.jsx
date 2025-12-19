import { motion } from 'framer-motion';
import { useState } from 'react';

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      icon: '🏠',
      title: 'Potential ROI',
      description: 'We analyze market trends and property values to help you maximize your return on investment.',
      gradient: 'from-blue-500 to-blue-600',
      color: '#2563EB',
    },
    {
      icon: '⬇️',
      title: 'Design',
      description: 'Our expert designers create stunning spaces that appeal to modern buyers and increase property value.',
      gradient: 'from-blue-600 to-blue-700',
      color: '#1D4ED8',
    },
    {
      icon: '➕',
      title: 'Marketing',
      description: 'Strategic marketing campaigns that reach the right audience and generate quality leads.',
      gradient: 'from-blue-500 to-blue-700',
      color: '#1E40AF',
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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-purpleDark rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-purple text-sm uppercase tracking-widest font-semibold">
              Services
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6 font-display"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gradient-purple">Why Choose Us?</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative perspective-1000"
              variants={cardVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <motion.div
                className="card-glass p-8 relative overflow-hidden h-full"
                whileHover={{
                  y: -12,
                  rotateY: hoveredIndex === index ? 8 : 0,
                  rotateX: hoveredIndex === index ? -8 : 0,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-2xl`}
                  animate={{
                    backgroundPosition: hoveredIndex === index ? ['0% 0%', '100% 100%'] : '0% 0%',
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon Container with 3D effect */}
                <motion.div
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-6 relative z-10 mx-auto"
                  animate={{
                    rotate: hoveredIndex === index ? [0, -15, 15, -15, 0] : 0,
                    scale: hoveredIndex === index ? 1.15 : 1,
                    y: hoveredIndex === index ? -5 : 0,
                  }}
                  transition={{ duration: 0.6, type: 'spring' }}
                >
                  <span className="text-4xl">{service.icon}</span>
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-blue-600 mb-4 relative z-10 font-display text-center"
                  animate={{
                    color: hoveredIndex === index ? service.color : '#2563EB',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>

                <p className="text-gray-600 relative z-10 leading-relaxed text-center">{service.description}</p>

                {/* Hover Effect Border with glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent"
                  animate={{
                    borderColor: hoveredIndex === index
                      ? ['rgba(139, 92, 246, 0)', 'rgba(139, 92, 246, 0.6)', 'rgba(139, 92, 246, 0)']
                      : 'transparent',
                    boxShadow: hoveredIndex === index
                      ? ['0 0 0px rgba(139, 92, 246, 0)', '0 0 30px rgba(139, 92, 246, 0.5)', '0 0 0px rgba(139, 92, 246, 0)']
                      : '0 0 0px rgba(139, 92, 246, 0)',
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                {/* Decorative corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-purple/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
