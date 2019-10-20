import React, {Component} from 'react';
import './BusinessList.css';
import Business from '../Business/Business.js';

class BusinessList extends Component {
  render() {
    return (
        <div className='Business-List'>
            <Business />
            <Business />
            <Business />
            <Business />
            <Business />
            <Business />
        </div>
    )
  }
}

export default BusinessList;