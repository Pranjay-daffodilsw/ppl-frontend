import React from 'react';
import { Link } from 'react-router-dom';

const PostFilter1Component = (props) => {
  const {
    filterObject,
    filterHandler
  } = props;


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

export default PostFilter1Component;