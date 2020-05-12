import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { load_post } from '../../redux';
import TimelineComponent from './TimelineComponent';
import url from '../../config/url';

function Timeline(props) {

  const posts = useSelector(state => state.post.posts);
  const totalElements = useSelector(state => state.post.totalElements);
  const dbQuery = useSelector(state => state.post.dbQuery);
  const history = useHistory();
  const dispach = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('loginTrue') === 'false' || localStorage.getItem('loginTrue') === null) {
      history.push('/login')
    }
  })
  const loader = <div key={'loader'} className='loader'><h3> Loading... </h3></div>;
  var items = [];
  const loadItems = (elementNumber) => {
    dispach(load_post(posts, {
      pageDetail: {
        fromElement: elementNumber - 1,
        uptoElement: elementNumber
      },
      dbQuery: dbQuery,
      clearOld: (elementNumber === 1) ? true : false
    }));
  }

  const likeButtonHandler = (value) => {
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
  posts.map(
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
      let image = require('../../fileUploads/' + value.filename);
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
                  <li key={'like' + value._id}><Link onClick={() => likeButtonHandler(value)} ><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{value.likes.length} Likes</Link></li>
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
    <TimelineComponent
      loadItems={loadItems}
      totalElements={totalElements}
      posts={posts}
      loader={loader}
      items={items}
    />
  );
}

export default Timeline;