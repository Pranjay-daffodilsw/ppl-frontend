import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { refresh_post } from '../redux';
import ContentRight from '../components/content_right';
import PostFilter1 from '../components/post_filter1';
import url from '../config/url';

class timeline extends React.Component {
	constructor(props) {
		super(props);
		if (localStorage.getItem('loginTrue') === 'false' || localStorage.getItem('loginTrue') === null) {
			props.history.push('/login')
		}
		// this.state = {
		// 	posts: []
		// };

		console.log('posts data from redux', props.posts);
	}

	Updater = () => {
		axios.get(url.backendURL + url.paths.postGet)
			.then(
				(res) => {
					if (this.props.location.state !== undefined && this.props.location.state.filter === true) {
						if (this.props.location.state.filterByCategory === true) {
							let updated_array = []
							res.data.map(
								(value, index) => {
									if (value.category === this.props.location.hash.slice(1)) {
										updated_array.push(value)
									}
									return {}
								}
							)
							this.props.refresh_post(updated_array)
							// this.setState({
							// 	posts: updated_array
							// })
						} else if (this.props.location.state.filterByDate === true) {
							this.props.refresh_post(res.data.reverse())
							// this.setState({
							// 	posts: res.data.reverse()
							// });
						} else if (this.props.location.state.filterByLike === true) {
							console.log('most liked ran')
							let updated_array = res.data;
							let maxLike = 0;
							res.data.forEach(
								(item, index) => {
									if (item.likes.length > maxLike) {
										maxLike = item.likes.length
										updated_array = [item]
									}
								}
							);
							this.props.refresh_post(updated_array)
							// this.setState({
							// 	posts: updated_array
							// });
						} else if (this.props.location.state.filterByComment === true) {
							console.log('most commented ran')
							let updated_array = res.data;
							let maxComment = 0;
							res.data.forEach(
								(item, index) => {
									if (item.comments.length > maxComment) {
										maxComment = item.comments.length
										updated_array = [item]
									}
								}
							);
							this.props.refresh_post(updated_array)
							// this.setState({
							// 	posts: updated_array
							// });
						}
						else {
							this.props.refresh_post(res.data)
							// this.setState({
							// 	posts: res.data
							// })
						}
					}
					else {
						this.props.refresh_post(res.data)
						// this.setState({
						// 	posts: res.data
						// })
					}
				}
			)
			.catch(
				(err) => {
					console.error('axios error', err);
				}
			)
	}
	componentDidMount() {
		axios.get(url.backendURL + url.paths.postGet)
			.then(
				(res) => {
					if (this.props.location.state !== undefined && this.props.location.state.filter === true) {
						if (this.props.location.state.filterByCategory) {
							let updated_array = []
							res.data.map(
								(value, index) => {
									if (value.category === this.props.location.hash.slice(1)) {
										updated_array.push(value)
									}
									return {}
								}
							)
							this.props.refresh_post(updated_array)
							// this.setState({
							// 	posts: updated_array
							// })
						}
					}
					else {
						this.props.refresh_post(res.data)
						// this.setState({
						// 	posts: res.data
						// })
					}
				}
			)
			.catch(
				(err) => {
					console.log('axios error', err);
				}
			)
		console.log('state values timeline - ', this.state);
	}
	likeButtonHandler = (value) => {
		if (localStorage.getItem('loginTrue') === 'false') {
			alert('You are not logged in to like this post');
		} else {
			let action = '';
			if (value.likes.includes(localStorage.getItem('user_id'))) {
				action = 'pull';
			} else {
				action = 'push';
			}
			axios.post(
				url.backendURL + url.paths.like,
				{
					user_id: localStorage.getItem('user_id'),
					post_id: value._id,
					action: action
				}
			)
				.then(
					(res) => {
						console.log('axios res.data - ', res.data);
						this.Updater();
					}
				)
				.catch(
					(err) => {
						console.error(err);
					}
				)
		}

	}
	render() {
		console.log('props data from redux in timeline.js - ', this.props.posts.posts);
		return (
			<div>
				<div className="container">
					<div className="content">
						<ContentRight Updater={this.Updater} />
						<div className="content_lft">
							<PostFilter1 Updater={this.Updater} />
							{
								this.props.posts.posts.map(
									(value, index) => {
										let d = new Date(this.props.posts.posts[index].date);
										d = d.toString()
										let date = d.slice(8, 10) + ' ' + d.slice(4, 7) + ' ' + d.slice(11, 16);
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
										let time = hh + mm + ' ' + nn
										let image = require('../fileUploads/' + this.props.posts.posts[index].filename);
										return (

											<div className="contnt_2">
												<div className="div_a">
													<Link
														to={{
															pathname: '/single_post',
															hash: value._id,
															state: {
																post: value
															}
														}}
													>
														<div className="div_title">{this.props.posts.posts[index].title}</div>
														<div className="btm_rgt">
															<div className="btm_arc">{this.props.posts.posts[index].category}</div>
														</div>
														<div className="div_top">
															<div className="div_top_lft"><img src="images/img_6.png" alt='' />{this.props.posts.posts[index].username}</div>
															<div className="div_top_rgt"><span className="span_date">{date}</span><span className="span_time">{time}</span></div>
														</div>
														<div className="div_image"><img src={image} alt="pet" /></div>
													</Link>
													<div className="div_btm">
														<div className="btm_list">
															<ul>
																<li key={'share' + value._id}><Link><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</Link></li>
																<li key={'flag' + value._id}><Link><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</Link></li>
																<li key={'like' + value._id}><Link onClick={() => this.likeButtonHandler(value)} ><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{value.likes.length} Likes</Link></li>
																<li key={'comment' + value._id}><Link
																	to={{
																		pathname: '/single_post',
																		hash: value._id,
																		state: {
																			post: value
																		}
																	}}
																><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{value.comments.length} Comments</Link></li>
															</ul>
														</div>
													</div>
												</div>
											</div>

										)
									}
								)
							}
						</div>
					</div>
					<div className="clear" />
				</div>
			</div >
		);
	}
}



const mapStateToProps = (state) => {
	return {
		posts: state.post
	}
}

const mapDispatchToProps = (dispach) => {
	return {
		refresh_post: (newData) => dispach(refresh_post(newData))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
	(timeline);