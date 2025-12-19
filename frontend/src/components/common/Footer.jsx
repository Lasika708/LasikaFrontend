import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsletterAPI } from '../../services/api';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage('');
    try {
      await newsletterAPI.subscribe(email);
      setMessage('Subscribed successfully!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const socialIcons = [
    { name: 'facebook', icon: 'f', href: '#', color: 'from-blue-600 to-blue-800' },
    { name: 'twitter', icon: 't', href: '#', color: 'from-sky-500 to-sky-700' },
    { name: 'instagram', icon: 'i', href: '#', color: 'from-pink-500 to-purple-600' },
    { name: 'linkedin', icon: 'in', href: '#', color: 'from-blue-700 to-blue-900' },
  ];

  const links = [
    { to: '/', label: 'Home', href: null },
    { href: '#services', label: 'Services', to: null },
    { href: '#projects', label: 'Projects', to: null },
    { href: '#clients', label: 'Testimonials', to: null },
    { href: '#contact', label: 'Contact', to: null },
  ];

  return (
    <footer className="bg-blue-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo and Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-brand-purple via-brand-purpleDark to-brand-black rounded-xl flex items-center justify-center glow-purple"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white font-bold text-xl">RT</span>
              </motion.div>
              <span className="text-2xl font-bold font-display">Real Trust</span>
            </motion.div>
            <div className="flex flex-col space-y-3">
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-white/80 hover:text-blue-300 transition-colors relative group text-sm"
                    >
                      {link.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-brand-purple origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-blue-300 transition-colors relative group text-sm"
                    >
                      {link.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-brand-purple origin-left"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Subscribe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 font-display">Subscribe Us</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col">
              <div className="flex">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-l-lg text-brand-black focus:outline-none focus:ring-2 focus:ring-brand-purple"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2.5 rounded-r-lg transition-colors disabled:opacity-50 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">
                    {loading ? (
                      <motion.span
                        className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      'Subscribe'
                    )}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-blue-800"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
              <AnimatePresence>
                {message && (
                  <motion.p
                    className={`mt-2 text-sm ${
                      message.includes('success') ? 'text-green-300' : 'text-red-300'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
          
          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 font-display">Follow Us</h3>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  onHoverStart={() => setHoveredIcon(index)}
                  onHoverEnd={() => setHoveredIcon(null)}
                >
                  <span className="text-lg relative z-10 font-bold">{social.icon}</span>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${social.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredIcon === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4 font-display">Contact Info</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              We provide consultation, design, and marketing services for real estate projects.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-400">📧 info@realtrust.com</p>
              <p className="text-sm text-gray-400">📞 +1 (555) 123-4567</p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>All Rights Reserved 2023</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-4 h-4 bg-white rounded"></div>
            <span className="font-bold">Real Trust</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
