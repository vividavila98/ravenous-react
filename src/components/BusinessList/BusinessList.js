import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';

export default function BusinessList(props) {
  const {businesses, myRef} = props; 

  return (
    <div className='Business-List' ref={myRef}>
      {
        businesses.map(business => {
          return <Business business={business} key={business.id} />;
        })
        }
    </div>
    )
}