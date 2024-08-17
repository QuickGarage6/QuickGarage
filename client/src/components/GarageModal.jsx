import React from 'react';
import { motion } from 'framer-motion';

const GarageModal = ({ garage, onClose, onBook, latitude, longitude }) => {
  const styles = {
    modalContainer: 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50',
    modalContent: 'bg-white rounded-lg p-8 w-full max-w-lg',
    modalTitle: 'text-2xl font-bold mb-4',
    modalDetails: 'text-sm text-gray-700 mb-4',
    buttonContainer: 'flex justify-between mt-6',
    button: 'bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-sm sm:text-base',
    cancelButton: 'bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 text-sm sm:text-base',
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
        <h2 className={styles.modalTitle}>{garage.garageName}</h2>
        <p className={styles.modalDetails}>Owner: {garage.ownerName}</p>
        <p className={styles.modalDetails}>Mobile: {garage.mobileNo}</p>
        <p className={styles.modalDetails}>Email: {garage.email}</p>
        <p className={styles.modalDetails}>Address: {garage.addressDto.streetAddress}, {garage.addressDto.city}</p>
        <p className={styles.modalDetails}>Service Type: {garage.serviceType}</p>

        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={handleBookClick}
          >
            Book Garage
          </button>
          <button
            className={styles.button}
            onClick={handleGoToMap}
          >
            Go to Map
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
