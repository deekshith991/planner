// LoginPage.jsx
import React from 'react';
import LoginForm from '../Sections/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex fle items-center justify-center h-screen bg-gray-100 m-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-full p-6">

        <div className="bg-gray-300 p-4 rounded-lg shadow-lg flex items-center justify-center"><LoginForm /></div>
        <div className="bg-blue-500 p-4 rounded-lg shadow-lg flex items-center justify-center">x</div>
        {/* <div className="bg-green-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 3</div> */}
        {/* <div className="bg-yellow-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 4</div> */}
        {/* <div className="bg-purple-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 5</div> */}
        {/* <div className="bg-pink-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 6</div> */}
        {/* <div className="bg-indigo-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 7</div> */}
        {/* <div className="bg-teal-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 8</div> */}
        {/* <div className="bg-orange-500 p-4 rounded-lg shadow-lg flex items-center justify-center">Box 9</div> */}
      </div>
    </div>
  );
};

export default LoginPage;

