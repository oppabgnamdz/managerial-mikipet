import React, { useState, useEffect } from 'react';
import './style.scss';
export default function Index() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit');
  };
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="form">
        <h1>Log in</h1>
        <div className="login-account">
          <label for="account">Account</label>
          <input
            type="text"
            id="account"
            name="firstname"
            placeholder="Enter your account"
          ></input>
        </div>
        <div className="login-password">
          <label for="account">Password</label>
          <input
            type="password"
            id="account"
            name="firstname"
            placeholder="Enter your account"
          ></input>
        </div>
      </form>
    </div>
  );
}
