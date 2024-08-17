import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';

const styles = {
  header: 'bg-gradient-to-r from-blue-500 to-blue-900 text-white fixed top-0 left-0 w-full shadow-md z-50 text-center px-6 sm:px-12 rounded-b-lg',
  container: 'max-w-7xl mx-auto flex justify-between items-center py-4',
  logo: 'text-lg sm:text-2xl font-bold tracking-wide hover:text-blue-200 transition duration-200',
  nav: 'flex space-x-6',
  navLink: 'hover:text-blue-200 transition duration-200',
  userImage: 'w-10 h-10 rounded-full hover:cursor-pointer transition duration-200 ml-2',
  userDetails: 'absolute top-16 right-6 sm:right-12 mt-2 w-64 bg-white rounded-lg p-4 shadow-lg backdrop-blur bg-opacity-70',
  buttonContainer: 'flex flex-col space-y-3',
  button: 'bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300',
  errorMessage: 'text-red-500 text-sm mt-2',
};

const Header = () => {
  const navigate = useNavigate();
  const { userType, logout } = useAuth();
  const [localData, setLocalData] = useState(null);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const userDetailsRef = useRef(null);

  const handleUserModel = () => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      setLocalData(data.data);
    }
    setIsOpenModel(prev => !prev); // Toggle the model
  };

  const handleProfileLink = () => {
    setIsOpenModel(false);
    if (localData) {
      const profilePath = userType === 'garage' 
        ? `/garage-profile/${encodeURIComponent(localData.email)}` 
        : `/user-profile/${encodeURIComponent(localData.email)}`;
      navigate(profilePath);
    }
  };

  const handleEdit = () => {
    setIsOpenModel(false);
    if (localData) {
      const editPath = userType === 'garage' 
        ? `/garage-edit/${encodeURIComponent(localData.email)}` 
        : `/user-edit/${encodeURIComponent(localData.email)}`;
      navigate(editPath);
    }
  };

  const handleLogout = () => {
    setIsOpenModel(false);
    localStorage.clear();
    logout();
    navigate(`/`);
  };

  const handleMainButtonClick = () => {
    const mainPath = userType === 'garage' ? `/home` : `/main`;
    navigate(mainPath);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
        setIsOpenModel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Quick Garage</Link>
        <nav className={styles.nav}>
          {userType ? (
            <button onClick={handleMainButtonClick} className={styles.navLink}>Home</button>
          ) : (
            <Link to="/" className={styles.navLink}>Home</Link>
          )}
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </nav>
        {userType && (
          <div className={styles.userImage} onClick={handleUserModel} aria-expanded={isOpenModel}>
            <img src="/icon.png" alt="User Icon" />
          </div>
        )}
        {isOpenModel && localData && (
          <div ref={userDetailsRef} className={styles.userDetails}>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={handleProfileLink}>My Profile</button>
              <button className={styles.button} onClick={handleEdit}>Edit</button>
              <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;