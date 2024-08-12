import { motion } from 'framer-motion';

const GarageModal = ({ garage, onClose }) => {
  if (!garage) return null;

  const address = garage.addressForUserDto || {};
  const streetAddress = address.streetAddress || 'N/A';
  const city = address.city || 'N/A';

  // Dummy latitude and longitude values
  const dummyLatitude = 37.7749; // Example: San Francisco latitude
  const dummyLongitude = -122.4194; // Example: San Francisco longitude

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{garage.garageName}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-2">Owner: {garage.ownerName}</p>
        <p className="text-sm sm:text-base text-gray-600 mb-2">Address: {streetAddress}, {city}</p>
        <p className="text-sm sm:text-base text-gray-600 mb-2">Phone: {garage.mobileNo}</p>
        <a
          href={`https://www.google.com/maps?q=${dummyLatitude},${dummyLongitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          View on Google Maps
        </a>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GarageModal;
