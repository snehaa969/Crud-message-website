import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginValidation from './LoginValidation';
import axios from 'axios'

function Login() {
    const[values, setValues] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event)=>{
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(LoginValidation(values))
        if(errors.email === "" && errors.password === ""){
            axios.post("http://localhost:8081/login", values)
            .then(res => {
                console.log(res);
                
             if(res.data === "Success"){
                axios.put("http://localhost:5000/status", values)
                .then(res=>{
                    console.log("Status is updated");
                })
                navigate('/student');
             }else{
                alert("No record existed");
             }
          })
            .catch(err => console.log(err));
          }
    }
  return (
    <div className='items-center flex justify-center h-screen bg-blue-500'>
        <div className='bg-white p-6 rounded-md '>
            <h2 className='font-semibold text-3xl mb-6 flex justify-center'>SignIn</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-4 flex space-x-3'>
                <label htmlFor='email' className='font-semibold text-lg'>Email</label>
                <input type='email' placeholder='Enter Email' name='email' onChange={handleInput} className='border-2 rounded p-1'/>
                {errors.email && <span className='text-red-600'> {errors.email}</span>}
            </div>
            <div className='mb-4 flex space-x-3'>
                <label htmlFor='password' className='font-semibold text-lg'>Password</label>
                <input type='password' name='password' placeholder='Enter Password' onChange={handleInput} className='border-2 rounded p-1'/>
                {errors.password && <span className='text-red-600'> {errors.password}</span>}
            </div>
            <button type='submit' className='bg-green-400 p-2 rounded font-semibold text-lg px-3 w-full mb-6'>Login</button>
            <p className='font-semibold mb-4'>You are agree to our term and conditions</p>
            <Link to="/signup" className='border p-2 rounded font-semibold w-full bg-gray-300'>Create Account</Link>
        </form>
        </div>
    </div>
  )
}

export default Login