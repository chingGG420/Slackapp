import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer, FormLayout } from '../styles';
import usePost from '../hooks/usePost';
import { toast } from 'react-toastify'; // Import the toast module
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import logoPath from '../../assets/BRLogo1.png';

export default function Signup() {
	const [userInfo, setUserInfo] = useState({
	  email: '',
	  password: '',
	  password_confirmation: '',
	});
	const [errorMessage, setErrorMessage] = useState([]);
	const { res, errors, handleSubmit } = usePost('http://206.189.91.54/api/v1/auth', userInfo);
  
	const navigate = useNavigate();
  
	const handleChange = e => {
	  setErrorMessage([]);
	  const key = e.target.id;
	  const value = e.target.value;
	  setUserInfo({
		...userInfo,
		[key]: value,
	  });
	};
  
	useEffect(() => {
	  if (res?.data?.status === 'success') {
		toast.success('Sign up successful!');
		navigate('/');
	  }
	  if (errors.full_messages && errors.full_messages.length > 0) {
		toast.error('Please fill out the form correctly.');
	  }
	  setErrorMessage(errors.full_messages);
	}, [res, errors, navigate]);

	return (
		<FormLayout>
			<FormContainer>
				<img src={logoPath} alt="Logo" />
				<h1>BackRooms</h1>
				<p>
					Create an account to enter
				</p>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							type="email"
							id="email"
							aria-label="Email"
							aria-required="true"
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
							aria-required="true"
							placeholder="Password"
							value={userInfo.password}
							onChange={handleChange}
						/>
					</div>
					<div>
						<input
							type="password"
							id="password_confirmation"
							aria-label="Password Confirmation"
							aria-required="true"
							placeholder="Password Confirmation"
							value={userInfo.password_confirmation}
							onChange={handleChange}
						/>
					</div>
					<button type="submit">Sign Up</button>
				</form>
				<Link to="/">Already have an account? Login</Link>
			</FormContainer>
		</FormLayout>
	);
}
