import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GarageModal from './GarageModal';
import { FaCar } from 'react-icons/fa'; // Font Awesome icons for car

const MainPage = () => {
  const styles = {
    container: 'relative flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-500 to-blue-900 py-2 py-72 px-4',
    title: 'text-3xl sm:text-4xl font-bold mb-6 text-white z-10 text-center',
    subtitle: 'text-base sm:text-xl text-gray-200 mb-8 z-10 text-center',
    filterContainer: 'flex flex-wrap gap-2 sm:gap-4 mb-6 z-10',
    filterButton: 'bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 text-sm sm:text-base',
    selectedFilter: 'bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 text-sm sm:text-base',
    mapContainer: 'relative w-full h-64 sm:h-96 bg-white rounded-lg shadow-lg z-10 hidden',
    garageList: 'relative w-full max-w-4xl bg-white rounded-lg shadow-lg mt-8 z-10',
    garageItem: 'p-4 border-b last:border-b-0 flex flex-col sm:flex-row justify-between items-center cursor-pointer',
    garageDetails: 'flex flex-col text-left',
    garageName: 'text-base sm:text-lg font-bold text-blue-900',
    garageAddress: 'text-sm text-gray-600',
    carIcon: 'absolute text-white opacity-50',
    button: 'bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-sm sm:text-base',
    locationButton: 'bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition duration-300 mt-4 text-sm sm:text-base',
    dropdown: 'bg-white border rounded-lg py-2 px-4 text-gray-700',
    slider: 'w-full mt-4',
  };

  const [garages, setGarages] = useState([]);
  const [filteredGarages, setFilteredGarages] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [filter, setFilter] = useState('All');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [serviceType, setServiceType] = useState('All');
  const [radius, setRadius] = useState(5); // Default radius in km

  useEffect(() => {
    const fetchGarages = async () => {
      try {
        const response = await fetch('/api/user/garages');
        const data = await response.json();
        setGarages(data);
      } catch (error) {
        console.error("Error fetching garages", error);
      }
    };
    fetchGarages();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredGarages(garages);
    } else {
      setFilteredGarages(garages.filter(garage => garage.serviceType === filter));
    }
  }, [filter, garages]);

  const handleGarageClick = (garage) => {
    setSelectedGarage(garage);
  };

  const closeModal = () => {
    setSelectedGarage(null);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const fetchNearbyGarages = async (latitude, longitude, radiusInKm = 5) => {
    try {
      const response = await fetch(`/api/garage/nearby?latitude=${latitude}&longitude=${longitude}&radiusInKm=${radiusInKm}`);
      const data = await response.json();
      setGarages(data);
    } catch (error) {
      console.error("Error fetching nearby garages", error);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
          fetchNearbyGarages(latitude, longitude, radius);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleServiceChange = (event) => {
    setServiceType(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.carIcon}
        style={{ fontSize: '4rem', top: '10%', left: '5%' }}
        animate={{ x: [0, 50, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <FaCar />
      </motion.div>
      <motion.div
        className={styles.carIcon}
        style={{ fontSize: '3rem', top: '50%', right: '10%' }}
        animate={{ x: [-20, 20, -20], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <FaCar />
      </motion.div>
      <motion.div
        className={styles.carIcon}
        style={{ fontSize: '2rem', top: '30%', left: '30%' }}
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <FaCar />
      </motion.div>

      <h1 className={styles.title}>Find Nearby Garages</h1>
      <h2 className={styles.subtitle}>Get quick and reliable services at the best garages near you</h2>

      <div className={styles.filterContainer}>
        <select
          className={styles.dropdown}
          value={serviceType}
          onChange={handleServiceChange}
        >
          <option value="All">All Services</option>
          <option value="CARS">Cars</option>
          <option value="TWOWHEELER">Two-Wheeler</option>
          <option value="BOTH">Both</option>
        </select>

        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={handleRadiusChange}
          className={styles.slider}
        />
        <span className="text-white">Radius: {radius} km</span>
      </div>

      <button
        className={styles.locationButton}
        onClick={handleLocationClick}
      >
        Find Nearby Garages
      </button>

      <div className={styles.mapContainer}>
        <p className="text-center text-gray-700 pt-40">Map Component (to be integrated)</p>
      </div>
      <div className={styles.garageList}>
        {filteredGarages.map((garage, index) => (
          <div
            key={index}
            className={styles.garageItem}
            onClick={() => handleGarageClick(garage)}
          >
            <div className={styles.garageDetails}>
              <span className={styles.garageName}>{garage.garageName}</span>
              <span className={styles.garageAddress}>
                {garage.address ? `${garage.address.streetAddress}, ${garage.address.city}` : 'Address not available'}
              </span>
              <span className={styles.distance}>{garage.mobileNo}</span>
            </div>
            <button
              className={styles.button}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selectedGarage && <GarageModal garage={selectedGarage} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default MainPage;
