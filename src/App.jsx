import {Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import Job from './components/Job/Job';
import Notfound from './components/Notfound/Notfound';
import Jobdetailitem from "./components/Jobdetailitem/Jobdetailitem";

import './App.css'

function App() {

  return (
    <div>
    <Routes>
        <Route path="Login" element={<Login/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="Job" element={<Job/>}/>
        <Route path='jobs/:id' element={<Jobdetailitem/>}/>
        <Route path="*" element={<Notfound/>} />
     </Routes>
    </div>
  )
  
}

export default App
