import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, } from 'react-router-dom';

function Student() {
    const [student, setStudent] = useState([]);

    useEffect(()=> {
        axios.get("http://localhost:5000/register")
        .then(res => setStudent(res.data))
        .catch(err => console.log(err));
    }, [])

    const handlDelete = async(id) =>{
        try{
            await axios.delete("http://localhost:5000/register/" +id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div>
        <div className='items-center flex justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500'>
        <div className='bg-white p-6 rounded-md '>
            <Link to ="/create" className='bg-green-400 p-2 rounded font-semibold text-lg px-3 justify-center flex mb-6'>Register</Link>
            <table className='table-auto border text-sm'>
                <thead>
                    <tr>
                    <th className="border px-10 py-2">Name</th>
                    <th className="border px-10 py-2">Email</th>
                    <th className="border px-10 py-2">Role</th>
                    <th className="border px-10 py-2">Action</th>
                    <th className="border px-10 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {student.map((data, i)=>(
                        <tr key={i}>
                            <td className="border px-10 py-2">{data.name}</td>
                            <td className="border px-10 py-2">{data.email}</td>
                            <td className="border px-10 py-2">{data.role}</td>
                            <td className="border px-10 py-2 space-x-2">
                                <Link to={`/update/${data.id}`} className='rounded p-1 bg-red-500'>Update</Link>
                                <button className='rounded p-1 border bg-green-500' onClick={e=> handlDelete(data.ID)}>Delete</button>
                            </td>
                            <td className="border px-10 py-2">{data.status}</td>
                        </tr>
                        ))}
                </tbody>
            </table>

        </div>
        </div>
    </div>
  )
}

export default Student