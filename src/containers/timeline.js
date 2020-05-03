import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { debounce } from 'lodash'
import { connect } from "react-redux";
import InfiniteScroll from 'react-infinite-scroller'
import { refresh_post, load_post } from '../redux';
import ContentRight from '../components/content_right';
import PostFilter1 from '../components/post_filter1';
import url from '../config/url';

class timeline extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasMoreItems: true,
			loadedUpto: 0
		}
		if (localStorage.getItem('loginTrue') === 'false' || localStorage.getItem('loginTrue') === null) {
			props.history.push('/login')
		}
	}

	loadItems = (elementNumber) => {
		this.props.load_post(this.props.posts, {
			pageDetail: {
				fromElement: elementNumber - 1,
				uptoElement: elementNumber
			},
			dbQuery: this.props.dbQuery,
			clearOld: (elementNumber === 1) ? true : false
		});
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
		const loader = <div key={'loader'} className='loader'><h3> Loading... </h3></div>;
		var items = [];
		console.log('timeline state', this.state, 'timeline props', this.props);

		this.props.posts.map(
			(value, index) => {
				let d = new Date(value.date);
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
				let image = require('../fileUploads/' + value.filename);
				items.push(
					(<div key={value._id} className="contnt_2">
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
								<div className="div_title">{value.title}</div>
								<div className="btm_rgt">
									<div className="btm_arc">{value.category}</div>
								</div>
								<div className="div_top">
									<div className="div_top_lft"><img src="images/img_6.png" alt='' />{value.username}</div>
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
					</div>)
				)
				return null
			}

		)

		return (
			<div>
				<div className="container">
					<div className="content">
						<ContentRight Updater={this.Updater} />
						<div className="content_lft">
							<PostFilter1 Updater={this.Updater} />
							<InfiniteScroll
								pageStart={0}
								loadMore={this.loadItems}
								hasMore={
									this.props.totalElements? (this.props.posts.length < this.props.totalElements): true
								}
								loader={loader}
								threshold={250}
							>
								<div>
									{items}
								</div>
							</InfiniteScroll>
						</div>
					</div>
					<div className="clear" />
				</div>
			</div >
		);
	}
}



const mapStateToProps = (state) => {
	console.log('mapStateToProps state - ', state)
	return {
		posts: state.post.posts,
		totalElements: state.post.totalElements,
		dbQuery: state.post.dbQuery
	}
}

const mapDispatchToProps = (dispach) => {
	return {
		refresh_post: (items, options) => dispach(refresh_post(items, options)),
		load_post: (itemsOld, options) => dispach(load_post(itemsOld, options))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)
	(timeline);