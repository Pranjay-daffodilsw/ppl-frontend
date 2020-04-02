import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddCategory from './addcategory';
import PostFilter2 from './post_filter2';
import Featured from './featured';
import url from '../config/url';

export default (props) => {
	const [categoryList, setCategoryList] = useState([]);
	useEffect(
		(props) => {
			console.log('useEffect ran on - ', 'content_right.js' );
			console.log('props on - ', 'content_right.js', props);
			let componentMounted = true;
			axios.get(url.backendURL + url.paths.getCategory)
				.then(
					(res) => {
						if(componentMounted){
							setCategoryList(res.data);
						}
					}
				)
				.catch(
					(err) => {
						console.error('content right axios error - ', err);
					}
				)
			return (() => {componentMounted = false})
		},
		[]
	);
	return (
		<div className="content_rgt">
			<div className="rght_btn">
				<span className="rght_btn_icon">
					<img src="images/btn_iconb.png" alt="up" />
				</span>
				<span className="btn_sep">
					<img src="images/btn_sep.png" alt="sep" />
				</span>
			<Link to='/postupload'>Upload Post</Link>
			</div>
			<AddCategory categoryList={categoryList} />
			<PostFilter2 categoryList={categoryList} Updater={props.Updater} />
			<Featured />
		</div>
	)
}

