import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put("http://localhost:5000/update/"+id, {name, email})
        .then(res => {
            console.log(res);
            navigate('/student');
        }).catch(err=> console.log(err));
    }
  return (
    <div className='items-center flex justify-center h-screen bg-blue-500'>
    <div className='bg-white p-6 rounded-md '>
        <form onSubmit={handleSubmit}>
            <h2 className='font-semibold text-lg mb-4'>Update Student</h2>
            <div className='mb-4 flex space-x-3'>
                <label htmlFor='name' className='font-semibold text-lg'>Name</label>
                <input type='text' name='name'
            onChange={e => setName(e.target.value)} placeholder='Enter Name' className='border-2 rounded p-1'/>
            </div>
            <div className='mb-4 flex space-x-3'>
                <label htmlFor='name' className='font-semibold text-lg'>Email</label>
                <input type='text' name='name'
            onChange={e => setEmail(e.target.value)} placeholder='Enter Name' className='border-2 rounded p-1'/>
            </div>
            <div className='mb-4 flex space-x-3'>
                <label htmlFor='role' className='font-semibold text-lg'>Role</label>
                <input type='text' name='role'
            onChange={e => setEmail(e.target.value)} placeholder='Enter Name' className='border-2 rounded p-1'/>
            </div>
            <button type='submit' className='border p-2 rounded font-semibold w-full bg-gray-300 mb-6'>Update</button>
        </form>
    </div>
    </div>                  
  )
}

export default UpdateStudent;