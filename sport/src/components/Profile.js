import React from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="profile">
      <h1>{user.username} Profile</h1>
      <p>Email: {user.email}</p>
      <p>Phone Number :{user.phoneNumber}</p>
      <p> Interest :{user.interest}</p>
    </div>
  );
}

export default Profile;
