import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const resendVerification = (id) => {
    if (user.isVerified) {
      alert('Your Account is verify');
      navigate('dashbord');
    } else {
      dispatch(resendVerification(id));
    }
  };
  //   useEffect(() => {
  //      if(!user.isVerified){

  //      }
  //   }, [input])
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
