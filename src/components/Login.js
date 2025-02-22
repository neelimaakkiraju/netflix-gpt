import React from "react";
import Header from "./Header";
import { useState, useRef } from "react";
import { checkIsValid } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { BG_IMG_URL, USER_ICON } from "../utils/constants.js";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [errorMsg, setErrMsg] = useState(null);
 
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = () => {
    const message = checkIsValid(email.current.value, password.current.value);
    setErrMsg(message);
    if (errorMsg) return;
    if (!isSignin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:USER_ICON,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              
            })
            .catch((error) => {
              setErrMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorCode + "-" + errorMessage);
        });
    }
  };
  const handleForm = () => {
    setIsSignIn(!isSignin);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_IMG_URL}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-4/12 my-16 mx-auto left-0 right-0 rounded-lg p-12 text-white bg-opacity-80"
      >
        <h1 className="text-3xl  font-bold py-4">
          {!isSignin ? "Sign Up" : "Sign In"}
        </h1>
        {!isSignin && (
          <input
            ref={name}
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
        <p className="text-red-700 font-bold">{errorMsg}</p>
        <button
          className="p-3 my-4 bg-red-600 w-full rounded-md font-bold"
          onClick={handleSubmit}
        >
          {!isSignin ? "Sign Up" : "Sign In"}
        </button>
        <p onClick={handleForm} className="p-1 my-2">
          {!isSignin ? (
            <>
              Already Registered?{" "}
              <span className="text-blue-500 underline cursor-pointer">
                SignIn
              </span>{" "}
              Now
            </>
          ) : (
            <>
              New to Netflix?{" "}
              <span className="text-blue-500 underline cursor-pointer">
                SignUp
              </span>{" "}
              Now
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
