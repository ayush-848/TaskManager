import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/errorHandle';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [id, setId] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    handleSuccess('Logged out successfully');
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const fetchId = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/id`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();

      if (Array.isArray(result)) {
        setId(result);
      } else {
        handleError('Unexpected API response');
      }
    } catch (error) {
      handleError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchId();
  }, []);

  return (
    <div>
      <h1>{loggedInUser ? `Welcome, ${loggedInUser}!` : 'Welcome, Guest!'}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {id.length > 0 ? (
          id.map((item) => (
            <ul key={item.roll}>
                {item.name}: {item.roll}
            </ul>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
