import React, { useState, useEffect } from 'react';
// import ContentRight from './content_right';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import url from '../config/url';
import axios from 'axios';

export default (props) => {
	const [redirect, setRedirect] = useState(false);
	const [usercommentmessage, setUsercommentmessage] = useState('');
	const [post, setPost] = useState({
		comments: [],
		likes: [],
		_id: '',
		date: 0,
		user_id: '',
		username: '',
		title: '',
		category: '',
		filename: '',
		mimetype: ''
	});
	const [userlikemessage, setUserlikemessage] = useState('');
	const [time, setTime] = useState('');
	const [date, setDate] = useState('');
	const [image, setImage] = useState(null);

	const pageRefreshHandler = (returnTrue) => {
		console.log('pageRefreshHandler fired');
		let query_data;
		if (props.location.state === undefined) {
			query_data = { params: { _id: props.location.hash.slice(1) } }
		}
		else {
			query_data = { params: { _id: props.location.state.post._id } }
		}
		axios.get(url.backendURL + url.paths.postGet, query_data)
			.then(
				(res) => {
					console.log('(single_post) axios response - ', res.data)
					if (returnTrue === true) {
						return res.data[0];
					} else {
						setPost(res.data[0]);
					}
				}
			)
			.catch(
				(err) => {
					console.error(err);
				}
			)
	}

	useEffect(
		() => {
			console.log('first useEffect fired', props)
			if (props.location === undefined || props.location.state === undefined) {
				setRedirect(true);
				setUsercommentmessage('');
				setUserlikemessage('');
			} else {
				setRedirect(false);
				setUsercommentmessage('');
				setUserlikemessage('');
				console.log('required console', props.location.state.post)
				setPost(props.location.state.post);
				let d = new Date(props.location.state.post.date);
				d = d.toString()
				setDate(d.slice(8, 10) + ' ' + d.slice(4, 7) + ' ' + d.slice(11, 16));
				let mm = d.slice(18, 21), hh = d.slice(16, 18), nn = '';
				if (hh > 12) {
					hh = String(Number(hh) - 12);
					nn = 'PM'
				}
				else if (hh === '12') {
					nn = 'PM';
				}
				else if (hh === '00') {
					hh = '12';
					nn = 'AM';
				}
				else { nn = 'AM' }
				setTime(hh + mm + ' ' + nn)
				setImage(require('../fileUploads/' + props.location.state.post.filename))
			}
		}
		, []);

	const submitHandler = (e) => {
		e.preventDefault()
		if (localStorage.getItem('loginTrue') === 'false') {
			setUsercommentmessage('You are not logged in, please log in to make a comment');
		} else {

			const formData = new FormData(document.getElementById('commentform'));
			let data = {
				username: localStorage.getItem('username'),
				user_id: localStorage.getItem('user_id'),
				post_id: post._id,
				text: formData.get('text')
			}
			axios.post(url.backendURL + url.paths.addcomment, data)
				.then(
					(res) => {
						setUsercommentmessage('Comment added');
						pageRefreshHandler();
					}
				)
				.catch(
					(err) => {
						setUsercommentmessage('An error occured at our server while commenting');
					}
				)
		}

	}
	const likeButtonHandler = () => {
		console.log('like button clicked');
		if (localStorage.getItem('loginTrue') === 'false') {
			setUserlikemessage('You are not logged in to like this post');
		} else {
			let action = '';
			if (post.likes.includes(localStorage.getItem('user_id'))) {
				action = 'pull';
			} else {
				action = 'push';
			}
			axios.post(
				url.backendURL + url.paths.like,
				{
					user_id: localStorage.getItem('user_id'),
					post_id: post._id,
					action: action
				}
			)
				.then(
					(res) => {
						console.log('single post axios like res.data - ', res.data);
						pageRefreshHandler();
					}
				)
				.catch(
					(err) => {
						console.error(err);
					}
				)
		}

	}

	if (redirect) {
		return (<Redirect to="/timeline" ></Redirect>)
	}
	else {
		return (
			<div>
				<div className="container">
					<div className="content">
						{/* <ContentRight /> */}
						<div className="content_lft">
							<div className="contnt_2">
								<div className="div_a">
									<div className="div_title">{post.title}</div>
									<div className="btm_rgt">
										<div className="btm_arc">{post.category}</div>
									</div>
									<div className="div_top">
										<div className="div_top_lft"><img src="images/img_6.png" alt='' />{post.username}</div>
										<div className="div_top_rgt"><span className="span_date">{date}</span><span className="span_time">{time}</span></div>
									</div>
									<div className="div_image"><img src={image} alt="pet" /></div>
									<div className="div_btm">
										<div className="btm_list">
											<ul>
												<li><Link><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</Link></li>
												<li><Link><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</Link></li>
												<li><Link onClick={likeButtonHandler} ><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{post.likes.length} Likes</Link></li>
												<li><Link><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{post.comments.length} Comments</Link></li>
											</ul>
										</div>
									</div>
								</div>

								<div style={{ color: 'tomato' }} ><h3>{userlikemessage}</h3></div>
							</div>
							<div className="contnt_3">
								<ul>
									{
										post.comments.map(
											(value, index) => {
												return (
													<li>
														<div className="list_image">
															<div className="image_sec"><img src="images/post_img.png" alt='' /></div>
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
											<form onSubmit={submitHandler} id='commentform' method='post'>
												<input type="text" placeholder="Enter your Comment" className="cmnt_bx1" name='text' required />
												<input type="submit" className="sub_bttn1" defaultValue="Submit Comment" name='submit' />
											</form>
										</div>
										<h3><div style={{ color: 'tomato' }} >{usercommentmessage}</div></h3>
									</li>
								</ul>
								<div className="view_div"><Link>View more</Link></div>
							</div>
						</div>
					</div>
					<div className="clear" />
				</div>
			</div>
		)
	}

}

