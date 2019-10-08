import React, {Component} from 'react';
import 'BusinessList.css';
import Business from '../Business';

class BusinessList extends Component {
  render() {
    return (
        <div className='Business-List'>
            <Bussiness />
            <Bussiness />
            <Bussiness />
            <Bussiness />
            <Bussiness />
            <Bussiness />
        </div>
    )
  }
}

export default BusinessList;