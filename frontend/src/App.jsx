import { Routes,Route } from 'react-router-dom'

//components 


//pages 
import SignupPage from './pages/Signup'

//css
import './App.css'

function App() {

  return (
    <div>
    <Routes>
      <Route path="/auth/signup" element = {<SignupPage/>} /> 
     </Routes>
    </div>
  )
}

export default App
