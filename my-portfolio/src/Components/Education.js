import React from 'react';

function Education() {
  const educationList = [
    {
      institution: 'BUET',
      degree: 'Bachelor of Science in Computer Science',
      duration: '2019 - 2023',
    },
    {
      institution: 'Notre Dame College',
      degree: 'Higher Secondary Certificate (Science)',
      duration: '2017 - 2019',
    },
    {
      institution: 'St. Gregory\'s High School & College',
      degree: 'Secondary School Certificate',
      duration: '2007 - 2017',
    },
  ];

  return (
    <div className="education-container">
      <h2>Education</h2>
      <ul className="education-list">
        {educationList.map((edu, index) => (
          <li key={index} className="education-item">
            <h3>{edu.institution}</h3>
            <p>{edu.degree}</p>
            <p>{edu.duration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Education;
