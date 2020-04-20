import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggle_upload_post } from '../redux'
import url from '../config/url';
import { findAllByPlaceholderText } from '@testing-library/react';

export default withRouter(
	(props) => {
		const [categoryList, setCategoryList] = useState([]);
		const [userMessage, setUserMessage] = useState('');
		const dispatch = useDispatch();
		const refreshPostUpload = () => {
			axios.get(url.backendURL + url.paths.getCategory)
				.then(
					(res) => {
						setCategoryList(res.data);
					}
				)
				.catch(
					(err) => {
						console.error('content right axios error - ', err);
					}
				)
		}
		useEffect(
			() => {
				refreshPostUpload()
			}
			, [])

		const submitHandler = (e) => {
			e.preventDefault()
			if (localStorage.getItem('loginTrue')) {
				let formData = new FormData(document.getElementById('postform'));
				formData.append('date', Date.now());
				formData.append('user_id', localStorage.getItem('user_id'));
				formData.append('username', localStorage.getItem('username'));

				for (var x in formData.values()) {
					console.log(x);
				}
				const config = {
					headers: {
						'content-type': 'multipart/form-data'
					}
				};
				axios.post(url.backendURL + url.paths.addPost, formData, config)
					.then((res) => {
						setUserMessage('');
						this.props.history.push('/timeline')
					})
					.catch((err) => {
						setUserMessage('An internal server error has occured, please try again after some time');
					})
			}
			else {
				setUserMessage('You are not logged in to make a post. Please log in and try again');
			}
		}

		return (
			<div style={{ }}>
				<div className="popup_sec" id="pop_forgt">
					<div className="contnt_1">
						<div className="timeline_div1">
							<div className="upload_post_box">
								<div className="profile_form">
									<form onSubmit={submitHandler} encType='multipart/form-data' method='post' id='postform'>
										<ul>
											<li key='uploadpost1'>
												<div className="clos_btn" onClick={ () => dispatch(toggle_upload_post(true)) } ><img src="images/clos.png" alt="" id="clos_pop" /></div>
												<div className="pop_hdr">You can upload a post here</div>
											</li>
											<li key='uploadpost6'>
												<div className="man_contnt">
													<span>Upload Post</span>
												</div>
											</li>
											<li key='uploadpost2'>
												<div className="div_name1"><label htmlFor='title'>Enter your post title below : </label></div>
												<input type='text' name='title' required />
											</li>
											<li key='uploadpost3'>
												<div className="div_name1"><label htmlFor='category'>Choose a category for post : </label></div>
												<select name='category' defaultValue='others' >
													<option value='others'>Others</option>
													{
														categoryList.map(
															(value, index) => {
																return (
																	<option value={value.categoryname}>{value.categoryname.toUpperCase()}</option>
																)
															}
														)
													}

												</select>
											</li>
											<li key='uploadpost4'>
												<div className="div_name1 "><label htmlFor='image_file'>Choose an image below : </label></div>
												<input type='file' name='image_file' required />
											</li>
											<li key='uploadpost5'>
												<div className="div_name2 man_contnt">
													<input type='submit' value='Click to post' />
																&nbsp;<div style={{ color: 'tomato' }}>{userMessage}</div>
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
		);
	}
);