import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams(); // Get the email from the URL parameters
  const [user, setUser] = useState(null); // Initialize user state
  const [loading, setLoading] = useState(true); // Loading state to show while fetching data
  const [error, setError] = useState(null); // Error state to handle any errors during the fetch

  const styles = {
    container: 'pt-12 min-h-screen bg-gray-100 flex items-center justify-center',
    card: 'bg-white shadow-lg rounded-lg p-8 w-full max-w-md',
    heading: 'text-3xl font-bold text-center text-gray-800 mb-6',
    section: 'mb-4',
    label: 'text-xl font-semibold text-gray-700',
    value: 'text-lg text-gray-600'
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/email?email=${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUser();
  }, [username]); 
  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>User Profile</h1>
        <div className={styles.section}>
          <h2 className={styles.label}>Name:</h2>
          <p className={styles.value}>{user.name}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Mobile No:</h2>
          <p className={styles.value}>{user.mobileNo}</p>
        </div>
        <div className={styles.section}>
          <h2 className={styles.label}>Email:</h2>
          <p className={styles.value}>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
