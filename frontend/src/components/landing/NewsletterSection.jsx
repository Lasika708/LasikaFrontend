import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsletterAPI } from '../../services/api';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await newsletterAPI.subscribe(email);
      setSuccess(true);
      setEmail('');
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
            }}
            animate={{
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600)],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 font-display text-blue-600"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Stay updated with our latest projects, real estate insights, and exclusive offers.
          </motion.p>

          <AnimatePresence mode="wait">
            {success && (
              <motion.div
                className="mb-4 p-4 bg-green-500/90 backdrop-blur-sm rounded-xl text-white shadow-lg"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  <motion.span
                    className="text-2xl"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    ✓
                  </motion.span>
                  <span className="font-semibold">Thank you for subscribing!</span>
                </motion.div>
              </motion.div>
            )}

            {error && (
              <motion.div
                className="mb-4 p-4 bg-red-500/90 backdrop-blur-sm rounded-xl text-white shadow-lg"
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">⚠</span>
                  <span className="font-semibold">{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.div className="flex-1 relative" whileFocus={{ scale: 1.05 }}>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 rounded-xl text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-purple shadow-xl transition-all duration-300 bg-white"
                required
              />
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-purple/20 to-brand-purpleLight/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={loading}
              className="bg-brand-purple hover:bg-brand-purpleDark text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 whitespace-nowrap shadow-xl relative overflow-hidden group glow-purple-hover"
              whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 40px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {loading ? (
                  <>
                    <motion.span
                      className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-purpleDark to-brand-purple"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
