import React from 'react'
import Header from './Header'
import { useState } from 'react'

const Login = () => {

const [isSignin,setIsSignIn] = useState(true)
const handleForm = ()=>{
  setIsSignIn(!isSignin)
}
  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_small.jpg" alt="logo"/>
    </div>
    <form className='absolute bg-black w-4/12 my-36 mx-auto left-0 right-0 rounded-lg p-12 text-white bg-opacity-80'>
    <h1 className='text-3xl  font-bold py-4'>{!isSignin ? "Sign Up":"Sign In"}</h1>
      {!isSignin&&<input type='text' placeholder='Full Name' className='p-2 my-2 w-full rounded-sm bg-gray-600'/>}
      <input type='email' placeholder='Email' className='p-2 my-2 w-full rounded-sm bg-gray-600'/>
      <input type='password' placeholder='password' className='p-2 my-2 w-full rounded-sm bg-gray-600'/>
      <button className='p-3 my-4 bg-red-600 w-full rounded-md font-bold'>
      {!isSignin ? "Sign Up":"Sign In"}
      </button>
      <p onClick={handleForm} className='p-1 my-4 cursor-pointer'>New to Netflix? SignUp Now</p>
    </form>
    </div>

  )
}

export default Login