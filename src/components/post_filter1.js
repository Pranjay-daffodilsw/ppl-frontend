import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
	return (
		<div className="contnt_1">
			<div className='post_div'>
				<div className='post_list'>
					<ul>
						<li key={'latest_first'}><Link onClick={props.Updater}
							to={{
								pathname: '/timeline',
								state: {
									filter: false,
									filterByCategory: false,
									filterByDate: false,
									filterByLike: false,
									filterByComment: false
								}
							}}><span className="list_img"><img src="images/img_1.png" alt='' /></span>Latest First</Link></li>
						<li key={'oldest_first'}><Link onClick={props.Updater}
							to={{
								pathname: '/timeline',
								state: {
									filter: true,
									filterByCategory: false,
									filterByDate: true,
									filterByLike: false,
									filterByComment: false
								}
							}}><span className="list_img"><img src="images/img_2.png" alt='' /></span>Oldest First</Link></li>
						<li key={'most_liked'}><Link onClick={props.Updater}
							to={{
								pathname: '/timeline',
								state: {
									filter: true,
									filterByCategory: false,
									filterByDate: false,
									filterByLike: true,
									filterByComment: false
								}
							}}><span className="list_img"><img src="images/img_3.png" alt='' /></span>Most Liked</Link></li>
						<li key={'most_commented'}><Link onClick={props.Updater}
							to={{
								pathname: '/timeline',
								state: {
									filter: true,
									filterByCategory: false,
									filterByDate: false,
									filterByLike: false,
									filterByComment: true
								}
							}}><span className="list_img"><img src="images/img_5.png" alt='' /></span>Most Commented</Link></li>
					</ul>
				</div>
			</div>
		</div>
	)

}