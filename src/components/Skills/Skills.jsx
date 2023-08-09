import React from 'react'

const Skills = (props) => {
    const {skillsDetails} = props

  return (
    <div>
      <li className="skill-items-container">
      <img alt={skillsDetails.name} src={skillsDetails.image_url} />
      <p>{skillsDetails.name}</p>
    </li>


    </div>
  )
}

export default Skills
