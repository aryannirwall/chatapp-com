import axios from 'axios';
import React, { useState } from 'react'
import{ Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    const [userInput, setuserInput] = usestate({});
    const [loading , setLoading] = usesate(false)
    const handleInput=(e)=>{
        setuserInput({
            ...userInput,[e.target.id]:e.target.value
        })
    }
    console.log(userInput)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const login = await axios.post(`/api/auth/login`,userInput);
            const data = login.data;
            if(data.success === false){
                setLoading(false)
                console.log(data.message);
            }
            toast.success(data.message)
            localStorage.setitem('chatapp',JSON.stringify(data))
            setLoading(false)
            navigate('/')
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center mix-w-full mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-lg
             bg-gray-400 bg-clip-padding 
             backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-bond text-center text-gray-300'>Login
                    <span className='text-gray-950'> Chatters </span>
                    </h1>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <div>
                            <label className='label p-2'>
                                <span className='font-bold text-gray-950 text-xl label-text'>Email :</span>
                            </label>
                            <input 
                            id='email'
                                type='email'
                                placeholder='Enter your email'
                                required
                                className='w-full input input-boardered h-10' />
                        </div>
                        <div>
                        <label className='label p-2'>
                                <span className='font-bold text-gray-950 text-xl label-text'>Password :</span>
                            </label>
                            
                            <input
                             id='password'
                                type='Password'
                                placeholder='Enter your password'
                                required
                                className='w-full input input-boardered h-10' />

                        </div>
                        <button type='submit' 
                        className='mt-4 self-center w-auto px-2 py-1 bg-gray-950 text-lg text white rounded-lg'>
                            {loading ? "loading..":"Login"}
                            </button>
                    </form>
                    <div className='pt-2'>
                        <p className='text-sm font-semibold
                        text-gray-800'>
                            Dont have an Account ? <Link to={'/register'}>
                                <span
                            className=' text-gray-950 font-bold underline cursor-pointer hover:text-green-950'>
                                Register Now!!</span></Link>
                        </p>
                    </div>
                
            </div>
        </div>
    )
}

export default Login  