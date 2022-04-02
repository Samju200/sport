import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Verify from './Verify';
import { verification } from '../features/auth/tokenSlice';
import axios from 'axios';

function Verification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { user } = useSelector((state) => state.auth);
  // const { token } = useSelector((state) => state.token);
  const [validUrl, setValidUrl] = useState(false);
  // const resendVerify = () => {
  //   if (user) {
  //     alert('Your Account is verify');
  //     navigate('/login');
  //   } else {
  //     dispatch(resendVerification(id));
  //   }
  // };
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const url = `/users/confirmation${id}/${token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmail();
  }, [id, token]);
  return (
    <>
      <div className="verification">
        <h1>Verification</h1>

        <div>
          {validUrl ? (
            <div>
              {' '}
              <h1> Email verified Successfully</h1>
              <Link to="/login">
                {' '}
                <button> Login</button>
              </Link>{' '}
            </div>
          ) : (
            <h1> 404 not found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Verification;
