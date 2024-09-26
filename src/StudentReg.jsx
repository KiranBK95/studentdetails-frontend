import React, { useState} from 'react';
import axios from 'axios';
import './StudentReg.css';


const StudentReg = () => {
  //This part is to handle State for form data
  const [student, setStudent] = useState({ name: '', email: '', academicYear: '' });
  
  //This part is for handling State for response message, which comes after form submission
  const [responseMessage, setResponseMessage] = useState('');

  // This part here is to andle input changes for the fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // to andle the form posting
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // since we're not using any login, just to make it bit secure we can use api token first before sending the form data, 
    //   so thi block is to Fetch token first, which is initialised as soon as the form is loaded
      const tokenRes = await axios.get('https://localhost:7055/api/Auth/token');
      const token = tokenRes.data.token;

      // when for gets submitted it will post form data to API
      const res = await axios.post(
        'https://localhost:7055/api/UserDetails',
        student,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // this where we're passing the initially fetched token for authentication
          },
        }
      );

      // Set the success message, from the fron end itself --> not from api (just in case)
      setResponseMessage(res.data.message || 'Form submitted successfully!');

    } catch (error) {
      // Setting the error message
      setResponseMessage(error.response?.data?.message || 'An error occurred!');
    }
  };

  return (
    <div className="App">
      <h2>Register Fleximake User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Academic Year: </label>
          <input
            type="date"
            name="academicYear"
            value={student.academicYear}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* Display response message here once obtained after form submission */}
      {responseMessage && <p style={{ marginTop: '20px' }}>{responseMessage}</p>}
    </div>
  );
};

export default StudentReg;
