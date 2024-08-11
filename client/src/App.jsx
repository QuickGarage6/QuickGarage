import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import GarageRegister from './components/GarageRegister.jsx';
import UserRegistration from './components/UserRegistration.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './components/LandingPage.jsx';
import EditGarage from './components/EditGarage.jsx';
import Header from './components/UserHeader.jsx';
import Footer from './components/Footer.jsx';
function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="user-register" element={<UserRegistration />} />
          <Route path="garage-register" element={<GarageRegister />} />
          <Route path="garage-edit" element={<ProtectedRoute><EditGarage /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
    
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;