import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
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
										<Link onClick={props.Updater} to={{
											pathname: '/timeline',
											hash: value.categoryname,
											state: {
												filter: true,
												filterByCategory: true,
												filterByDate: false,
												filterByLike: false,
												filterByComment: false
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
						<Link onClick={props.Updater} to={{
							pathname: '/timeline',
							hash: 'others',
							state: {
								filter: true,
								filterByCategory: true,
								filterByDate: false,
								filterByLike: false,
								filterByComment: false
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
