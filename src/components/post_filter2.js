import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refresh_post } from '../redux';

export default (props) => {
	const dispatch = useDispatch();
	const postsCurrent = useSelector(state => state.post.postsCurrent);

	const filterObject = {
		filter: false,
		filterByCategory: false,
		filterByDate: false,
		filterByLike: false,
		filterByComment: false
	}

	const clickHandler = (categoryToMatch) => {
		return (e) => {
			e.preventDefault();
			let updated_array = []
			postsCurrent.map(
				(value, index) => {
					if (value.category === categoryToMatch) {
						updated_array.push(value)
					}
					return {}
				}
			)
			dispatch(refresh_post(updated_array));
		}

	}

	return (
		<div className="rght_cate">
			<div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
			<div className="rght_list">
				<ul>
					{
						props.categoryList.map(
							(value, index) => {
								return (
									<li key={value._id}>
										<Link onClick={clickHandler(value.categoryname)}
											to={{
												pathname: '/timeline',
												hash: value.categoryname,
												state: {
													...filterObject,
													filter: true,
													filterByCategory: true,
												}
											}} >
											<span className="list_icon" >
												<img style={{ maxWidth: '39px', maxHeight: '39px' }} src={"images/category/" + value.thumbnail} alt="up" />
											</span> {value.categoryname}
										</Link>
									</li>
								)
							}
						)
					}
					<li key={'others_filter'}>
						<Link onClick={clickHandler('others')} to={{
							pathname: '/timeline',
							hash: 'others',
							state: {
								...filterObject,
								filter: true,
								filterByCategory: true,
							}
						}}>
							<span className="list_icon" >
								<img src="images/icon_05.png" alt="up" />
							</span> Others
            			</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
