"use client";

import LoginForm from './login/page'; 
import SignupForm from './signup/page';
import ProfileForm from './profile/page';
import MoviesList from './movies/page';
import { useAuth } from './context/AuthContext';
import { useState } from 'react';

const Home = () => {
  const { token, login, logout } = useAuth();
  const [categoryId, setCategoryId] = useState('');

  return (
    <div className="container">
      {!token ? (
        <>
          <LoginForm onLogin={login} />
          <SignupForm onSignUp={login} />
        </>
      ) : (
        <>
          <h1>Profile</h1>
          <ProfileForm token={token} />
          <hr />
          <MoviesList token={token} />
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        </>
      )}
    </div>
  );
};

export default Home;
