// src/pages/Dropdowns.jsx
import React, { useState, useEffect } from 'react';

const Dropdown = ({ label, options, value, onChange }) => {
  const dropdownStyle = {
    display: 'block',
    margin: '10px 0',
  };

  const labelStyle = {
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#333',
  };

  const selectStyle = {
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div style={dropdownStyle}>
      <label style={labelStyle}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const Dropdowns = () => {
  const [classroom, setClassroom] = useState('');
  const [subject, setSubject] = useState('');
  const [channel, setChannel] = useState('');
  const [instance, setInstance] = useState('');

  const classrooms = ['Classroom 1', 'Classroom 2', 'Classroom 3', 'Classroom 4', 'Classroom 5'];
  const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'];

  useEffect(() => {
    if (classroom) {
      const selectedClassroomNumber = classrooms.indexOf(classroom) + 1;
      setChannel(`channel_${selectedClassroomNumber}`);
    } else {
      setChannel('');
    }
  }, [classroom]);

  useEffect(() => {
    if (subject) {
      const selectedSubjectNumber = subjects.indexOf(subject) + 1;
      setInstance(`instance_${selectedSubjectNumber}`);
    } else {
      setInstance('');
    }
  }, [subject]);

  useEffect(() => {
    if (channel) {
      console.log(`Selected channel: ${channel}`);
    }
  }, [channel]);

  useEffect(() => {
    if (instance) {
      console.log(`Selected instance: ${instance}`);
    }
  }, [instance]);

  const handleSubmit = () => {
    if (channel && instance) {
      const url = `https://www.uxlive.me/dowellscale/samanta-edu/?workspace_id=66879a901c299b49c227088b&username=samantaeducation&channel=${channel}&instance=${instance}&scale_id=6687e18aa74d1fcdca15fde3`;
      window.open(url, '_blank');
    } else {
      alert('Please select both Classroom and Subject before submitting.');
    }
  };

  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    marginBottom: '20px',
    color: '#333',
    fontSize: '24px',
  };

  const logoStyle = {
    marginBottom: '50px',
    maxWidth: '20%', // Reduce the size of the logo
    height: 'auto',
    display: 'block', // Center align the logo
    margin: '0 auto', // Center align the logo
  };

  const buttonStyle = {
    marginTop: '25px',
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#45a049',
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://i0.wp.com/dowellresearch.de/wp-content/uploads/2023/04/true-moments-logo-1-1-442919954-1538479590775-1.webp?w=382&ssl=1"
        alt="True Moments Logo"
        style={logoStyle}
      />
      <h1 style={headerStyle}>Please select classroom and subject</h1>
      <Dropdown
        label="Classroom"
        options={classrooms}
        value={classroom}
        onChange={setClassroom}
      />
      <Dropdown
        label="Subject"
        options={subjects}
        value={subject}
        onChange={setSubject}
      />
      
      <button
        onClick={handleSubmit}
        style={buttonStyle}
        onMouseOver={() => setButtonStyle(buttonHoverStyle)}
        onMouseOut={() => setButtonStyle(buttonStyle)}
      >
        Connect
      </button>
    </div>
  );
};

export default Dropdowns;




