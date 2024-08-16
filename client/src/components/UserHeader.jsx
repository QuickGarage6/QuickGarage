/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const styles = {
  header: 'bg-gradient-to-r from-blue-500 to-blue-900 text-white fixed top-0 left-0 w-full shadow-md z-50 text-center sm:px-48 rounded-lg',
  container: 'container mx-auto px-4 py-6 flex justify-between items-center',
  logo: 'text-2xl font-bold ',
  nav: 'space-x-4',
  navLink: 'hover:underline',
  socialIcons: 'flex space-x-4',
  socialIcon: 'text-gray-400 hover:text-white transition duration-300',
};

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>Quick Garage</Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/about" className={styles.navLink}>About</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
