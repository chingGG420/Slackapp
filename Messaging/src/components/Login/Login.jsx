import React, { useState, useContext, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormContainer, FormLayout, Errors } from '../styles';
import { UserContext } from '../../contexts/User';
import usePost from '../hooks/usePost';
import logoPath from '../../assets/BRLogo1.png';

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState([]);
  const { res, errors, handleSubmit } = usePost(
    'http://206.189.91.54/api/v1/auth/sign_in',
    userInfo
  );
  const { user, handleLogin } = useContext(UserContext);

  const handleChange = (e) => {
    setErrorMessage([]);
    const key = e.target.id;
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  useEffect(() => {
    if (res?.data && res?.headers) {
      const {
        data: {
          data: { email, uid },
        },
        headers: { 'access-token': accessToken, client, expiry },
      } = res;
      handleLogin(uid, accessToken, client, email, expiry);
      toast.success('Login successful!');
    } else if (errors && errors.length > 0) {
      toast.error(errors.join(', '));
    }

    setErrorMessage(errors);
  }, [res, errors, handleLogin]);

  if (user?.isLoggedIn) {
    return <Navigate to="/app" />;
  }

  return (
    <FormLayout>
      <ToastContainer />
      <FormContainer>
        <img src={logoPath} alt="LogoImage" />
        <h1>BackRooms</h1>
        <p>
          Enter your <span>email</span> and <span>password</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              aria-label="Email"
              placeholder="Email"
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              aria-label="Password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <Link to="/signup">Create an account</Link>
      </FormContainer>
    </FormLayout>
  );
}
