import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>DASHBOARD</h1>

      <p>{user.username} WELCOME TO YOUR BEST SPORT SITE</p>
      <Link to="/profile"> Profile</Link>
    </div>
  );
}

export default Dashboard;
