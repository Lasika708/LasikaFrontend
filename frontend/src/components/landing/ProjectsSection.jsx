import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsAPI } from '../../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjects([
        {
          id: 1,
          name: 'Project name - location',
          description: 'Consultation',
          category: 'Consultation',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
        },
        {
          id: 2,
          name: 'Project name - location',
          description: 'Design',
          category: 'Design',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
        },
        {
          id: 3,
          name: 'Project name - location',
          description: 'Marketing & Design',
          category: 'Marketing & Design',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
        },
        {
          id: 4,
          name: 'Project name - location',
          description: 'Consultation',
          category: 'Consultation',
          image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
        },
        {
          id: 5,
          name: 'Project name - location',
          description: 'Design',
          category: 'Design',
          image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400',
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
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(109, 40, 217, 0.15) 0%, transparent 50%)`,
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
              Portfolio
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 font-display text-blue-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Our Projects
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <motion.div
              className="inline-block w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id || index}
                className="group relative perspective-1000"
                variants={cardVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                whileHover={{
                  y: -15,
                  rotateY: hoveredIndex === index ? 5 : 0,
                  rotateX: hoveredIndex === index ? -5 : 0,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="card-glass overflow-hidden h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={project.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400'}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    {index === 0 && (
                      <motion.div
                        className="absolute top-3 right-3 bg-brand-purple text-white px-4 py-1.5 rounded-full text-xs font-semibold glow-purple"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        FEATURED
                      </motion.div>
                    )}
                    {/* Floating icon overlay */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-brand-purple/90 backdrop-blur-sm rounded-full flex items-center justify-center glow-purple">
                        <span className="text-white text-2xl">👁</span>
                      </div>
                    </motion.div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <motion.h3
                      className="text-lg font-bold text-brand-black mb-2 font-display"
                      whileHover={{ color: '#8B5CF6' }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.name}
                    </motion.h3>
                    <p className="text-sm text-gray-600 mb-4 flex-1">{project.description}</p>
                    <motion.button
                      className="w-full btn-primary text-sm py-2.5 relative overflow-hidden"
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.span
                        className="relative z-10 flex items-center justify-center gap-2"
                        animate={hoveredIndex === index ? { x: 5 } : { x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        VIEW MORE
                        <motion.span
                          animate={{ rotate: hoveredIndex === index ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-brand-purpleDark to-brand-purple"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {error && projects.length === 0 && (
          <motion.div
            className="text-center text-red-600 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
      </div>

      {/* Enhanced Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-brand-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="card-glass max-w-3xl w-full mx-4 overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 20 }}
              transition={{ duration: 0.4, type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative h-80 md:h-96 overflow-hidden">
                <motion.img
                  src={selectedProject.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.button
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-brand-black hover:bg-white shadow-lg"
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className="p-8">
                <motion.h3
                  className="text-3xl font-bold text-brand-black mb-3 font-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedProject.name}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-6 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProject.description || 'A beautifully executed project that maximizes value and appeal through expert consultation, innovative design, and strategic marketing.'}
                </motion.p>
                <motion.div
                  className="flex justify-end gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.button
                    className="btn-secondary"
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
