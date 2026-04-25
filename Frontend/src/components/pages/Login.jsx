import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from "../../api/axios";

const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(true); // true = login, false = register

  const registerUser = (data) => API.post("/auth/register", data);
  const loginUser = (data) => API.post("/auth/login", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      if (!user) {
        const username = e.target.username.value;
          const res = await registerUser({ username, email, password });
          console.log("Register Success:", res.data);
         
        } else {
          const res = await loginUser({ email, password });
          console.log("Login Success:", res.data);
        }


      navigate('/dashboard');

    } catch (err) {
       if (err.response?.status === 409) {
    alert("Already registered! Please login.");}
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center mt-4">
          {user ? "Login" : "Register"}
        </h1>

        <form
          className="flex flex-col items-center gap-4 mt-6"
          onSubmit={handleSubmit}
        >

          {!user && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border border-gray-500 rounded-md px-4 py-2 w-64"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-500 rounded-md px-4 py-2 w-64"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-500 rounded-md px-4 py-2 w-64"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600"
          >
            {user ? "Login" : "Register"}
          </button>

        </form>

        <p className="mt-4 text-center">
          {user ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-red-600 cursor-pointer ml-1"
            onClick={() => setUser(!user)}
          >
            {user ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;