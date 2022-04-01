import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Verify from './Verify';

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.token);
  const resendVerification = () => {
    if (user.isVerified) {
      alert('Your Account is verify');
      navigate('/login');
    } else {
      dispatch(resendVerification(user._id));
    }
  };
  useEffect(() => {
    if (!user.isVerified) {
      <Link to={`/confirmation/${user.email}/${token.token}`}>
        <Verify />
      </Link>;
    }
  }, []);
  return (
    <div className="verification">
      <h1>Verification</h1>

      <div>
        <p className="verify">
          if you have not Register , Register <Link to="/register"> here</Link>{' '}
          and resend verification link, if your account is not verify or check
          your email for confirmation of your verification{' '}
          <Link to={resendVerification}>click</Link>
        </p>
      </div>
    </div>
  );
}

export default Verification;
