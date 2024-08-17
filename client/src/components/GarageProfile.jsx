import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GarageProfile = () => {
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/garage/email?email=${encodeURIComponent(username)}`)
      .then(response => {
        setGarage(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching garage data:', error);
        setError('Failed to fetch garage data');
        setLoading(false);
      });
  }, [username]);

  const styles = {
    container: 'pt-24 min-h-screen bg-gray-100 flex flex-col items-center',
    card: 'bg-white shadow-lg rounded-lg p-8 w-full max-w-md',
    heading: 'text-3xl font-bold text-center text-gray-800 mb-6',
    section: 'mb-4',
    label: 'text-md font-semibold text-gray-700',
    value: 'text-md text-gray-600',
    button: 'mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    error: 'text-red-500 text-center mt-4',
  };

  const handleViewOnMap = () => {
    if (garage) {
      const { latitude, longitude } = garage;
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      window.open(mapUrl, '_blank');
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}><p className={styles.error}>{error}</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Garage Profile</h1>
        <div className={styles.section}>
          <h2 className={styles.label}>Owner Name:</h2>
          <p className={styles.value}>{garage.ownerName}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Garage Name:</h2>
          <p className={styles.value}>{garage.garageName}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Mobile No:</h2>
          <p className={styles.value}>{garage.mobileNo}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Email:</h2>
          <p className={styles.value}>{garage.email}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Service Type:</h2>
          <p className={styles.value}>{garage.serviceType}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Address:</h2>
          <p className={styles.value}>
            {garage.address.streetAddress}, {garage.address.city}, {garage.address.state}, {garage.address.country} - {garage.address.zipCode}
          </p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>License Number:</h2>
          <p className={styles.value}>{garage.licenseNumber}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Years of Operation:</h2>
          <p className={styles.value}>{garage.yrsOfOperation}</p>
        </div>

        <h2 className={styles.label}>Registed Location</h2>
        <button onClick={handleViewOnMap} className={styles.button}>
          View on Map
        </button>
      </div>
    </div>
  );
};

export default GarageProfile;
