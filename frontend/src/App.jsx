import { Routes,Route } from 'react-router-dom'

//components 


//pages 
import SignupPage from './pages/Signup'
import RegisterPage from './pages/Register'

//css
import './App.css'
import './index.css'
import CounsellorSignup from './pages/CousnellorSignup'

function App() {

  return (
    <div>
    <Routes>
      <Route path="/signup" element = {<SignupPage/>} /> 
      <Route path="/register" element = {<RegisterPage/>} /> 
      <Route path="/counsellor/signup" element = {<CounsellorSignup/>} /> 
     </Routes>
    </div>
  )
}

export default App
