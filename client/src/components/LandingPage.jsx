import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const styles = {
    container: 'relative flex flex-col items-center justify-between min-h-screen overflow-x-hidden overflow-auto bg-gradient-to-r from-blue-500 to-blue-900 py-2 pt-48 ',
    title: 'text-5xl font-bold mb-4 text-white z-10',
    subtitle: 'text-2xl text-gray-200 mb-8 font-bold z-10',
    button: 'w-48 py-4 text-blue-600 text-center rounded-2xl bg-blue-100 hover:bg-blue-200 transition duration-300 z-10',
    subcontainer: 'flex flex-wrap justify-center gap-11 z-10',
    backgroundCircle: 'absolute rounded-full bg-white opacity-10',
    mainSection: 'relative flex flex-col items-center justify-center w-full bg-transparent z-10 flex-grow',
    sectionTitle: 'text-4xl font-bold mb-6 text-blue-500',
    sectionText: 'text-lg text-gray-700 mb-6 text-center max-w-3xl',
    featureList: 'flex flex-col gap-4 text-lg text-gray-600',
    featureItem: 'flex items-start gap-2',
    featureIcon: 'w-6 h-6 text-blue-500',
    callToAction: 'mt-4 py-2 px-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer',
    subsection: 'relative flex flex-col items-center justify-center py-20 rounded-xl mt-10 bg-white shadow-lg z-20 max-w-3xl w-full mx-4',
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUserFlow = () => {
    login('customer');
    navigate('/login');
  };

  const handleGarageFlow = () => {
    login('garage');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.backgroundCircle}
        style={{ width: '300px', height: '300px', top: '20%', left: '10%' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.backgroundCircle}
        style={{ width: '500px', height: '500px', top: '50%', left: '70%' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className={styles.backgroundCircle}
        style={{ width: '400px', height: '400px', top: '80%', left: '20%' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
      <div className={styles.mainSection}>
        <h1 className={styles.title}>Welcome to Quick Garage</h1>
        <h2 className={styles.subtitle}>Login to access your account</h2>
        <div className={styles.subcontainer}>
          <button className={styles.button} onClick={handleUserFlow}>Customer</button>
          <button className={styles.button} onClick={handleGarageFlow}>Garage</button>
        </div>
      </div>
      <div className={styles.subsection}>
        <h2 className={styles.sectionTitle}>Our Solution for Finding Nearby Garages</h2>
        <p className={styles.sectionText}>
          Quick Garage provides a seamless experience to find the nearest garages to your location. Our platform leverages cutting-edge technology to connect you with reliable service providers in your vicinity. Whether you're looking for routine maintenance or urgent repairs, our solution ensures that you get the best services quickly and efficiently.
        </p>
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a2 2 0 00-2 2v4a2 2 0 004 0V4a2 2 0 00-2-2zM6.293 5.293A1 1 0 017 5h10a1 1 0 01.707 1.707L15.414 9l1.293 1.293A1 1 0 0118 12h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-.707-.293L15.414 17l-1.293 1.293A1 1 0 0114 19H6a1 1 0 01-.707-1.707L7.586 17 6.293 15.707A1 1 0 016 14H4a1 1 0 01-1-1v-6a1 1 0 011-1h2a1 1 0 01.707.293L9 9.414l1.293-1.293A1 1 0 0110 7V4a2 2 0 00-2-2z" />
            </svg>
            <span>Find garages based on your current location</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.5 4.5L15 19V10zM4 21a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v16a1 1 0 01-1 1H4z" />
            </svg>
            <span>Receive real-time updates on nearby garages</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h4a1 1 0 001-1v-5a1 1 0 00-1-1H7a1 1 0 00-1 1v5a1 1 0 001 1h3zM15 10h6V4h-6v6zM15 14h6v-6h-6v6zM5 14h6v-6H5v6z" />
            </svg>
            <span>Access to a wide network of verified garages</span>
          </div>
        </div>
        <button className={styles.callToAction} onClick={handleUserFlow}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
