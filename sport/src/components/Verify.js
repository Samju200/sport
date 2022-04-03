import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Verify() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { id, email, token } = useParams();

  // useEffect(() => {
  //   if ((user.email = email)) {
  //     user.isVerify = true;
  //   } else {
  //     alert('email not found');
  //   }
  // }, [user, email]);
  return (
    <div>
      <h1>Verify</h1>
      <p className="verify">
        if you have verify your account , <Link to="/login"> login</Link> check
        your email for confirmation of your registration,
        <Link to="/users/:id/resend">click</Link> here for confirmation link
        again
      </p>
    </div>
  );
}

export default Verify;
