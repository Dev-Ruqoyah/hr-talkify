import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doSignInWithGoogle } from "../../firebase/auth";
import { Navigate } from "react-router-dom";


const Login = () => {
   const {userLoggedIn} = useAuth()
   const[isSigningIn,setIsSigninigIn] = useState(false)
   const onSubmit = () =>{
    if(!isSigningIn){
        setIsSigninigIn(true)
        doSignInWithGoogle()
    }
   }
    
   return (<>
   {userLoggedIn && (<Navigate to={"/chat"} replace={true}/>)}
         <div className="flex items-center justify-center h-screen bg-slate-300">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Recipe AI</h1>
        <p className="text-gray-600 mb-6">
          Sign in to start generating amazing recipes based on your ingredients.
        </p>
        <button onClick={onSubmit}
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.3 2.2 29.9 0 24 0 14.7 0 6.9 5.3 3 13l7.9 6.2c1.9-5.6 7.2-9.7 13.1-9.7z"
            />
            <path
              fill="#4285F4"
              d="M46.4 24.5c0-1.5-.1-3-.4-4.5H24v8.5h12.5c-.6 3.2-2.5 5.9-5.3 7.8l7.9 6.2c4.6-4.2 7.3-10.5 7.3-18z"
            />
            <path
              fill="#FBBC05"
              d="M10.9 26.8c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8L3 13c-1.6 3.2-2.5 6.7-2.5 10.5S1.4 31.3 3 34.5l7.9-6.2z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.5 0 11.9-2.2 15.8-5.9l-7.9-6.2c-2.2 1.5-5 2.4-7.9 2.4-5.9 0-11.1-4.1-13.1-9.7L3 34.5C7 42.7 14.7 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
   </>
   
  );
};

export default Login;
