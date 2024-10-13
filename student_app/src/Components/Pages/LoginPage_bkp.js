
import LoginForm from "../Sections/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      {/* <h1 className="text-black text-center w-full text-3xl mb-6 text-emerald-600">Login</h1> */}
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-5xl font-bold text-center mb-6 drop-shadow-lg transform transition duration-300 hover:scale-105">
        Login
      </h1>

      <LoginForm />
    </div>
  );
};

export default LoginPage;

