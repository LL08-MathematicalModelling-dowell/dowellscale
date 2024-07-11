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
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const classrooms = ['Classroom 1', 'Classroom 2', 'Classroom 3', 'Classroom 4', 'Classroom 5'];
  const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'];

  useEffect(() => {
    if (classroom) {
      const selectedClassroomNumber = classrooms.indexOf(classroom) + 1;
      setChannel(`channel_${selectedClassroomNumber}`);
      checkSubmitButton();
    } else {
      setChannel('');
      setSubmitEnabled(false);
    }
  }, [classroom]);

  useEffect(() => {
    if (subject) {
      const selectedSubjectNumber = subjects.indexOf(subject) + 1;
      setInstance(`instance_${selectedSubjectNumber}`);
      checkSubmitButton();
    } else {
      setInstance('');
      setSubmitEnabled(false);
    }
  }, [subject]);

  const checkSubmitButton = () => {
    if (classroom && subject) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  };

  const handleSubmit = () => {
    if (channel && instance) {
      const url = `https://www.uxlive.me/dowellscale/samanta-edu/?workspace_id=66879a901c299b49c227088b&username=samantaeducation&channel=${channel}&instance=${instance}&scale_id=6687e18aa74d1fcdca15fde3`;
      window.open(url, '_blank');
    } else {
      alert('Please select both Classroom and Subject before submitting.');
    }
  };

  const handleRefresh = () => {
    setClassroom('');
    setSubject('');
    setChannel('');
    setInstance('');
    setSubmitEnabled(false);
  };

  const containerStyle = {
    textAlign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  };

  const logoStyle = {
    marginBottom: '20px',
    maxWidth: '100%',
    height: 'auto',
    width: '300px', 
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const headerStyle = {
    marginBottom: '20px',
    color: '#333',
    fontSize: '24px',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '10px',
  };

  const submitButtonEnabledStyle = {
    ...buttonStyle,
    backgroundColor: '#4CAF50',
  };

  const submitButtonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: '#cccccc', 
    cursor: 'not-allowed',
  };

  const refreshButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f44336', 
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
      {channel && <p>Selected Channel: {channel}</p>}
      {instance && <p>Selected Instance: {instance}</p>}
      <button
        onClick={handleSubmit}
        style={submitEnabled ? submitButtonEnabledStyle : submitButtonDisabledStyle}
        disabled={!submitEnabled}
      >
        Submit
      </button>
      <button
        onClick={handleRefresh}
        style={refreshButtonStyle}
      >
        Refresh
      </button>
    </div>
  );
};

export default Dropdowns;
