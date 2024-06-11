"use client";

import { useState } from 'react';
import { login } from '../services/api';

const LoginForm = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await login(email, password);
      console.log(data.status)
      if(data.status != 400){
        console.log(data.access_token)
        onLogin(data.access_token);
      }else{
        alert(data.message)
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12 m-auto">
          <h1 className='mt-5'>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
