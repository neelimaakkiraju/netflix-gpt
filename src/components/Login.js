import React from "react";
import Header from "./Header";
import { useState,useRef} from "react";
import { checkIsValid } from "../utils/validate";
import { createUserWithEmailAndPassword ,  signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [errorMsg,setErrMsg]= useState(null)
  const navigate = useNavigate()
  const email = useRef(null)
  const password = useRef(null)

  const handleForm = () => {
    setIsSignIn(!isSignin);
  };
  const handleSubmit =()=>{
   const message = checkIsValid(email.current.value,password.current.value)
   setErrMsg(message)
   if(errorMsg)return
   if(!isSignin){
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrMsg(errorCode+"-"+errorMessage)
    
  });

   }else{
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
     
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrMsg(errorCode + "-"+errorMessage)

  });
    
   }
  }
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_small.jpg"
          alt="logo"
        />
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className="absolute bg-black w-4/12 my-16 mx-auto left-0 right-0 rounded-lg p-12 text-white bg-opacity-80">
        <h1 className="text-3xl  font-bold py-4">
          {!isSignin ? "Sign Up" : "Sign In"}
        </h1>
        {!isSignin && (
          <input
            required
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full rounded-sm bg-gray-600"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 my-2 w-full rounded-sm bg-gray-600"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-2 my-2 w-full rounded-sm bg-gray-600"
        />
        <p className="text-red-700 font-bold">
          {errorMsg}
        </p>
        <button className="p-3 my-4 bg-red-600 w-full rounded-md font-bold" onClick={handleSubmit}>
          {!isSignin ? "Sign Up" : "Sign In"}
        </button>
        <p onClick={handleForm} className="p-1 my-2">
          {!isSignin ? (
            <>
              Already Registered?{" "}
              <span className="text-blue-500 underline cursor-pointer">SignIn</span> Now
            </>
          ) : (
            <>
              New to Netflix?{" "}
              <span className="text-blue-500 underline cursor-pointer">SignUp</span> Now
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
