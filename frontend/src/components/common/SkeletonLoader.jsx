import { motion } from 'framer-motion';

const SkeletonLoader = ({ className = '', count = 1, height = 'h-4' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={`${height} bg-gray-200 rounded ${className}`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.1,
          }}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;

