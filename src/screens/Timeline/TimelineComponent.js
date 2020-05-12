import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ContentRight from '../../components/content_right';
import PostFilter1 from '../../components/PostFilter1';

function TimelineComponent(props) {
  const {
    loadItems,
    totalElements,
    posts,
    loader,
    items
  } = props


  return (
    <div>
      <div className="container">
        <div className="content">
          <ContentRight />
          <div className="content_lft">
            <PostFilter1 />
            <InfiniteScroll
              pageStart={0}
              loadMore={loadItems}
              hasMore={
                totalElements ? (posts.length < totalElements) : true
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
  )
}

export default TimelineComponent;