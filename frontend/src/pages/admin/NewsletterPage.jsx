import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsletterAPI } from '../../services/api';

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await newsletterAPI.getAll();
      setSubscribers(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Newsletter Subscribers</h1>
        <p className="text-gray-600">Manage your newsletter subscribers</p>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 mb-8 text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm mb-1">Total Subscribers</p>
            <motion.p
              className="text-4xl font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {subscribers.length}
            </motion.p>
          </div>
          <motion.div
            className="text-6xl opacity-20"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📬
          </motion.div>
        </div>
      </motion.div>

      {/* Subscribers Table */}
      {loading ? (
        <div className="text-center py-12">
          <motion.div
            className="inline-block w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      ) : (
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Total Subscribers:{' '}
                <motion.span
                  className="font-semibold text-gray-900 text-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {subscribers.length}
                </motion.span>
              </div>
              <motion.button
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Export CSV
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {subscribers.length === 0 ? (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                        <div className="text-6xl mb-4">📬</div>
                        <p className="text-lg">No newsletter subscribers yet.</p>
                      </td>
                    </motion.tr>
                  ) : (
                    subscribers.map((subscriber, index) => (
                      <motion.tr
                        key={subscriber.id || index}
                        variants={itemVariants}
                        className="hover:bg-gray-50 transition-colors"
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        whileHover={{ scale: 1.01 }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          <motion.span
                            className="inline-block w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold"
                            animate={{
                              scale: hoveredIndex === index ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {index + 1}
                          </motion.span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          <a
                            href={`mailto:${subscriber.email}`}
                            className="hover:text-purple-600 transition-colors"
                          >
                            {subscriber.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {subscriber.createdAt
                            ? new Date(subscriber.createdAt).toLocaleDateString()
                            : '-'}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NewsletterPage;
