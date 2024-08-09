import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const styles = {
    container: 'flex flex-col items-center justify-center h-screen bg-red-100',
    title: 'text-4xl font-bold mb-4',
    subtitle: 'text-xl text-gray-400 mb-8 font-bold',
    button: 'w-48 py-4 text-blue-600 text-center rounded-2xl bg-blue-100 hover:bg-blue-200 transition duration-300 italic',
    subcontainer: 'flex flex-wrap justify-center gap-11',
  };
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleUserFlow = () => {
    login('customer');
    navigate('/login');
  }
  const handleGarageFlow = () => {
    login('garage');
    navigate('/login');
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Quick Garage</h1>
      <h2 className={styles.subtitle}>Login to access your account</h2>
      <div className={styles.subcontainer}>
        <button className={styles.button} onClick={handleUserFlow}>Customer</button>
        <button className={styles.button} onClick={handleGarageFlow}>Garage</button>
      </div>
    </div>
  );
};

export default LandingPage;