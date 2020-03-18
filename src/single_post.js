import React from 'react';
import ContentRight from './content_right';
import { Redirect } from 'react-router';
import axios from 'axios';

export default class single_post extends React.Component {
	constructor(props) {
		super(props);
		if (this.props.location === undefined || this.props.location.state === undefined) {
			this.state = {
				redirect: true,
				usermessage: ''
			}
		} else {
			this.state = {
				redirect: false,
				post: this.props.location.state.post,
				usermessage: 'text'
			}
		}
	}
	submitHandler = (e) => {
		
		let formData = new FormData(document.getElementById('commentForm'));
		if (localStorage.getItem('loginTrue') === 'false') {
			this.setState({
				usermessage: 'You are not logged in, please log in to make a comment'
			});
		} else {
			formData.append('username', localStorage.getItem('username'))
			formData.append('user_id', localStorage.getItem('user_id'))
			formData.append('post_id', this.state.post._id)
			

			axios.post('http://localhost:3005/post/add_comment', formData)
				.then(
					(res) => {
						this.setState({
							usermessage: 'Comment added'
						})
					}
				)
				.catch(
					(err) => {
						this.setState({
							usermessage: 'An error occured at our server while commenting'
						})
					}
				)
		}

	}
	render() {
		let d = new Date(this.state.post.date);
		d = d.toString()
		let date = d.slice(8, 10) + ' ' + d.slice(4, 7) + ' ' + d.slice(11, 16);
		let mm = d.slice(18, 21), hh = d.slice(16, 18), nn = '';
		if (hh > 12) {
			hh = String(Number(hh) - 12);
			nn = 'PM'
		}
		else if (hh == '12') {
			nn = 'PM';
		}
		else if (hh == '00') {
			hh = '12';
			nn = 'AM';
		}
		else { nn = 'AM' }
		let time = hh + mm + ' ' + nn
		let image = require('./fileUploads/' + this.state.post.filename);

		if (this.state.redirect) {
			return (<Redirect to="/timeline" ></Redirect>)
		}
		else {
			return (
				<div>
					<div className="container">
						<div className="content">
							<ContentRight />
							<div className="content_lft">
								<div className="contnt_2">
									<div className="div_a">
										<div className="div_title">{this.state.post.title}</div>
										<div className="btm_rgt">
											<div className="btm_arc">{this.state.post.category}</div>
										</div>
										<div className="div_top">
											<div className="div_top_lft"><img src="images/img_6.png" />{this.state.post.username}</div>
											<div className="div_top_rgt"><span className="span_date">{date}</span><span className="span_time">{time}</span></div>
										</div>
										<div className="div_image"><img src={image} alt="pet" /></div>
										<div className="div_btm">
											<div className="btm_list">
												<ul>
													<li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
													<li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
													<li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
													<li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{this.state.post.comments.length} Comments</a></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
								<div className="contnt_3">
									<ul>
										{
											this.state.post.comments.map(
												(value, index) => {
													return (
														<li>
															<div className="list_image">
																<div className="image_sec"><img src="images/post_img.png" /></div>
																<div className="image_name">{value.username}</div>
															</div>
															<div className="list_info">
																{value.text}
															</div>
														</li>
													)
												}
											)
										}
										<li>
											<div className="cmnt_div1">
												<form onSubmit={this.submitHandler} id='commentForm'>
													<input type="text" defaultValue="Enter your Comment" className="cmnt_bx1" name='text' required />
													<input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
												</form>
											</div>
											<h3><div style={{ color: 'tomato' }} >{this.state.usermessage}</div></h3>
										</li>
									</ul>
									<div className="view_div"><a href="#">View more</a></div>
								</div>
							</div>
						</div>
						<div className="clear" />
					</div>
				</div>
			)
		}
	}
}



// text: req.body.text,
//             username: req.body.username,
//             user_id: req.body.user_id,
//             post_id: req.body.post_id,
//             old_comments: req.body.old_comments



{
	/*
	<li>
								<div className="list_image">
									<div className="image_sec"><img src="images/post_img.png" /></div>
									<div className="image_name">Bharat</div>
								</div>
								<div className="list_info">
									This is an example of a comment. You can create as many comments like this one or sub
									comments as you like and manage all of your content inside your Account.
												</div>
								<input type="button" defaultValue="Reply" className="black_btn" />
								<div className="cmnt_div">
									<input type="text" defaultValue="Add a Comment" className="cmnt_bx" />
									<input type="submit" className="sub_bttn" defaultValue="Submit Comment" />
								</div>
							</li>
							<li>
								<div className="list_image">
									<div className="image_sec"><img src="images/post_img.png" /></div>
									<div className="image_name">Bharat</div>
								</div>
								<div className="list_info">
									This is an example of a comment. You can create as many comments like this one or sub
									comments as you like and manage all of your content inside your Account.
											</div>
								<input type="button" defaultValue="Reply" className="orng_btn" />
							</li>
	
	*/
}