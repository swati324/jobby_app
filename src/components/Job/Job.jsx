import React, { useState, useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner'
import Navbar from '../Navbar/Navbar'
import Cookies from 'js-cookie'
import { FaSistrix } from 'react-icons/fa'
import Jobitem from '../Jobitem/Jobitem'
import { useNavigate, Navigate } from 'react-router-dom'
import './Job.css'

const employementfetchList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
  {
    salaryRangeId: '',
    label: 'Clear Filter',
  },
]

const ApiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  noJobs: 'NO_JOBS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Job = () => {
  const [jobList, setJobList] = useState([])
  const [apiStatus, setApiStatus] = useState(ApiStatusConst.initial)
  const [profileList, setprofileList] = useState([])
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [activeEmploymentId, setActiveEmploymentId] = useState([])
  const [activeSalaryRangeId, setActiveSalaryRangeId] = useState('')
  const navigate = useNavigate()

  const onChangeSalaryRange = (salaryRange) => {
    if (activeSalaryRangeId !== salaryRange) {
      setActiveSalaryRangeId(salaryRange)
    } else {
      setActiveSalaryRangeId('')
    }
  }

  const onChangeEmploymentType = (employmentIdList) => {
    const findEmployId = activeEmploymentId.find(
      (item) => item === employmentId,
    )
    if (findEmployId === undefined) {
      setActiveEmploymentId((prev) => [...prev, employmentIdList])
    } else {
      const remainingEmploysId = activeEmploymentId.filter(
        (item) => item !== employmentIdList,
      )
      setActiveEmploymentId([...remainingEmploysId])
    }
  }
  const employementfetch = () => {
    return (
      <div className="employement-details">
        <h1>Type of Employement</h1>
        {employementfetchList.map((item) => (
          <div className="emplyementcontainer" key={item.employementTypeid}>
            <input
              type="checkbox"
              id={item.employementTypeid}
              onChange={() => onChangeEmploymentType(item.employmentTypeId)}
              value={item.employementTypeid}
            />
            <label htmlFor={item.employementTypeid}>{item.label}</label>
          </div>
        ))}
      </div>
    )
  }
   const salaryfetch = () => {
    return (
      <div className="employement-details">
        <h1>Salary Range</h1>
        {salaryRangesList.map((type) => (
          <div className="emplyementcontainer" key={type.salaryRangeId}>
            <input
              type="radio"
              id={type.salaryRangeId}
              onChange={() => onChangeSalaryRange(type.salaryRangeId)}
              value={type.salaryRangeId}
              name="salary-range"
            />
            <label htmlFor={type.salaryRangeId}>{type.label}</label>
          </div>
        ))}
      </div>
    )
  }
  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   const filteredJobs = searchQuery.filter((job) =>
  //     job.title.toLowerCase().includes(event.target.value.toLowerCase())
  //   );
  //   setJobList(filteredJobs);
  // };
  const handleSearch = (event) => setSearch(event.target.value)
  const handleSearchClick = () => {
    setSearchInput(search)
  }
  const searchlist = () => {
    return (
      <div className="search-container">
        <input type="search" value={search} onChange={handleSearch} />
        <button className="search-btn" onClick={handleSearchClick}>
          <FaSistrix />
        </button>
      </div>
    )
  }
  const renderLoaderView = () => (
    <div className="loader-view">
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </div>
  )
  const onNoJobsFound = () => {
    return (
      <div className="notfound">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt=""
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any job. Try other Filters</p>
      </div>
    )
  }

  const renderAllJobs = () => {
    return (
      <>
        {jobList.map((item) => (
          <Jobitem
            key={item.id}
            titel={item.title}
            logo={item.company_logo_url}
            typeEmployement={item.employment_type}
            id={item.id}
            location={item.location}
            rating={item.rating}
            package_per_annum={item.package_per_annum}
            discription={item.job_description}
          />
        ))}
      </>
    )
  }
  const onjobSuccess = (jobList) => {
    setJobList(jobList)
  }
  const renderFailView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure-view"
      />
      <h3>Oops! Something went wrong.</h3>
      <p>We can not seem to find the page you are looking for.</p>
      <button type="button" className="retry-jobs-button" onClick={handleRetry}>
        Retry
      </button>
    </div>
  )

  const handleRetry = () => {
    alljobfetch()
  }
  const alljobfetch = async () => {
    setApiStatus(ApiStatusConst.inProgress)
    const activeEmploymentIdStr = activeEmploymentId.join(',')
    const jwt_token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIdStr}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const option = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + jwt_token },
    }
    const response = await fetch(url, option)
    const data = await response.json()
    // setSearchQuery(data.jobs);
    if (response.ok === true) {
      setJobList(data.jobs)
      if (data.jobs.length > 0) {
        onjobSuccess(data.jobs)
        setApiStatus(ApiStatusConst.success)
      }
      if (data.jobs.length === 0) {
        setApiStatus(ApiStatusConst.noJobs)
      }
    } else {
      setApiStatus(ApiStatusConst.failure)
    }
  }

  const profilefetch = () => {
    return (
      <div className="profile-details">
        <img src={profileList.profile_image_url} alt="" />
        <h1 className="name-container">{profileList.name}</h1>
        <p>{profileList.short_bio}</p>
      </div>
    )
  }

  const allprofilefecth = async () => {
    const jwt_token = Cookies.get('jwt_token')
    const profileUrl = 'https://apis.ccbp.in/profile'
    const option = {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + jwt_token },
    }
    const response = await fetch(profileUrl, option)
    const data = await response.json()
    setprofileList(data.profile_details)
  }

  useEffect(() => {
    alljobfetch()
  }, [activeEmploymentId, activeSalaryRangeId])

  useEffect(() => {
    alljobfetch()
    allprofilefecth()
  }, [])

  // for searhing event
  useEffect(() => {
    alljobfetch()
  }, [searchInput])

  const renderJobsSection = () => {
    switch (apiStatus) {
      case ApiStatusConst.success:
        return renderAllJobs()
      case ApiStatusConst.noJobs:
        return onNoJobsFound()
      case ApiStatusConst.failure:
        return renderFailView()
      case ApiStatusConst.inProgress:
        return renderLoaderView()
      default:
        return null
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken == undefined) {
    return <Navigate to="/Login" />
  }

  return (
    <div>
      <Navbar />
      <div className="job-main-container">
        <div className="job-profile-container">
          <div className="profile-name-container">{profilefetch()}</div>
          <hr />
          {employementfetch()}
          <hr />
          {salaryfetch()}
        </div>
        <div className="job-all-search-container">
          <div className="job-search-container">{searchlist()}</div>
          <div className="all-job-display-conatienr">{renderJobsSection()}</div>
        </div>
      </div>
    </div>
  )
}

export default Job
