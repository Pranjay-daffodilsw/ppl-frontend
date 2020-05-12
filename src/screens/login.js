import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { update_user_data } from '../redux';
import url from '../config/url';

export default (
	(props) => {
		const [email, setEmail] = useState(null);
		const [password, setPassword] = useState(null);
		const [emailUserMessage, setEmailUserMessage] = useState('');
		const [passwordUserMessage, setPasswordUserMessage] = useState('');
		const dispatch = useDispatch();
		const history = useHistory();
		const OnChangeLoginHandler = (e) => {
			if (e.target.name === 'email') {
				setEmail(e.target.value);
			}
			else if (e.target.name === 'password') {
				setPassword(e.target.value);
			}
		}
		const OnSubmitHandler = (e) => {
			e.preventDefault();
			let data = {
				email: email,
				password: password
			};
			axios.post(url.backendURL + url.paths.loginUrl, data)
				.then((res) => {
					console.log('axois response in login -', res.data);
					if (res.data.loginSuccess) {
						console.log('login successful');
						localStorage.setItem('loginTrue', true);
						localStorage.setItem('user_id', res.data.userInfo.user_id);
						localStorage.setItem('username', res.data.userInfo.username);
						localStorage.setItem('fname', res.data.userInfo.fname);
						localStorage.setItem('lname', res.data.userInfo.lname);
						localStorage.setItem('email', res.data.userInfo.email);
						setPasswordUserMessage('');
						setEmailUserMessage('');
						// props.headerRefreshHandler();
						dispatch(update_user_data({
							loginStatus: {
								loginTrue: true
							}
						}));
						history.push('/timeline');
					}
					else if (res.data.emailMatch) {
						setEmailUserMessage('');
						setPasswordUserMessage('Incorrect Password is entered');
					}
					else {
						setEmailUserMessage('Entered email does not exist');
						setPasswordUserMessage('');
					}
				})
				.catch((err) => {
					console.log('axios_error - ' + err);
				});
		}


		return (
			<div>
				<div className="container">
					<div className="content">
						<div className="content_rgt">
							<div className="login_sec">
								<h1>Log In</h1>
								<form onSubmit={OnSubmitHandler}>
									<ul>
										<li key='email'><span>Email-ID</span><input type="email" onChange={OnChangeLoginHandler} placeholder="Enter your email" name='email' required /></li>
										<strong style={{ color: 'tomato' }}>{emailUserMessage}</strong>
										<li key='password'><span>Password</span><input type="password" onChange={OnChangeLoginHandler} placeholder="Enter your password" name='password' required /></li>
										<strong style={{ color: 'tomato' }}>{passwordUserMessage}</strong>
										<li key='subimt'><input type="submit" defaultValue="Log In" /><Link>Forgot Password</Link></li>
									</ul>
								</form>
								<div className="addtnal_acnt">I do not have any account yet.<Link to='/register'>Create My Account Now !</Link></div>
							</div>
						</div>
						<div className="content_lft">
							<h1>Welcome from PPL!</h1>
							<p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
							<img src="images/img_9.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		);
	}
)