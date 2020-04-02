import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import url from '../../config/url';

export default (props) => {

	const [useremailMessage, setUseremailMessage] = useState('');
	const [userPasswordMessage, setUserPasswordMessage] = useState('');
	const [userSubmitMessage, setUserSubmitMessage] = useState('');
	const [registrationData, setRegistrationData] = useState({
		username: '',
		password: '',
		email: '',
		fname: '',
		lname: ''
	});

	console.log('register props - ', props);
	const OnChangeLoginHandler = (e) => {
		setRegistrationData({
			...registrationData,
			[e.target.name]: e.target.value
		})
	}
	const OnSubmitHandler = (e) => {
		e.preventDefault();
		let data = registrationData;
		if (data.password.length < 8) {
			setUserPasswordMessage('Password length should be minimum 8 characters');
			setUserSubmitMessage('');
		}
		else {
			axios.post(url.backendURL + url.paths.register, data)
				.then((res) => {
					if (res.data.submitSuccess) {
						setUserSubmitMessage('SignUp successful click below to login');
						setUseremailMessage('');
						setUserPasswordMessage('');
					} else if (res.data.user_already_exist) {
						setUserSubmitMessage('SignUp falied');
						setUseremailMessage('User account already exists on entered email address');
						setUserPasswordMessage('');
					}
					console.log('register.js axois response', res.data);
				})
				.catch((err) => {
					console.error('register.js axios_error - ' + err);
				});
		}
	}
	return (
		<div className="container">
			<div className="content">
				<div className="content_rgt">
					<div className="register_sec">
						<h1>Create An Account</h1>
						<ul>
							<form onSubmit={OnSubmitHandler}>
								<li>
									<span>Username</span>
									<input type="text" placeholder="Enter your username" onChange={OnChangeLoginHandler} name='username' required />
								</li>
								<li><span>Password</span><input type="text" placeholder="Enter your password" onChange={OnChangeLoginHandler} name='password' required /></li>
								<strong style={{ color: 'tomato' }}>{userPasswordMessage}</strong>
								<li><span>Email</span><input type="text" placeholder="Enter your email" onChange={OnChangeLoginHandler} name='email' required /></li>
								<strong style={{ color: 'tomato' }}>{useremailMessage}</strong>
								<li><span>First Name</span><input type="text" placeholder="Enter your first name" onChange={OnChangeLoginHandler} name='fname' required /></li>
								<li><span>Last Name</span><input type="text" placeholder="Enter your last name" onChange={OnChangeLoginHandler} name='lname' required /></li>

								<li><input type="submit" defaultValue="Register" /></li>
							</form>
						</ul>
						<strong style={{ color: 'tomato' }}>{userSubmitMessage}</strong>
						<div className="addtnal_acnt">I already have an account.<Link to='/login'>Login My Account !</Link></div>
					</div>
				</div>
				<div className="content_lft">
					<h1>Welcome from PPL!</h1>
					<p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
					<img src="images/img_9.png" alt="" /> </div>
			</div>
		</div>
	);

}