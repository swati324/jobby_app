import React from 'react'
import { Link } from 'react-router-dom';
 import {  FaStar, FaMapMarkerAlt, FaBook } from 'react-icons/fa'

const Jobitem = (props) => {
  return (
    <Link to={`/jobs/${props.id}`} className='job-details-link'>
     <div className="all-data-display">
          <div className="job-details-logoname-rating-container">
            <div className="job-details-logo-container">
              <img src={props.logo} alt="" />
            </div>
            <div className="job-details-name-rating-container">
              <h1>{props.titel}</h1>
              <p>
                <span className="rating-star"><FaStar/></span>
                {props.rating}
              </p>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="job-details-location-type-container">
            <div className="job-details-location-container">
              <p>
                <span><FaMapMarkerAlt/></span>
                {props.location}
              </p>
            </div>
            <div className="job-details-type-container">
              <p>
               <span><FaBook/></span>
                {props.typeEmployement}
              </p>
            </div>
            </div>
            <div className="job-package-container">
              <p>{props.package_per_annum}</p>
            </div>
          </div>
          <hr />
          <div className="job-description-container">
          <h2>Discription</h2>
          <p>{props.discription}</p>
          </div>
        </div>
        </Link>
     
  )
 
}

export default Jobitem
