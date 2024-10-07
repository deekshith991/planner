import { useState } from "react";

const LoginForm = () => {
  const [user, setUser] = useState({
    UserID: "",
    Passwd: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(user); // Handle login logic here
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-11/12 max-w-lg p-6 bg-gray-200 rounded-lg">
        <form onSubmit={handleSubmit} className="bg-red-50 p-4 rounded-md flex flex-col space-y-6">

          {/* Username Field */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="UserID"
              className="flex-shrink-0 w-[30%] text-sm font-semibold self-center break-words"
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
          <div className="flex items-center space-x-4">
            <label
              htmlFor="Passwd"
              className="flex-shrink-0 w-[30%] text-sm font-semibold self-center break-words"
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

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition duration-300"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;

