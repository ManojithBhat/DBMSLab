import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'

//components 
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/NavBar';
import CheckRoutes from './components/checkRoutes';

//pages 
import SignupPage from './pages/Signup'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CounsellorProfile from './pages/CounsellorProfile';
import EventDetails from './pages/EventDetails';
import ListEvents from './pages/ListEvents';
import AddVolunteers from './pages/AddVolunteers';
import DashBoardUSN from './pages/DashBoardUSN';

//css
import './App.css'
import './index.css'
import CounsellorSignup from './pages/CousnellorSignup';
import CounsellorLogin from './pages/CousnellorLogin';
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
      <Route path="/counsellor/login" element = {<CounsellorLogin/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile/counsellor" element={<CounsellorProfile />} />
      <Route path="/events/view/:eventId" element={<EventDetails />} />
      <Route path="/addevent" element={<AddEvent/>}/>
      <Route path="/list-events" element = {<ListEvents/>}/>
      <Route path="/add-volunteers/:eventId" element={<AddVolunteers/>}/> 
      <Route path="/students/:usn" element={<DashBoardUSN/>}/>   
      <Route path='/check-route' element={<CheckRoutes/>}/>
     </Routes>
     <Footer/> 
    </div>
  )
}

export default App
