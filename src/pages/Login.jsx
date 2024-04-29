import React from 'react';
import Login from '../components/Login';

const LoginPage = () => {
  const handleSubmit = (username, password) => {
    console.log('Submitting login with:', { username, password });
  };
  
  return (
    <div>
      <Login onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
