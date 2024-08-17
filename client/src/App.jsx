import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import GarageRegister from './components/GarageRegister.jsx';
import UserRegistration from './components/UserRegistration.jsx';
import AboutUs from './pages/AboutUs.jsx';
import ContactUs from './pages/ContactUs.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './components/LandingPage.jsx';
import EditGarage from './components/EditGarage.jsx';
import Header from './components/UserHeader.jsx';
import Footer from './components/Footer.jsx';
import MainPage from './components/MainPage.jsx';
import GarageMain from './components/header/GarageMain.jsx';
import UserEdit from './components/UserEdit.jsx'
import UserProfile from './components/UserProfile.jsx';
import GarageProfile from './components/GarageProfile.jsx'
function App() {
  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="main" element={<MainPage />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="user-register" element={<UserRegistration />} />
          <Route path="user-edit/:username" element={<UserEdit />} />
          <Route path="garage-register" element={<GarageRegister />} />
          <Route path="user-profile/:username" element={<UserProfile />} />
          <Route path="garage-profile/:username" element={<GarageProfile />} />
          <Route path="garage-edit/:username" element={<EditGarage />} />
          <Route path='home' element={<GarageMain/>}/>
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