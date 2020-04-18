import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { refresh_post } from "../redux";

export default () => {
	const postsCurrent = useSelector(state => state.post.postsCurrent);
	// const posts = useSelector(state => state.post.posts);
	const dispatch = useDispatch();

	const filterObject = {
		filter: false,
		filterByCategory: false,
		filterByDate: false,
		filterByLike: false,
		filterByComment: false
	}
	const filterHandler = (
		args = filterObject
	) => {
		console.log('filterHandler args - ', args)
		if (args.filterByDate === true) {
			console.log('filter by date oldest')
			dispatch(refresh_post(postsCurrent.reverse()))
		} else if (args.filterByLike === true) {
			console.log('filter by like')
			let updated_array = [];
			let maxLike = -1;
			postsCurrent.forEach(
				(item, index) => {
					if (item.likes.length > maxLike) {
						maxLike = item.likes.length
						updated_array = [item]
					} else if ( item.likes.length === maxLike ){
						updated_array.push(item)
					}
				}
			);
			dispatch(refresh_post(updated_array))
		} else if (args.filterByComment === true) {
			console.log('filter by comment')
			let updated_array = [];
			let maxComment = -1;
			postsCurrent.forEach(
				(item, index) => {
					if (item.comments.length > maxComment) {
						maxComment = item.comments.length
						updated_array = [item]
					} else if ( item.comments.length === maxComment ){
						updated_array.push(item)
					}
				}
			);
			dispatch(refresh_post(updated_array))
		}
		else {
			console.log('filter by date newest');
			dispatch(refresh_post(postsCurrent));
		}
	}
	return (
		<div className="contnt_1" style={{}} >
			<div className='post_div'>
				<div className='post_list'>
					<ul>
						<li key={'latest_first'}>
							<Link
								to={{
									pathname: '/timeline',
									state: filterObject
								}}
								onClick={() => filterHandler()}
							><span className="list_img"><img src="images/img_1.png" alt='' /></span>Latest First</Link></li>
						<li key={'oldest_first'}>
							<Link
								to={{
									pathname: '/timeline',
									state: {
										...filterObject,
										filter: true,
										filterByDate: true
									}
								}}
								onClick={() => filterHandler({
									...filterObject,
									filter: true,
									filterByDate: true
								})}
							><span className="list_img"><img src="images/img_2.png" alt='' /></span>Oldest First</Link></li>
						<li key={'most_liked'}>
							<Link onClick={() => filterHandler({
								...filterObject,
								filter: true,
								filterByLike: true
							})}
								to={{
									pathname: '/timeline',
									state: {
										...filterObject,
										filter: true,
										filterByLike: true
									}
								}}><span className="list_img"><img src="images/img_3.png" alt='' /></span>Most Liked</Link></li>
						<li key={'most_commented'}>
							<Link onClick={() => {
								filterHandler({
									...filterObject,
									filter: true,
									filterByComment: true
								})
							}}
								to={{
									pathname: '/timeline',
									state: {
										...filterObject,
										filter: true,
										filterByComment: true
									}
								}}><span className="list_img"><img src="images/img_5.png" alt='' /></span>Most Commented</Link></li>
					</ul>
				</div>
			</div>
		</div >
	)

}