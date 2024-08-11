import { motion } from 'framer-motion';

const styles = {
  container: 'min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-8 select-none py-48',
  title: 'text-4xl font-bold mb-8 text-blue-500',
  description: 'text-lg leading-relaxed text-center max-w-2xl mb-8',
  grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl',
  card: 'bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300',
  cardTitle: 'text-xl font-semibold text-gray-700 mb-4',
  cardText: 'text-gray-600',
  contributorsSection: 'mt-16 text-center',
  contributorsTitle: 'text-3xl font-bold mb-8 text-blue-500',
};

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Quick Garage
      </motion.h1>
      <motion.p
        className={styles.description}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Quick Garage is your one-stop solution for all vehicle maintenance and repair needs. We are committed to providing top-notch services to ensure your vehicle runs smoothly and efficiently. Our team of expert technicians is dedicated to delivering quality workmanship with the utmost attention to detail.
      </motion.p>
      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.8, staggerChildren: 0.3 }}
      >
        <motion.div
          className={styles.card}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className={styles.cardTitle}>Our Mission</h3>
          <p className={styles.cardText}>
            To provide reliable and efficient vehicle maintenance services with a focus on customer satisfaction and convenience.
          </p>
        </motion.div>
        <motion.div
          className={styles.card}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className={styles.cardTitle}>Our Vision</h3>
          <p className={styles.cardText}>
            To be the leading garage service provider known for exceptional service and trusted by customers for all their automotive needs.
          </p>
        </motion.div>
        <motion.div
          className={styles.card}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className={styles.cardTitle}>Why Choose Us?</h3>
          <p className={styles.cardText}>
            We offer competitive pricing, quick service, and a team of experienced professionals who are passionate about cars.
          </p>
        </motion.div>
      </motion.div>

      {/* Contributors Section */}
      <motion.div
        className={styles.contributorsSection}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h2 className={styles.contributorsTitle}>Contributors</h2>
        <motion.div
          className={styles.grid}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.8, staggerChildren: 0.3 }}
        >
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={styles.cardTitle}>Akshay Narsanne</h3>
            <p className={styles.cardText}>Frontend Developer</p>
          </motion.div>
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={styles.cardTitle}>Vivek Kate</h3>
            <p className={styles.cardText}>Backend Developer</p>
          </motion.div>
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={styles.cardTitle}>Mrunal Dhadge</h3>
            <p className={styles.cardText}>Backend Developer</p>
          </motion.div>
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={styles.cardTitle}>Umesh Warate</h3>
            <p className={styles.cardText}>Frontend Developer</p>
          </motion.div>
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={styles.cardTitle}>Mote Shreya</h3>
            <p className={styles.cardText}>Backend Developer</p>
          </motion.div>
          <motion.div
            className={styles.card}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className={styles.cardTitle}>Manashree Pandhare</h3>
            <p className={styles.cardText}>Backend Developer</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
