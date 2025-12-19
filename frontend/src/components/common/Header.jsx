import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { navItems, routes } from '../../config/routes';
import { handleHashNavigation, scrollToSection } from '../../utils/navigation';

const Header = memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoize variants to prevent recreation on each render
  const logoVariants = useMemo(() => ({
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, -5, 0],
      transition: { duration: 0.5 },
    },
  }), []);

  const navItemVariants = useMemo(() => ({
    hover: {
      y: -3,
      color: '#8B5CF6',
      transition: { duration: 0.2 },
    },
  }), []);

  // Memoize navigation items
  const navigationItems = useMemo(() => navItems, []);

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
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to={routes.home}
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <motion.div
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
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              // Check if active based on route type
              const isActive = item.type === 'route' 
                ? location.pathname === item.path
                : location.hash === item.path || (location.pathname === '/' && location.hash === item.path.replace('/#', '#'));
              
              return (
                <motion.div
                  key={item.path}
                  variants={navItemVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {item.type === 'route' ? (
                    <Link
                      to={item.path}
                      onClick={() => {
                        if (item.path === routes.home && location.pathname === '/') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`font-medium relative text-sm uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'text-brand-purple'
                          : 'text-gray-700 hover:text-brand-purple'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-purple"
                          layoutId="underline"
                        />
                      )}
                    </Link>
                  ) : (
                    <a
                      href={item.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleHashNavigation(item.path, navigate);
                      }}
                      className={`font-medium relative text-sm uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'text-brand-purple'
                          : 'text-gray-700 hover:text-brand-purple'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-purple"
                          layoutId="underline"
                        />
                      )}
                      {!isActive && (
                        <motion.span
                          className="absolute -bottom-1 left-0 h-0.5 bg-brand-purple origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-brand-purple transition-colors p-2"
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => {
                  const isActive = item.type === 'route' 
                    ? location.pathname === item.path
                    : location.hash === item.path || (location.pathname === '/' && location.hash === item.path.replace('/#', '#'));
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.type === 'route' ? (
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-3 px-4 rounded-lg transition-colors ${
                            isActive
                              ? 'text-brand-purple bg-purple-50'
                              : 'text-gray-700 hover:text-brand-purple hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.path}
                          onClick={(e) => {
                            e.preventDefault();
                            handleHashNavigation(item.path, navigate);
                            setMobileMenuOpen(false);
                          }}
                          className={`block py-3 px-4 rounded-lg transition-colors ${
                            isActive
                              ? 'text-brand-purple bg-purple-50'
                              : 'text-gray-700 hover:text-brand-purple hover:bg-gray-50'
                          }`}
                        >
                          {item.label}
                        </a>
                      )}
                    </motion.div>
                  );
                })}
                <motion.a
                  href={routes.contact}
                  onClick={(e) => {
                    e.preventDefault();
                    handleHashNavigation(routes.contact, navigate);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-3 px-4 rounded-lg bg-brand-purple text-white text-center font-semibold mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: navigationItems.length * 0.1 }}
                >
                  CONTACT
                </motion.a>
              </nav>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.a
            href={routes.contact}
            onClick={(e) => {
              e.preventDefault();
              handleHashNavigation(routes.contact, navigate);
            }}
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
});

Header.displayName = 'Header';

export default Header;
