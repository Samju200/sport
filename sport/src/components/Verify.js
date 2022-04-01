import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Verify() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { id, email, token } = useParams();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if ((user.email = email)) {
      user.isVerify = true;
    } else {
      alert('email not found');
    }
  }, [user, email]);
  return (
    <div>
      <h1>Verify</h1>
    </div>
  );
}

export default Verify;
