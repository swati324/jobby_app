import React from "react";
import {  FaStar, FaMapMarkerAlt, FaBook } from 'react-icons/fa'
import "./SimillerCard.css";

const SimillerCard = (props) => {
  const { simillerJob } = props;
  return (
    <li className="job-details-item-card">
    <div className="job-details-logo-name-rating-container">
        <div className="job-details-logo-container">
            <img alt="similar job company logo" src={simillerJob.company_logo_url} />
        </div>
        <div className="job-details-name-rating-container">
            <h1>{simillerJob.title}</h1>
            <p>
                <span className="rating-star">
                    <FaStar className="star-tag" />
                </span>
                {simillerJob.rating}
            </p>
        </div>
    </div>
    <div className="job-description-container">
        <h1>Description</h1>
        <p>{simillerJob.job_description}</p>
    </div>
    <div className="job-details-location-type-package-container">
        <div className="job-details-location-type-container">
            <div className="job-details-location-container">
                <p>
                    <span>
                        <FaMapMarkerAlt className="react-icon-location" />
                    </span>
                    {simillerJob.location}
                </p>
            </div>
            <div className="job-details-type-container">
                <p>
                    <span>
                        <FaBook className="react-icon-type" />
                    </span>
                    {simillerJob.employment_type}
                </p>
            </div>
        </div>
    </div>
</li>

  );
};

export default SimillerCard;
