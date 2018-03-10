import React from 'react';
import PlaceCard from './PlaceCard';

const Comment = (props) => {
  return (
    <div className="mt-3">
      <PlaceCard>
        {props.children}
      </PlaceCard>
    </div>
  );
};

export default Comment;