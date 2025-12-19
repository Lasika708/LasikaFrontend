import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactAPI } from '../../services/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.mobile.trim()) {
      setError('Mobile number is required');
      return false;
    }
    if (!formData.city.trim()) {
      setError('City is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      await contactAPI.submit(formData);
      setSuccess(true);
      setFormData({ fullName: '', email: '', mobile: '', city: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: 'fullName', label: 'Full Name *', type: 'text', placeholder: 'Enter your full name', icon: '👤' },
    { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'Enter your email', icon: '✉️' },
    { name: 'mobile', label: 'Mobile Number *', type: 'tel', placeholder: 'Enter your mobile number', icon: '📱' },
    { name: 'city', label: 'City *', type: 'text', placeholder: 'Enter your city', icon: '📍' },
  ];

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                          radial-gradient(circle at 70% 70%, rgba(109, 40, 217, 0.2) 0%, transparent 50%)`,
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
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="text-center mb-12"
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
                Get In Touch
              </span>
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 font-display text-blue-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Contact Us
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Get in touch with us for any inquiries or to schedule a consultation.
            </motion.p>
          </motion.div>

          <motion.div
            className="card-glass p-8 md:p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 animate-shimmer opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <AnimatePresence mode="wait">
              {success && (
                <motion.div
                  className="mb-6 p-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    <motion.span
                      className="text-3xl"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      ✓
                    </motion.span>
                    <span className="font-semibold">Thank you for contacting us! We'll get back to you soon.</span>
                  </motion.div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  className="mb-6 p-5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠</span>
                    <span className="font-semibold">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-brand-black mb-2 font-display"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">
                      {field.icon}
                    </div>
                    <motion.input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-brand-purple transition-all duration-300 hover:border-brand-purple/50 shadow-sm"
                      placeholder={field.placeholder}
                      whileFocus={{ scale: 1.02 }}
                    />
                    {focusedField === field.name && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-purple to-brand-purpleLight"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-lg py-4 relative overflow-hidden group mt-2"
                whileHover={{ scale: 1.02, y: -2, boxShadow: '0 10px 40px rgba(139, 92, 246, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.span
                        className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
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
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
