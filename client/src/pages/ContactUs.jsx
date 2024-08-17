import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const styles = {
  container: 'min-h-screen flex flex-col items-center bg-gray-100 text-gray-800 py-48', // Added pt-16 for header
  title: 'text-4xl font-bold mb-8 text-blue-500',
  description: 'text-lg leading-relaxed text-center max-w-2xl mb-8',
  formContainer: 'w-full max-w-lg bg-white p-8 rounded-lg shadow-lg',
  formTitle: 'text-3xl font-bold mb-6 text-blue-500',
  input: 'w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500',
  textarea: 'w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500',
  submitButton: 'w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300',
  contactInfo: 'mt-16 text-center max-w-2xl',
  contactInfoTitle: 'text-3xl font-bold mb-6 text-blue-500',
  contactInfoText: 'text-lg mb-4',
  contactInfoItem: 'mb-2',
  socialLinks: 'flex justify-center gap-6 mt-8',
  socialIcon: 'w-8 h-8 text-gray-600 hover:text-blue-600 transition duration-300',
};

const ContactUs = () => {
  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Us
      </motion.h1>
      <motion.p
        className={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        We’d love to hear from you! Please fill out the form below or contact us via the provided methods.
      </motion.p>

      <motion.div
        className={styles.contactInfo}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2 className={styles.contactInfoTitle}>Contact Information</h2>
        <p className={styles.contactInfoText}>
          Feel free to reach out to us through the following methods:
        </p>
        <div className={styles.contactInfoItem}>
          <p className="font-semibold">Email:</p>
          <p>info@quickgarage.com</p>
        </div>
        <div className={styles.contactInfoItem}>
          <p className="font-semibold">Phone:</p>
          <p>(123) 456-7890</p>
        </div>
        <div className={styles.contactInfoItem}>
          <p className="font-semibold">Address:</p>
          <p>Cdac, Panchavti Pune, Maharashtra</p>
        </div>
        <div className={styles.socialLinks}>
          <a href="https://facebook.com" className={styles.socialIcon}>
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" className={styles.socialIcon}>
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" className={styles.socialIcon}>
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" className={styles.socialIcon}>
            <FaLinkedin size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
