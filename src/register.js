import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: null,
			password: '',
			email: null,
			fname: null,
			lname: null,
			userPasswordMessage: '',
			useremailMessage: '',
			userSubmitMessage: ''
		}
		console.log('register props - ', this.props);
	}
	OnChangeLoginHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	OnSubmitHandler = (e) => {
		e.preventDefault();
		console.log(this.state);
		let data = {
			username: this.state.username,
			password: this.state.password,
			email: this.state.email,
			fname: this.state.fname,
			lname: this.state.lname
		};
		if (data.password.length < 8) {
			this.setState({
				userPasswordMessage: 'Password length should be minimum 8 characters',
				userSubmitMessage: ''
			});
		}
		else {
			axios.post('http://localhost:3005/auth/signup', data)
				.then((res) => {
					if (res.data.submitSuccess) {
						this.setState({
							userSubmitMessage: 'SignUp successful click below to login',
							useremailMessage: '',
							userPasswordMessage: ''
						})
					} else if (res.data.user_already_exist) {
						this.setState({
							useremailMessage: 'User account already exists on entered email address',
							userPasswordMessage: '',
							userSubmitMessage: 'SignUp falied'
						})
					}
					console.log('axois response', res.data);
				})
				.catch((err) => {
					console.log('axios_error - ' + err);
				});
		}
	}
	render() {
		return (
			<div className="container">
				<div className="content">
					<div className="content_rgt">
						<div className="register_sec">
							<h1>Create An Account</h1>
							<ul>
								<form onSubmit={this.OnSubmitHandler}>
									<li>
										<span>Username</span>
										<input type="text" placeholder="Enter your username" onChange={this.OnChangeLoginHandler} name='username' required />
									</li>
									<li><span>Password</span><input type="text" placeholder="Enter your password" onChange={this.OnChangeLoginHandler} name='password' required /></li>
									<strong style={{ color: 'tomato' }}>{this.state.userPasswordMessage}</strong>
									<li><span>Email</span><input type="text" placeholder="Enter your email" onChange={this.OnChangeLoginHandler} name='email' required /></li>
									<strong style={{ color: 'tomato' }}>{this.state.useremailMessage}</strong>
									<li><span>First Name</span><input type="text" placeholder="Enter your first name" onChange={this.OnChangeLoginHandler} name='fname' required /></li>
									<li><span>Last Name</span><input type="text" placeholder="Enter your last name" onChange={this.OnChangeLoginHandler} name='lname' required /></li>
									
									<li><input type="submit" defaultValue="Register" /></li>
								</form>
							</ul>
							<strong style={{ color: 'tomato' }}>{this.state.userSubmitMessage}</strong>
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
}