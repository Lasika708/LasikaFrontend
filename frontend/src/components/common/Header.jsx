import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 10,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
    });
  };

  const logoVariants = {
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 },
    },
  };

  const navItemVariants = {
    hover: {
      y: -3,
      color: '#8B5CF6',
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200'
          : 'bg-white/80 backdrop-blur-md shadow-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            variants={logoVariants}
            whileHover="hover"
          >
            <motion.div
              className={`w-12 h-12 bg-gradient-to-br from-brand-purple via-brand-purpleDark to-brand-purple rounded-xl flex items-center justify-center relative overflow-hidden ${
                scrolled ? 'glow-purple' : ''
              }`}
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
              <motion.span
                className="text-white font-bold text-xl relative z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                RT
              </motion.span>
            </motion.div>
            <motion.span
              className={`text-2xl font-bold font-display ${
                scrolled ? 'text-gray-800' : 'text-gray-800'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Real Trust
            </motion.span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {[
              { to: '/', label: 'HOME', href: null },
              { to: null, label: 'SERVICES', href: '#services' },
              { to: null, label: 'PROJECTS', href: '#projects' },
              { to: null, label: 'CLIENTS', href: '#clients' },
              { to: '/admin', label: 'ADMIN', href: null },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={navItemVariants}
                whileHover="hover"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.to ? (
                  <Link
                    to={item.to}
                    className={`font-medium relative text-sm uppercase tracking-wider transition-colors ${
                      location.pathname === item.to
                        ? 'text-brand-purple'
                        : 'text-gray-700 hover:text-brand-purple'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.to && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-purple"
                        layoutId="underline"
                      />
                    )}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-brand-purple font-medium relative group text-sm uppercase tracking-wider transition-colors"
                  >
                    {item.label}
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
          
          <motion.a
            href="#contact"
            className="btn-primary relative overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>CONTACT</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand-purpleDark to-brand-purple"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
