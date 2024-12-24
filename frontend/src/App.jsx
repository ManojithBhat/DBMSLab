import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'

//components 
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';

//pages 
import SignupPage from './pages/Signup'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CounsellorProfile from './pages/CounsellorProfile';
import EventDetails from './pages/EventDetails';
import ListEvents from './pages/ListEvents';
import AddVolunteers from './pages/AddVolunteers';

//css
import './App.css'
import './index.css'
import CounsellorSignup from './pages/CousnellorSignup'
import AddEvent from './pages/AddEvent';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';

function App() {

  return (
    <div>
        <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path="/signup" element = {<SignupPage/>} /> 
      <Route path="/register" element = {<RegisterPage/>} /> 
      <Route path="/counsellor/signup" element = {<CounsellorSignup/>} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile/counsellor/:counsellorId" element={<CounsellorProfile />} />
      <Route path="/list-events/:eventId" element={<EventDetails />} />
      <Route path="/addevent" element={<AddEvent/>}/>
      <Route path="/list-events" element = {<ListEvents/>}/>
      <Route path="/sumne/:eventId" element={<AddVolunteers/>}/>    
     </Routes>
     <Footer/>
    </div>
  )
}

export default App
