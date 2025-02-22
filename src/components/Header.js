import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import {LOGO} from "../utils/constants"

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        
      })
      .catch((error) => {
       
      });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
          
        );
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });
    return ()=>unSubscribe()
  }, []);
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full display flex justify-between">
      <img
        src={LOGO}
        alt="logo"
        className="w-44"
      />
      {user && (
        <div className="display flex ml-auto m-3">
          <img
            src={user.photoURL}
            alt="user-icon"
            className="w-10 h-10 rounded-md p-1"
          />
          <button
            className="h-8 w-[100px]  bg-gray-600 rounded-md hover:bg-red-600 m-2 mt-1 text-white flex items-center justify-center text-sm font-semibold "
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
