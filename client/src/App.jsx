import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ErrorPage from "./pages/ErrorPage.jsx";
import GarageRegister from './components/GarageRegister.jsx';
import UserRegistration from './components/UserRegistration.jsx';
import Home from './pages/Home.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage.jsx';
import EditGarage from './components/EditGarage.jsx';
function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/garage-register" element={<GarageRegister />} />
          <Route path="/edit-garage/:username" element={<ProtectedRoute element={<EditGarage />} />} />
          <Route path="/user-register" element = {<UserRegistration/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
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
