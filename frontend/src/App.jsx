import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import 'react-toastify/ReactToastify.css';
import RefreshHandler from '../src/utils/refreshHandler'

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuth(true);
    }
  }, []);

  // Private Route Handler
  const PrivateRoute = ({ element }) => {
    return isAuth ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      {/* Ensure RefreshHandler is functional */}
      <RefreshHandler setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Handle undefined routes */}
      </Routes>
    </div>
  );
};

export default App;
