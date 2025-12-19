import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState, memo, useMemo } from 'react';
import { projectsAPI, clientsAPI, contactAPI, newsletterAPI } from '../../services/api';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, MeshDistortMaterial } from '@react-three/drei';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// Memoized 3D cube component
const FloatingCube = memo(({ position, color }) => {
  return (
    <Box position={position} args={[1, 1, 1]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.2}
        speed={1.5}
        roughness={0.3}
      />
    </Box>
  );
});

FloatingCube.displayName = 'FloatingCube';

// Memoized stat card component
const StatCard = memo(({ label, value, link, color, icon, index }) => {
  const [hovered, setHovered] = useState(false);
  
  // Memoize gradient class
  const gradientClass = useMemo(() => {
    switch (color) {
      case 'blue': return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'green': return 'bg-gradient-to-br from-green-500 to-green-600';
      case 'orange': return 'bg-gradient-to-br from-orange-500 to-orange-600';
      default: return 'bg-gradient-to-br from-purple-500 to-purple-600';
    }
  }, [color]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link
        to={link}
        className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
      >
        {/* 3D Background Effect - Only render on hover for performance */}
        {hovered && (
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none" style={{ willChange: 'transform' }}>
            <Canvas 
              camera={{ position: [0, 0, 3] }}
              performance={{ min: 0.5 }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} />
              <FloatingCube position={[0, 0, 0]} color={color} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
            </Canvas>
          </div>
        )}

        {/* Animated Gradient Background */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradientClass}`}
          animate={{
            backgroundPosition: hovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className="text-4xl"
              animate={{
                rotate: hovered ? [0, 10, -10, 0] : 0,
                scale: hovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <motion.div
              className={`w-3 h-3 rounded-full ${
                color === 'blue' ? 'bg-blue-500' :
                color === 'green' ? 'bg-green-500' :
                color === 'orange' ? 'bg-orange-500' :
                'bg-purple-500'
              }`}
              animate={{
                scale: hovered ? [1, 1.5, 1] : 1,
                opacity: hovered ? [1, 0.5, 1] : 1,
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <div className="text-sm text-gray-600 mb-2 font-medium">{label}</div>
          <motion.div
            className={`text-4xl font-bold ${
              color === 'blue' ? 'text-blue-600' :
              color === 'green' ? 'text-green-600' :
              color === 'orange' ? 'text-orange-600' :
              'text-purple-600'
            }`}
            animate={{
              scale: hovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.div>
        </div>

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: hovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </Link>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

const QuickActionCard = ({ title, icon, link, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Link
        to={link}
        className="block bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all duration-300 text-center group relative overflow-hidden"
      >
        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 border-2 border-blue-500 rounded-xl opacity-0 group-hover:opacity-100"
          animate={{
            borderColor: ['#3B82F6', '#2563EB', '#1D4ED8', '#3B82F6'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
          className="text-5xl mb-4"
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {icon}
        </motion.div>
        <div className="font-semibold text-gray-900 mb-2 text-lg">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>

        {/* Arrow Indicator */}
        <motion.div
          className="absolute bottom-4 right-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.div>
      </Link>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    newsletter: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [projectsRes, clientsRes, contactsRes, newsletterRes] = await Promise.all([
        projectsAPI.getAll().catch(() => ({ data: { data: [] } })),
        clientsAPI.getAll().catch(() => ({ data: { data: [] } })),
        contactAPI.getAll().catch(() => ({ data: { data: [] } })),
        newsletterAPI.getAll().catch(() => ({ data: { data: [] } })),
      ]);

      setStats({
        projects: projectsRes.data?.data?.length || projectsRes.data?.length || 0,
        clients: clientsRes.data?.data?.length || clientsRes.data?.length || 0,
        contacts: contactsRes.data?.data?.length || contactsRes.data?.length || 0,
        newsletter: newsletterRes.data?.data?.length || newsletterRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Projects',
      value: stats.projects,
      link: '/admin/projects',
      color: 'blue',
      icon: '📁',
    },
    {
      label: 'Total Clients',
      value: stats.clients,
      link: '/admin/clients',
      color: 'green',
      icon: '👥',
    },
    {
      label: 'Contact Submissions',
      value: stats.contacts,
      link: '/admin/contacts',
      color: 'orange',
      icon: '📧',
    },
    {
      label: 'Newsletter Subscribers',
      value: stats.newsletter,
      link: '/admin/newsletter',
      color: 'purple',
      icon: '📬',
    },
  ];

  const quickActions = [
    {
      title: 'Manage Projects',
      icon: '📁',
      link: '/admin/projects',
      description: 'Add, edit, or delete projects',
    },
    {
      title: 'Manage Clients',
      icon: '👥',
      link: '/admin/clients',
      description: 'View and manage client testimonials',
    },
  ];

  // Memoize stat cards to prevent unnecessary recalculations
  const memoizedStatCards = useMemo(() => statCards, [stats]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div>
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Real Trust Admin Panel</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {memoizedStatCards.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-display">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <QuickActionCard key={index} {...action} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
