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
    mainSection: 'relative flex flex-col items-center justify-center w-full bg-transparent z-10 flex-grow',
    sectionTitle: 'text-4xl font-bold mb-6 text-blue-500',
    sectionText: 'text-lg text-gray-700 mb-6 text-pretty max-w-3xl',
    featureList: 'flex flex-col gap-4 text-lg text-gray-600',
    featureItem: 'flex items-start gap-4',
    featureIcon: 'w-8 h-8 text-blue-500',
    callToAction: 'mt-4 py-2 px-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer',
    subsection: 'relative flex flex-col items-center justify-center text-center text-balance rounded-xl mt-10 bg-white shadow-lg z-20 max-w-3xl w-full mx-4 p-10',
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUserFlow = () => {
    login('customer');
    navigate('/login');
  };
  localStorage.setItem('isLoggedIn',false);
  const handleGarageFlow = () => {
    login('garage');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
            </svg>
            <span>Find garages based on your current location</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6-4H9m6 8H9m10 4H5L9 15H15L19 19z" />
            </svg>
            <span>Receive real-time updates on nearby garages</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v1a3 3 0 003 3h0a3 3 0 003-3v-1m4-4h-3m1-4a2 2 0 00-4 0v0a2 2 0 004 0z" />
            </svg>
            <span>Access to a wide network of verified garages</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8V5a3 3 0 00-3-3H7a3 3 0 00-3 3v3m13 0v9a3 3 0 01-3 3H7a3 3 0 01-3-3V8m13 0H4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15h3m-3-3h3m-3-3h3m-3-3h3M9 9v0m0 3v0m0 3v0" />
            </svg>
            <span>Track your garage appointments and history</span>
          </div>
          <div className={styles.featureItem}>
            <svg className={styles.featureIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12v0a2 2 0 002-2h-4a2 2 0 002 2zM10 10h4v6h-4v-6z" />
            </svg>
            <span>Secure online payments</span>
          </div>
        </div>
        <button className={styles.callToAction} onClick={handleUserFlow}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
