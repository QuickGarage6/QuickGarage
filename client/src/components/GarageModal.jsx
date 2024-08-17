import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaBook, FaTimes } from 'react-icons/fa';

const GarageModal = ({ garage, onClose, onBook, latitude, longitude }) => {
  const styles = {
    modalContainer: 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-8',
    modalContent: 'bg-white rounded-lg p-6 sm:p-8 w-full max-w-lg relative',
    modalTitle: 'text-2xl font-bold mb-4 text-center',
    modalDetails: 'text-sm text-gray-700 mb-2 sm:mb-4',
    buttonContainer: 'flex flex-col sm:flex-row justify-between mt-6',
    button: 'bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-sm sm:text-base flex items-center justify-center mb-2 sm:mb-0 sm:mr-2',
    cancelButton: 'bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 text-sm sm:text-base flex items-center justify-center',
    closeButton: 'absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300 cursor-pointer',
  };

  const handleBookClick = () => {
    onBook(garage.id);
    onClose();
  };

  const handleGoToMap = () => {
    onClose();
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
    } else {
      console.error('Latitude and Longitude are not available');
    }
  };

  return (
    <motion.div
      className={styles.modalContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <FaTimes
          className={styles.closeButton}
          size={20}
          onClick={onClose}
        />
        <h2 className={styles.modalTitle}>{garage?.garageName || 'Garage Name'}</h2>
        <p className={styles.modalDetails}>Owner: {garage?.ownerName || 'N/A'}</p>
        <p className={styles.modalDetails}>Mobile: {garage?.mobileNo || 'N/A'}</p>
        <p className={styles.modalDetails}>Email: {garage?.email || 'N/A'}</p>
        <p className={styles.modalDetails}>Address: {garage?.addressDto?.streetAddress || 'Street'}, {garage?.addressDto?.city || 'City'}</p>
        <p className={styles.modalDetails}>Service Type: {garage?.serviceType || 'Service Type'}</p>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleBookClick}
          >
            <FaBook className="mr-2" /> Book Garage
          </button>
          <button
            className={styles.button}
            onClick={handleGoToMap}
          >
            <FaMapMarkerAlt className="mr-2" /> Go to Map
          </button>
          <button
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GarageModal;
