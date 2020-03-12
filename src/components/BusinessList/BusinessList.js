import React, {Component} from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';

class BusinessList extends Component {
  render() {
    return (
        <div className='Business-List'>
         {/**
          * BusinessList received the array/list of businesses from
          * App.js. Now it needs to display the list of businesses.
          * It iterates through the array using the map() method.
          * Then for each element (business) in the array, it's going
          * to return a Business component with the prop business
          * so that the Business component knows which specific
          * business to display
         */}
            {
              this.props.businesses.map(business => {
                return <Business business={business} key={business.id} />;
              })
              }
        </div>
    )
  }
}

export default BusinessList;