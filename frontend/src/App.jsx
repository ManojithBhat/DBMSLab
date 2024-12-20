import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'

//components 
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';

//pages 
import SignupPage from './pages/Signup'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CounsellorProfile from './pages/CounsellorProfile';
import EventDetails from './pages/EventDetails';

//css
import './App.css'
import './index.css'
import CounsellorSignup from './pages/CousnellorSignup'
import AddEvent from './pages/AddEvent';

function App() {

  return (
    <div>
        <Navbar/>
    <Routes>
      <Route path="/signup" element = {<SignupPage/>} /> 
      <Route path="/register" element = {<RegisterPage/>} /> 
      <Route path="/counsellor/signup" element = {<CounsellorSignup/>} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile/counsellor/:counsellorId" element={<CounsellorProfile />} />
      <Route path="/events/view/:eventId" element={<EventDetails />} />
      <Route path="/addevent" element={<AddEvent/>}/>
     </Routes>
    </div>
  )
}

export default App
