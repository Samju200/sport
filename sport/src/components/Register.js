import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from './Spinner';
// import { verification } from '../features/auth/tokenSlice';
// import { getToken } from '../../../backend/controllers/user';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
    interest: '',
  });

  const { email, password, phoneNumber, username, interest } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // const { token } = useSelector((state) => state.token);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // if (user.isVerify) {
    //   navigate('/dashboard');
    // } else {
    //   navigate('/verification');
    // }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e, id) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      phoneNumber,
      username,
      interest,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isSuccess || user) {
    navigate('/verification');
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone Number"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="interest"
              name="interest"
              value={interest}
              placeholder="Interest"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <div>
          <p className="verify">
            if you have Register ,<Link to="/login"> Login</Link> and resend
            verification link, if your account is not verify or check your email
            for confirmation of your verification{' '}
            <Link to="/verification">click</Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Register;
