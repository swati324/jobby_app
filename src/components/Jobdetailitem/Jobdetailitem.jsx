import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Skills from "../Skills/Skills";
import SimillerCard from "../SimillerCard/SimillerCard";
import Cookies from "js-cookie";
import React from "react";
import {  FaStar, FaMapMarkerAlt, FaBook } from 'react-icons/fa'
import './Jobdetailitem.css'

const viewStatus = {
  initial: "INITIAL",
  success: "SUCCESS",
  noJobs: "NO_JOBS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const Jobdetailitem = () => {
  const [apiStatus, setApiStatus] = useState([viewStatus.initial]);
  const [Alljobdata, setAlljobdata] = useState([])
  const [lifeAtCompanyDetails, setlifeAtCompanyDetails] = useState('')
  const [allskills, setallskills]= useState('')
  const [simillerJob, setsimillerjob] = useState('')

  const { id } = useParams();

  const AllDataViewfetch = async () => {
    setApiStatus(viewStatus.inProgress);
    const jwt_token = Cookies.get("jwt_token");
    const Url = `https://apis.ccbp.in/jobs/${id}`;
    const option = {
      method: 'GET',
      headers: { Authorization: "Bearer " + jwt_token },
    };
    const response = await fetch(Url, option);
    if (response.ok) {
      const data = await response.json();
      setAlljobdata(data.job_details)
      setlifeAtCompanyDetails(data.job_details.life_at_company)
      setallskills(data.job_details.skills)
      setsimillerjob(data.similar_jobs)
      console.log(data);

      setApiStatus(viewStatus.success);
  
    } else {
    }
  };

  useEffect(() => {
    AllDataViewfetch();
  }, [])

  const renderallDataView = () => {
    switch (apiStatus) {
      case viewStatus.success:
        return fetchdatasuccess();

    }
  };


const fetchdatasuccess =()=>{
  return(
    <>
   <div className="bg-container">
       <div className="jobdetails-main-container">
        <div className="full-details-main-container">
          <div className="logo-name-rating-container">
          <img className="job-details-logo" alt="job details company logo" src={Alljobdata.company_logo_url} />
        
          <div className="job-details-name-container">
            <h2>{Alljobdata.title}</h2>
            <p>
                  <span className="rating-star">
                    <FaStar className="star-tag" />
                  </span>
                  {Alljobdata.rating}
                </p>
          </div>
          </div>
          <div className="job-details-location-type-package-container">
              <div className="job-details-location-type-container">
                <div className="job-details-location-container">
                  <p>
                    <span>
                      <FaMapMarkerAlt className="react-icon-location" />
                    </span>
                    {Alljobdata.location}
                  </p>
                </div>
                <div className="job-details-type-container">
                  <p>
                    <span>
                      <FaBook className="react-icon-type" />
                    </span>
                    {Alljobdata.employment_type}
                  </p>
                </div>
              </div>
              <div className="job-package-container">
                <p>{Alljobdata.package_per_annum}</p>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="job-description-container">
              <div className="job-description-heading-container">
                <h1>Description</h1>
                <a
                  href={Alljobdata.company_website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit
                </a>
              </div>
              <p>{Alljobdata.job_description}</p>
            </div>

            <div className="job-details-skills-container">
              <h1>Skills</h1>
              <ul>
                {allskills.map(eachItem => (
                  <Skills key={eachItem.name}
                   skillsDetails={eachItem} />
                ))}
              </ul>
            </div>
            <div className="life-at-company-container">
              <h1>Life At Company</h1>
              <div>
                <p>{lifeAtCompanyDetails.description}</p>
                <img
                  alt="life at company"
                  src={lifeAtCompanyDetails.image_url}
                  className='life-at-company-image'
                />
              </div>
            </div>
          
          </div>
          <div className="similar-jobs-section-container">
          <h1>Similar Jobs</h1>
             <ul className="similar-jobs-cards-container">
                {simillerJob.map(eachItem => (
                  <SimillerCard key={eachItem.name}
                  simillerJob={eachItem} />
                ))}
             </ul>
        </div>
        </div>
    
      </div>
     

  
       
    </>
  )

}


  return( 
 
    <div className="jobdetails-main-container">
       <Navbar />
      {renderallDataView()}
      </div>

  )
};

export default Jobdetailitem;
