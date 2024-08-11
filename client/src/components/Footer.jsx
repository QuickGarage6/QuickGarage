import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const styles = {
  footer: 'bg-gradient-to-r from-blue-500 to-blue-900 text-white py-8',
  container: 'container mx-auto px-4',
  section: 'flex flex-col md:flex-row justify-between items-center',
  logo: 'text-2xl font-bold mb-6 md:mb-0',
  links: 'flex flex-col md:flex-row mb-6 md:mb-0',
  linkItem: 'mb-4 md:mb-0 md:mr-6',
  linkTitle: 'text-lg font-semibold mb-2',
  link: 'hover:underline',
  contactInfo: 'mb-4 md:mb-0 md:mr-6',
  socialIcons: 'flex space-x-4',
  socialIcon: 'text-gray-400 hover:text-white transition duration-300',
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.logo}>
            <h2 className="text-2xl font-bold">Quick Garage</h2>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Quick Garage. All rights reserved.</p>
          </div>
          <div className={styles.links}>
            <div className={styles.linkItem}>
              <h3 className={styles.linkTitle}>Links</h3>
              <ul>
                <li><Link to="/" className={styles.link}>Home</Link></li>
                <li><Link to="/about" className={styles.link}>About Us</Link></li>
                <li><Link to="/contact" className={styles.link}>Contact Us</Link></li>
              </ul>
            </div>
            <div className={styles.contactInfo}>
              <h3 className={styles.linkTitle}>Contact</h3>
              <p className="text-gray-400 text-sm">123 Garage St, Auto City</p>
              <p className="text-gray-400 text-sm">Email: info@quickgarage.com</p>
              <p className="text-gray-400 text-sm">Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className={styles.linkTitle}>Follow Us</h3>
              <div className={styles.socialIcons}>
                <a href="https://facebook.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
                <a href="https://twitter.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
                <a href="https://instagram.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
                <a href="https://linkedin.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
