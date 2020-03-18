import React from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: null,
			password: null,
			emailUserMessage: '',
			passwordUserMessage: ''
		}
		console.log('login props - ', this.props);
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
			email: this.state.email,
			password: this.state.password
		};
		axios.post('http://localhost:3005/auth/login', data)
			.then((res) => {
				console.log('axois response', res.data);
				if (res.data.loginSuccess) {
					console.log('login successful');
					localStorage.setItem('loginTrue', true);
					localStorage.setItem('user_id', res.data.userInfo.user_id);
					localStorage.setItem('username', res.data.userInfo.username);
					localStorage.setItem('fname', res.data.userInfo.fname);
					localStorage.setItem('lname', res.data.userInfo.lname);
					localStorage.setItem('email', res.data.userInfo.email);
					this.setState({
						passwordUserMessage: '',
						emailUserMessage: ''
					})
					this.props.history.push('/');
				}
				else if (res.data.emailMatch) {
					this.setState({
						passwordUserMessage: 'Incorrect Password is entered',
						emailUserMessage: ''
					})
				}
				else {
					this.setState({
						emailUserMessage: 'Entered email does not exist',
						passwordUserMessage: ''
					})
				}
			})
			.catch((err) => {
				console.log('axios_error - ' + err);
			});
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="content">
						<div className="content_rgt">
							<div className="login_sec">
								<h1>Log In</h1>
								<form onSubmit={this.OnSubmitHandler}>
									<ul>
										<li><span>Email-ID</span><input type="email" onChange={this.OnChangeLoginHandler} placeholder="Enter your email" name='email' required /></li>
										<strong style={{ color: 'tomato' }}>{this.state.emailUserMessage}</strong>
										<li><span>Password</span><input type="password" onChange={this.OnChangeLoginHandler} placeholder="Enter your password" name='password' required /></li>
										<strong style={{ color: 'tomato' }}>{this.state.passwordUserMessage}</strong>
										<li><input type="checkbox" />Remember Me</li>
										<li><input type="submit" defaultValue="Log In" /><a href>Forgot Password</a></li>
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
}
export default withRouter(login)