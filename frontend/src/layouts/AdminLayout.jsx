import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, memo, useMemo, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { adminNavItems } from '../config/routes';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Memoized 3D sphere component for better performance
const FloatingSphere = memo(() => {
  return (
    <Sphere args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#2563EB"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.5}
      />
    </Sphere>
  );
});

FloatingSphere.displayName = 'FloatingSphere';

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Memoize menu items to prevent unnecessary re-renders
  const menuItems = useMemo(() => adminNavItems, []);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -280,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 h-full w-64 bg-blue-900 text-white shadow-2xl z-50 overflow-hidden"
        variants={sidebarVariants}
        initial="open"
        animate={sidebarOpen ? 'open' : 'closed'}
      >
        {/* 3D Background - Optimized with lower quality when sidebar is closed */}
        {sidebarOpen && (
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ willChange: 'transform' }}>
            <Canvas 
              camera={{ position: [0, 0, 5] }}
              performance={{ min: 0.5 }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <FloatingSphere />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        )}

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/admin" className="flex items-center space-x-3 group">
              <motion.div
                className="w-10 h-10 bg-white rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-blue-900 font-bold text-lg">RT</span>
              </motion.div>
              <motion.span
                className="text-xl font-bold font-display"
                whileHover={{ scale: 1.05 }}
              >
                Admin Panel
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-blue-800 hover:text-white'
                    }`}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"
                      initial={{ x: '-100%' }}
                      animate={{ x: isActive ? 0 : '-100%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.span
                      className="text-xl relative z-10"
                      animate={{
                        rotate: isActive ? [0, 10, -10, 0] : 0,
                        scale: isActive ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="relative z-10 font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        className="absolute right-2 w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Back to Website Button */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/"
              className="block text-center px-4 py-3 bg-blue-800 rounded-lg hover:bg-blue-700 transition-all duration-300 relative overflow-hidden group"
            >
              <motion.span
                className="relative z-10 flex items-center justify-center gap-2"
                whileHover={{ x: -5 }}
              >
                ← Back to Website
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-blue-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>
        </div>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 -right-12 w-10 h-10 bg-blue-900 text-white rounded-r-lg shadow-lg flex items-center justify-center hover:bg-blue-800 transition-colors z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={{ rotate: sidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen ? '←' : '→'}
          </motion.span>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ willChange: 'transform, opacity' }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;
