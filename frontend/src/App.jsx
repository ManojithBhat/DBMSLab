import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';
import CheckRoutes from './components/checkRoutes';
import Footer from './components/Footer';

// Pages
import SignupPage from './pages/Signup';
import RegisterPage from './pages/Register';
import Dashboard from './pages/DashBoard';
import Login from './pages/Login';
import CounsellorProfile from './pages/CounsellorProfile';
import EventDetails from './pages/EventDetails';
import ListEvents from './pages/ListEvents';
import AddVolunteers from './pages/AddVolunteers';
import DashBoardUSN from './pages/DashBoardUSN';
import PocPage from './pages/PocPage'; // ✅ Ensure correct import

import CounsellorSignup from './pages/CousnellorSignup';
import CounsellorLogin from './pages/CousnellorLogin';
import AddEvent from './pages/AddEvent';
import HomePage from './pages/HomePage';
import AboutUs from './pages/About';
import ProjectFeatures from './pages/Feature';
import ComplaintForm from './pages/Complaint';

// CSS
import './App.css';
import './index.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/counsellor/signup" element={<CounsellorSignup />} />
        <Route path="/counsellor/login" element={<CounsellorLogin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='/about' element={<AboutUs />} />
        <Route path="/profile/counsellor" element={<CounsellorProfile />} />
        <Route path="/events/view/:eventId" element={<EventDetails />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/list-events" element={<ListEvents />} />
        <Route path="/add-volunteers/:eventId" element={<AddVolunteers />} />
        <Route path="/students/:usn" element={<DashBoardUSN />} />
        <Route path="/check-route" element={<CheckRoutes />} />
        <Route path='/features' element={<ProjectFeatures />} />
        <Route path="/complaints" element={<ComplaintForm />} />
        <Route path="/list-poc" element={<PocPage />} /> {/* ✅ Added POC Page */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
