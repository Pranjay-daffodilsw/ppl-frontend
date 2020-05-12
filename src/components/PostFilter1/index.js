import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { refresh_post } from "../../redux";
import PostFilter1Component from './PostFilter1Component'

export default function  PostFilter1 () {
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
      // dispatch(refresh_post([...postsCurrent].reverse()))
    } else if (args.filterByLike === true) {
      console.log('filter by like')

      // dispatch(refresh_post(updated_array))
    } else if (args.filterByComment === true) {
      console.log('filter by comment')

      // dispatch(refresh_post(updated_array))
    }
    else {
      console.log('filter by date newest');
      // dispatch(refresh_post(postsCurrent));
    }
  }
  return (
    <PostFilter1Component
      filterObject={filterObject}
      filterHandler={filterHandler}
     />
  )
}