import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell } from 'react-icons/fa';

const GarageMain = () => {
  const [notifications, setNotifications] = useState([]);
  const [garageInfo, setGarageInfo] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const styles = {
    container: 'relative flex md:flex-row items-center justify-center min-w-[100%] min-h-screen max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-blue-900 p-6 rounded-lg shadow-lg mt-8 z-10 pt-0',
    notificationContainer: 'md:w-1/2 bg-blue-700 text-white p-4 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md',
    notificationTitle: 'text-xl font-bold mb-4',
    notificationItem: 'flex items-center justify-between p-3 rounded-lg mb-2 transition duration-300 cursor-pointer',
    notificationItemUnread: 'bg-blue-900 hover:bg-blue-800',
    notificationItemRead: 'bg-blue-600',
    notificationText: 'text-sm',
    infoContainer: 'w-full md:w-1/2 bg-white text-gray-800 p-4 rounded-lg shadow-md',
    infoTitle: 'text-xl font-bold mb-4 text-blue-900',
    infoDetail: 'text-sm text-gray-700 mb-2',
    bellIcon: 'mr-2 text-white opacity-80',
    errorMessage: 'text-red-500 text-sm mt-2',
    buttonContainer: 'flex justify-center gap-4 mt-6',
    button: 'bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition duration-300',
    deleteButton: 'bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition duration-300',
    modal: 'fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75',
    modalContent: 'bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto',
    modalHeader: 'text-xl font-bold mb-4',
    modalBody: 'mb-4',
    modalFooter: 'flex justify-end gap-4',
    actionButton: 'bg-green-500 text-white p-2 rounded-lg shadow hover:bg-green-600 transition duration-300 cursor-pointer',
    cancelButton: 'bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition duration-300 cursor-pointer',
  };

  const fetchEmail = () => {
    const data = JSON.parse(localStorage.getItem('userData'));
    const userEmail = data?.data?.email;
    if (!userEmail) {
      throw new Error('No email found in localStorage');
    }
    setEmail(userEmail);
    return userEmail;
  };

  const fetchGarageInfo = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/garage/email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setGarageInfo({
        id: data.id,
        ownerName: data.ownerName || 'N/A',
        garageName: data.garageName || 'N/A',
        mobileNo: data.mobileNo || 'N/A',
        email: data.email || 'N/A',
        serviceType: data.serviceType || 'N/A',
        address: `${data.address?.streetAddress || 'N/A'}, ${data.address?.city || 'N/A'}, ${data.address?.state || 'N/A'}, ${data.address?.country || 'N/A'} ${data.address?.zipCode || 'N/A'}`,
        licenseNumber: data.licenseNumber || 'N/A',
        yrsOfOperation: data.yrsOfOperation || 'N/A',
        longitude: data.longitude || 'N/A',
        latitude: data.latitude || 'N/A',
      });
    } catch (error) {
      setGarageInfo(null);
      setError('Failed to fetch garage information');
    }
  };

  const fetchNotifications = async (garageId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/garage/${garageId}/notification`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      setNotifications([]);
      setError('Failed to fetch notifications');
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/{id}?id=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      setUserDetails(null);
      setError('Failed to fetch user details');
    }
  };

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    if (notification.userId) {
      await fetchUserDetails(notification.userId);
    }
    setModalVisible(true);
  };

  const handleAccept = async () => {
    if (selectedNotification) {
      try {
        await fetch(`http://localhost:8080/api/booking/${selectedNotification.id}/confirm`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotifications(notifications.map(n =>
          n.id === selectedNotification.id ? { ...n, read: true } : n
        ));
        setModalVisible(false);
      } catch (error) {
        setError('Failed to confirm booking');
      }
    }
  };

  const handleReject = async () => {
    if (selectedNotification) {
      try {
        await fetch(`http://localhost:8080/api/booking/${selectedNotification.id}/confirm`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setNotifications(notifications.map(n =>
          n.id === selectedNotification.id ? { ...n, read: true } : n
        ));
        setModalVisible(false);
      } catch (error) {
        setError('Failed to reject notification');
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        const email = fetchEmail();
        if (email) {
          await fetchGarageInfo(email);
          if (garageInfo?.id) {
            await fetchNotifications(garageInfo.id);
          }
        }
      } catch (error) {
        setError('Failed to initialize component');
      }
    };

    initialize();
  }, [garageInfo?.id]);

  return (
    <div className={styles.container}>
      <div className={styles.notificationContainer}>
        <h3 className={styles.notificationTitle}>Garage Notifications</h3>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <motion.div
              key={notification.id}
              className={`${styles.notificationItem} ${notification.read ? styles.notificationItemRead : styles.notificationItemUnread}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !notification.read && handleNotificationClick(notification)}
            >
              <FaBell className={styles.bellIcon} />
              <span className={styles.notificationText}>{notification.message}</span>
            </motion.div>
          ))
        ) : (
          <p className={styles.infoDetail}>No notifications</p>
        )}
      </div>

      {modalVisible && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {userDetails && (
              <div>
                <p><strong>User Details:</strong></p>
                <p>Name: {userDetails.name}</p>
                <p>Email: {userDetails.email}</p>
                <p>Mobile Number: {userDetails.mobileNo}</p>
              </div>
            )}
            <div className={styles.modalFooter}>
              <button className={styles.actionButton} onClick={handleAccept}>Accept</button>
              <button className={styles.cancelButton} onClick={handleReject}>Reject</button>
            </div>
          </div>
        </div>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default GarageMain;
