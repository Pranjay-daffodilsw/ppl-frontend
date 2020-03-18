import React from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom';
import ContentRight from './content_right';

class postUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: 'others',
			categoryList: [],
			userMessage: ''
		};
		console.log('postUpload props - ', this.props);
	}
	componentDidMount() {
		axios.get('http://localhost:3005/post/get_category')
			.then(
				(res) => {
					this.setState({
						categoryList: res.data
					})
					// console.log(res.data);
				}
			)
			.catch(
				(err) => {
					console.log('content right axios error - ', err);
				}
			)
	}
	submitHandler = (e) => {
		e.preventDefault()
		console.log('Post upload event handler called', this.state);


		if (localStorage.getItem('loginTrue')) {
			let formData = new FormData();
			formData.append('date', Date.now());
			formData.append('user_id', localStorage.getItem('user_id'));
			formData.append('username', localStorage.getItem('username'));
			formData.append('image_file', this.state.image_file[0]);
			formData.append('category', this.state.category);
			formData.append('title', this.state.title);

			// for (var value of formData.values()) {
			//     console.log('formdata - ' , value);
			//  }
			const config = {
				headers: {
					'content-type': 'multipart/form-data'
				}
			};

			axios.post('http://localhost:3005/post/submit', formData, config)
				.then((res) => {
					console.log(res.data);
					this.setState({
						userMessage: ''
					})
					this.props.history.push('/timeline')
				})
				.catch((err) => {
					console.log('axios error', err);
					this.setState({
						userMessage: 'An internal server error has occured, please try again after some time'
					})
				})

		}
		else {
			this.setState({
				userMessage: 'You are not logged in to make a post. Please log in and try again'
			});
		}
	}
	changeHandler = (e) => {
		if (e.target.name === 'image_file') {
			this.setState({
				[e.target.name]: e.target.files
			})
		} else {
			this.setState({
				[e.target.name]: e.target.value
			})
		}
	}
	render() {
		return (
			<div>
				<div className="container">
					<div className="content">
						<ContentRight />
						<div className="content_lft">
							<div className="contnt_1">
								<div className="timeline_div">
									<div className="timeline_div1">
										<div className="upload_post_box">
											<div className="profile_form">
												<form onSubmit={this.submitHandler} encType='multipart/form-data' method='post'>
													<ul>
														<li>
															<div className="div_name2">Upload Post</div>
														</li>
														<li>
															<div className="div_name1"><label htmlFor='title'>Enter your post title below : </label></div>
															<input type='text' name='title' onChange={this.changeHandler} required />
														</li>
														<li>
															<div className="div_name1"><label htmlFor='category'>Choose a category for post : </label></div>
															<select name='category' onChange={this.changeHandler} defaultValue='others' >
																<option value='others'>Others</option>
																{
																	this.state.categoryList.map(
																		(value, index) => {
																			return (
																				<option value={value.categoryname}>{value.categoryname}</option>
																			)
																		}
																	)
																}

															</select>
														</li>
														<li>
															<div className="div_name1"><label for='image_file'>Choose an image below : </label></div>
															<input type='file' name='image_file' onChange={this.changeHandler} required />
														</li>
														<li>
															<div className="div_name2">
																<input type='submit' value='Click to post' />
																&nbsp;<div style={{ color: 'tomato' }}>{this.state.userMessage}</div>
															</div>
														</li>
														<li>
															<div className="div_name1">Description :</div>
															<div className="div_name3">
																You can upload a post here
                                            				</div>
														</li>
													</ul>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="clear" />
				</div>
			</div>
		);
	}
}

export default withRouter(postUpload);