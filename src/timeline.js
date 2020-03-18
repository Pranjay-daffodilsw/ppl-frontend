import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ContentRight from './content_right';

export default class timeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}
	Updater = () => {
		axios.get('http://localhost:3005/post/get/all')
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
								}
							)
							this.setState({
								posts: updated_array
							})
						}
					}
					else {
						this.setState({
							posts: res.data
						})
					}
					//console.log('axios all post response', res.data);
				}
			)
			.catch(
				(err) => {
					console.log('axios error', err);
				}
			)
	}

	componentDidMount() {
		console.log('timeline props ++++++++', this.props)
		axios.get('http://localhost:3005/post/get/all')
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
								}
							)
							this.setState({
								posts: updated_array
							})
						}
					}
					else {
						this.setState({
							posts: res.data
						})
					}
					console.log('axios all post response', res.data);
				}
			)
			.catch(
				(err) => {
					console.log('axios error', err);
				}
			)
		console.log('state values timeline - ', this.state);
	}

	render() {
		return (
			<div>
				<div className="container">
					<div className="content">
						<ContentRight Updater={this.Updater} />
						<div className="content_lft">
							<div className="contnt_1">
								<div className="list_1">
									<ul>
										<li>
											<input type="checkbox" className="chk_bx" />
											Friends</li>
										<li>
											<input type="checkbox" className="chk_bx" />
											Flaged</li>
									</ul>
								</div>
								<div className="timeline_div">
									<div className="timeline_div1">
										<div className="profile_pic">
											<img src="images/timeline_img1.png" />
											<div className="profile_text"><a href="#">Change Profile Pic</a></div>
										</div>
										<div className="profile_info">
											<div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
											<div className="profile_form">
												<ul>
													<li>
														<div className="div_name1">Name :</div>
														<div className="div_name2">Stefiney Gibbs</div>
													</li>
													<li>
														<div className="div_name1">Sex :</div>
														<div className="div_name2">Female</div>
													</li>
													<li>
														<div className="div_name1">Description :</div>
														<div className="div_name3">This is an example of a comment. You can create as many comments like this one
                                    or sub comments as you like and manage all of your content inside Account.</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="timeline_div2">
										<ul>
											<li><a href="#" className="active">Timeline    </a></li>
											<li><a href="#">About  </a></li>
											<li><a href="#">Album</a></li>
											<li><a href="#"> Pets</a></li>
											<li><a href="#">My Uploads </a></li>
										</ul>
									</div>
								</div>
							</div>
							{
								this.state.posts.map(
									(value, index) => {
										let d = new Date(this.state.posts[index].date);
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
										let image = require('./fileUploads/' + this.state.posts[index].filename);
										return (
											<Link
												to={{
													pathname: '/single_post',
													hash: value._id,
													state: {
														post:value
													}
												}}
											>
												<div className="contnt_2">
													<div className="div_a">
														<div className="div_title">{this.state.posts[index].title}</div>
														<div className="btm_rgt">
															<div className="btm_arc">{this.state.posts[index].category}</div>
														</div>
														<div className="div_top">
															<div className="div_top_lft"><img src="images/img_6.png" />{this.state.posts[index].username}</div>
															<div className="div_top_rgt"><span className="span_date">{date}</span><span className="span_time">{time}</span></div>
														</div>
														<div className="div_image"><img src={image} alt="pet" /></div>
														<div className="div_btm">
															<div className="btm_list">
																<ul>
																	<li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
																	<li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
																	<li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>0 Likes</a></li>
																	<li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>4 Comments</a></li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											</Link>
										)
									}
								)
							}
						</div>
					</div>
					<div className="clear" />
				</div>
			</div>
		);
	}
}


