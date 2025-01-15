import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupValidation from './SignupValidation';
import axios from 'axios';

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value })); // Fix: Store values as strings
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Values before validation:", values);
    const validationErrors = SignupValidation(values);
    setErrors(validationErrors);

    // Only proceed if there are no validation errors
    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      axios.post("http://localhost:8081/signup", values)
        .then(res => {
          navigate('/'); // Navigate to login page on successful signup
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='items-center flex justify-center h-screen bg-blue-500'>
      <div className='bg-white p-6 rounded-md'>
        <h2 className='font-semibold text-3xl mb-6 flex justify-center'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4 flex space-x-3'>
            <label htmlFor='name' className='font-semibold text-lg'>Name</label>
            <input
              type='text'
              name='name'
              onChange={handleInput}
              placeholder='Enter Name'
              className='border-2 rounded p-1'
            />
            {errors.name && <span className='text-red-600'>{errors.name}</span>}
          </div>
          <div className='mb-4 flex space-x-3'>
            <label htmlFor='email' className='font-semibold text-lg'>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Enter Email'
              onChange={handleInput}
              className='border-2 rounded p-1'
            />
            {errors.email && <span className='text-red-600'>{errors.email}</span>}
          </div>
          <div className='mb-4 flex space-x-3'>
            <label htmlFor='password' className='font-semibold text-lg'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Enter Password'
              onChange={handleInput}
              className='border-2 rounded p-1'
            />
            {errors.password && <span className='text-red-600'>{errors.password}</span>}
          </div>
          <button type='submit' className='bg-green-400 p-2 rounded font-semibold text-lg px-3 mb-2 w-full'>Signup</button>
          <p className='font-semibold mb-4'>You are agreeing to our terms and conditions</p>
          <Link to="/" className='border p-2 rounded font-semibold w-full bg-gray-300 mb-6'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
