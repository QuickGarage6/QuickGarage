import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './components/UserLogin';
import UserDetailsCard from './components/UserDetailsCard';
import GarageDetailsCard from './components/GarageDetailsCard';
import GarageEdit from './components/GarageEdit';
import UserEdit from './components/UserEdit';

function App() {
  return (
    <div>
      
        <Routes>
          <Route path="/admin" element={<UserLogin />} >
            <Route path="user-card" element={<UserDetailsCard />} />
            <Route path="garage-card" element={<GarageDetailsCard />} />
          </Route>
          <Route path='garage-edit/:userEmail' element={<GarageEdit/>}/>
          <Route path='user-edit/:email' element={<UserEdit/>}/>
        </Routes>
    </div>
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
