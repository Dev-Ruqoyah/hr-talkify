import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-orange-100 to-orange-50 p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-orange-600 text-6xl">🍳</div>
        <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
        <p className="text-lg text-gray-600 max-w-md">
          It looks like you've wandered off the recipe book. Don’t worry, let’s 
          get you back to discovering delicious recipes!
        </p>
        <Link to="/">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
            ← Go Back Home
          </button>
        </Link>
      </div>
      {/* <div className="mt-8">
        <img 
          src="https://via.placeholder.com/400x300" 
          alt="404 illustration" 
          className="rounded-lg shadow-md"
        />
      </div> */}
    </div>
  );
};

export default NotFoundPage;
