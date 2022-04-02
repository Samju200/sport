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
      <p className="verify">
        if you have verify your account , <Link to="/register"> login</Link> and
        resend verification link, if your account is not yet verify or check
        your email for confirmation of your verification{' '}
        <Link to="/verification">click</Link>
      </p>
    </div>
  );
}

export default Verify;
