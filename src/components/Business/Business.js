import React from 'react';
import './Business.css';

export default function Business(props) {
     const { business } = props;
    return (
    <div className='Business'>
        <div className='image-container'>
            <img src={business.image} alt='restaurant'/>
        </div>
        {/**
         * Business component received the props business which is a specific business
         * now the info for the business is dynamic and is referenced through the prop
         */}
        <h2>{business.name}</h2>
        <div className='Business-information'>
            <div className='Business-address'>
                <p>{business.address}</p>
                <p>{business.city}, {business.state} {business.zipCode}</p>
                <div className='Business-reviews'>
                    <h3>{business.category}</h3>
                    <h3 className='rating'>{business.rating} stars</h3>
                      <p>{business.reviewCount} reviews</p>
                </div>
            </div>
        </div>
    </div>
    )
}


