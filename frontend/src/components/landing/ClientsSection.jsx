import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clientsAPI } from '../../services/api';

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientsAPI.getAll();
      setClients(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setClients([
        {
          id: 1,
          name: 'Jonathan Smith',
          designation: 'Property Developer',
          description: 'Excellent service and professional team. They helped us maximize our property value significantly!',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        },
        {
          id: 2,
          name: 'Shane Kayak',
          designation: 'Real Estate Investor',
          description: 'They helped us sell our property quickly and at a great price. Highly recommended!',
          image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
        },
        {
          id: 3,
          name: 'Sarah Johnson',
          designation: 'Homeowner',
          description: 'Outstanding consultation and design services. Very satisfied with the results!',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        },
        {
          id: 4,
          name: 'Michael Brown',
          designation: 'Business Owner',
          description: 'Professional marketing strategy that delivered exceptional results for our commercial property.',
          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        },
        {
          id: 5,
          name: 'Emily Davis',
          designation: 'Property Manager',
          description: 'Great experience from start to finish. Their expertise made all the difference!',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="clients" className="py-20 bg-white relative overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 font-display text-blue-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Happy Clients
          </motion.h2>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <motion.div
              className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {clients.map((client, index) => (
              <motion.div
                key={client.id || index}
                className="group relative perspective-1000"
                variants={cardVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="bg-white p-6 text-center h-full relative overflow-hidden rounded-lg shadow-md border border-gray-100"
                  whileHover={{
                    y: -8,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >

                  <motion.div className="mb-4">
                    <motion.img
                      src={client.image || 'https://via.placeholder.com/150'}
                      alt={client.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-gray-200"
                      whileHover={{
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <motion.p
                    className="text-gray-600 mb-4 text-sm leading-relaxed"
                  >
                    {client.description}
                  </motion.p>

                  <h4 className="font-semibold text-gray-800 mb-1">
                    {client.name}
                  </h4>

                  <p className="text-xs text-gray-500">{client.designation}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {error && (
          <motion.div
            className="text-center text-red-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
