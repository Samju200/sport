import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

function ResendVerification() {
  const [validUrl, setValidUrl] = useState([]);
  //   const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const resendVerifyEmail = async () => {
      try {
        const url = `/users/${user._id}/resend`;
        const { data } = await axios.post(url);
        console.log(data);
        setValidUrl(data);
      } catch (error) {
        console.log(error);
      }
    };
    resendVerifyEmail();
  }, [user]);

  return <div>ResendVerification</div>;
}

export default ResendVerification;
