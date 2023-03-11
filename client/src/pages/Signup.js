import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup(props) {
  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Get Started!</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row flex-end">
          <button type="submit">I'm looking for volunteers</button>
        </div>
        <div className="flex-row flex-end">
          <button type="submit">I'm want to help</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
