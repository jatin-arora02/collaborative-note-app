import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { auth } from '../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error messages
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = async () => {
    setError(null); // Reset the error state before attempting registration
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(login(userCredential.user));  // Dispatch the login action
      navigate('/dashboard'); // Redirect to the dashboard after successful registration
    } catch (error) {
      console.error('Registration Error:', error);
      setError(error.message); // Set the error message to state
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-900 "> {/* Changed w-screen to w-full */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md overflow-hidden"> {/* Added overflow-hidden */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-gray-300 p-3 rounded-md w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
        >
          Register
        </button>

        {/* Link to Login page */}
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
