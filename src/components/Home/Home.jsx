import React from 'react'
import Navbar from '../Navbar/Navbar'
import Cookies from 'js-cookie';
 import {useNavigate,Navigate} from "react-router-dom"
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken == undefined) {
    return <Navigate to="/Login" />
  }

  return (
    <div>
      <Navbar />
      <div className="main-container1 mt-3">
        <div className="home-main-page-text-container">
          <div className="heading-container">
            <h1>Find The Job That Fits Your Life</h1>
          </div>
          <div className="para-container pt-3">
            <p>
              Millions of people searching for jobs, salary information, company
              review. Find the job that fits your abilities and potential
            </p>
          </div>
          <div >
            <button className='findjobs' onClick={()=>navigate("/job")} type="button">Find Jobs</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Home
