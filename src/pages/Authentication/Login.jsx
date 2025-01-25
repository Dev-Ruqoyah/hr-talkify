import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doCreateUserEmailAndPassword, doSignInWithGoogle } from "../../firebase/auth";
import { Navigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 or more characters"),
  });

  const onSubmitGoogle = async () => {
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await doSignInWithGoogle();
      } catch (error) {
        console.error(error);
        toast.error("Google sign-in failed. Please try again.");
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/chat"} replace={true} />}
      <div className="flex items-center justify-center h-screen bg-slate-300">
        <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md ">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Welcome to Recipe AI
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Sign in to start generating amazing recipes based on your
            ingredients.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (!isSigningIn) {
                  setIsSigningIn(true);
                  await doCreateUserEmailAndPassword(values.email, values.password);
                  toast.success("Sign-in successful!");
                }
              } catch (error) {
                console.error(error);
                toast.error("Error signing in. Please try again.");
              } finally {
                setIsSigningIn(false);
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && touched.email && (
                    <small className="text-red-600">{errors.email}</small>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors.password && touched.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && touched.password && (
                    <small className="text-red-600">{errors.password}</small>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 transition duration-200"
                  disabled={isSubmitting || isSigningIn}
                >
                  {isSubmitting || isSigningIn ? "Signing Up..." : "Sign up with Email"}
                </button>
              </form>
            )}
          </Formik>

          <p className="text-center mb-3">or</p>

          {/* Google Sign-In Button */}
          <button
            onClick={onSubmitGoogle}
            className="flex items-center justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded-md shadow-md  transition duration-200"
            disabled={isSigningIn}
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
