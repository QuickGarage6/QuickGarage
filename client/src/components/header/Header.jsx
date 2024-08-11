import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const Header = () => {
    const navigate = useNavigate();
    const [isCardOpen, setIsCardOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const notifications = [
        { id: 1, message: "Your car repair service is ready!", time: "10 mins ago" },
        { id: 2, message: "New customer review received.", time: "1 hour ago" },
        { id: 3, message: "Service appointment scheduled for tomorrow.", time: "3 hours ago" }
    ];
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData);
    }, []);
    const handleCardToggle = () => setIsCardOpen((prev) => !prev);
    const handleNotificationToggle = () => setIsNotificationOpen((prev) => !prev);

    const handleDelete = async () => {
        const url = `http://localhost:8080/api/garage/${user.email}/delete`;
        try {
            const response = await axios.delete(url);
            if (response.status === 200) {
                localStorage.removeItem('userData');
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };
    
    const username = registeredData.fullName;
    
    const styles = {
        container: 'w-full h-16 sm:h-24 bg-white border-b-2 border-gray-200 shadow-md flex justify-between items-center px-4 sm:px-6',
        profileImage: 'w-10 h-10 sm:w-14 sm:h-14 cursor-pointer border-2 border-gray-300 rounded-full flex items-center justify-center overflow-hidden transition-transform transform hover:scale-110',
        logo: 'text-xl sm:text-2xl font-bold text-gray-800 uppercase tracking-wide',
        card: `sm:w-80 w-full max-w-md p-6 mt-4 bg-white fixed right-2 sm:right-4 top-16 sm:top-24 rounded-lg shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${isCardOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`,
        notificationCard: `sm:w-80 w-full max-w-md p-4 mt-4 bg-white fixed right-2 sm:right-4 top-16 sm:top-24 rounded-lg shadow-xl z-50 transform transition-transform duration-500 ease-in-out ${isNotificationOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`,
        notificationIcon: 'w-6 h-6 mr-4 sm:mr-6 cursor-pointer transition-transform transform hover:scale-110',
        button: 'w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 my-2 text-center',
        cancelBtn: 'flex items-center justify-end mb-4 hover:text-gray-700 transition-colors duration-300 cursor-pointer',
        cancelIcon: 'w-6 h-6',
        notificationItem: 'flex justify-between p-2 hover:bg-gray-100 cursor-pointer',
        fieldContainer: 'mb-4 flex items-start space-x-4',
        fieldLabel: 'font-semibold text-gray-700 text-sm capitalize',
        fieldValue: 'text-gray-900 text-base',
        buttonGroup: 'flex space-x-4 mt-4',
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>QuickGarage</div>
            <div className="flex items-center">
                <img
                    src="/notification-bell.svg"
                    alt="Notifications"
                    className={styles.notificationIcon}
                    onClick={handleNotificationToggle}
                />
                <div className={styles.profileImage} onClick={handleCardToggle}>
                    <img src="/user.svg" alt="User Profile" className="w-full h-full object-cover" />
                </div>
            </div>
            {isNotificationOpen && (
                <div className={styles.notificationCard}>
                    <div className="text-lg font-bold mb-2">Recent Notifications</div>
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div key={notification.id} className={styles.notificationItem}>
                                <span>{notification.message}</span>
                                <span className="text-sm text-gray-500">{notification.time}</span>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No notifications</div>
                    )}
                </div>
            )}
            {isCardOpen && user && (
                <div className={styles.card}>
                    <button onClick={handleCardToggle} className={styles.cancelBtn}>
                        <img src="/uparrow.svg" className={styles.cancelIcon} alt="Cancel" />
                        <span className="ml-2 text-gray-500">Cancel</span>
                    </button>
                    <div>
                        {/* Render basic user details */}
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Owner Name:</span>
                            <span className={styles.fieldValue}>{user.ownerName}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Garage Name:</span>
                            <span className={styles.fieldValue}>{user.garageName}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Mobile No:</span>
                            <span className={styles.fieldValue}>{user.mobileNo}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Email:</span>
                            <span className={styles.fieldValue}>{user.email}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Service Type:</span>
                            <span className={styles.fieldValue}>{user.serviceType}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>License Number:</span>
                            <span className={styles.fieldValue}>{user.licenseNumber}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Years of Operation:</span>
                            <span className={styles.fieldValue}>{user.yrsOfOperation}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Longitude:</span>
                            <span className={styles.fieldValue}>{user.longitude}</span>
                        </div>
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Latitude:</span>
                            <span className={styles.fieldValue}>{user.latitude}</span>
                        </div>

                        {/* Render nested address object */}
                        <div className={styles.fieldContainer}>
                            <span className={styles.fieldLabel}>Address:</span>
                            <div className={styles.fieldValue}>
                                <div>Street: {user.address.streetAddress}</div>
                                <div>City: {user.address.city}</div>
                                <div>State: {user.address.state}</div>
                                <div>Country: {user.address.country}</div>
                                <div>Zip Code: {user.address.zipCode}</div>
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <Link to={`/edit-garage/${user.email}`} className={styles.button}>
                                Edit
                            </Link>
                            <button onClick={handleDelete} className={styles.button}>
                                Delete
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
