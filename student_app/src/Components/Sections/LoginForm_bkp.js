import React, { useState } from "react";
import AuthService from "../Services/AuthService";
import { useAuth } from "../Services/AuthProvider";

const LoginForm = () => {

  const { setToken, setUserID } = useAuth();

  const [user, setUser] = useState({
    UserID: "",
    Passwd: ""
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    setErrorMessage(''); // Clear previous errors

    try {
      const data = await AuthService.login(user.UserID, user.Passwd); // Use AuthService to handle login
      console.log('Login successful, token:', data.token);
      setToken(data.token);
      setUserID(user.UserID);
      // Handle successful login (e.g., store token, redirect, etc.)
      //
      // useTokenRedirect("/planner");
    } catch (error) {
      setErrorMessage(error.message); // Extract and display the error message string
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center px-4 sm:px-0">
      <div className="w-full max-w-md p-6 bg-gray-200 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="bg-red-50 p-4 rounded-md flex flex-col space-y-6">

          {/* Username Field */}
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
            <label
              htmlFor="UserID"
              className="flex-shrink-0 w-full sm:w-[30%] text-sm font-semibold self-center"
            >
              Username:
            </label>
            <input
              className="flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
              id="UserID"
              name="UserID"
              type="text"
              onChange={handleChange}
              value={user.UserID}
              placeholder="Enter your User ID"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
            <label
              htmlFor="Passwd"
              className="flex-shrink-0 w-full sm:w-[30%] text-sm font-semibold self-center"
            >
              Password:
            </label>
            <input
              className="flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
              id="Passwd"
              name="Passwd"
              type="password"
              onChange={handleChange}
              value={user.Passwd}
              placeholder="Enter your Password"
              required
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;

