// LoginForm.jsx
import React from 'react';

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login form submitted");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>UserName: </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

