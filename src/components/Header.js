import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';


const Header = () => {


const navigate = useNavigate()
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      navigate("/")
     
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
    
  }
  return (
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full display flex justify-between'>
       <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" className='w-44'/>
    
    <div className='display flex p-2'>
      <img src="https://cdn.vectorstock.com/i/1000v/74/41/white-user-icon-vector-42797441.jpg" alt="user-icon" className='w-10 h-10 rounded-full m-2'/>
      <button className='bg-gray-500 h-10 p-2 rounded-md m-2 hover:bg-red-600 ' onClick={handleSignOut}>Sign Out</button>
    </div>
    
    
    </div>

  )
}

export default Header