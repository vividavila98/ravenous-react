import React, {Component} from 'react';
import './Business.css';

class Business extends Component {
  render() {
    return (
        <div className='Business'>
            <div className='image-container'>
                <img src={this.props.business.image} alt='restaurant-image'/>
            </div>
            {/**
             * Business component received the props business which is a specific business
             * now the info for the business is dynamic and is referenced through the prop
             */}
            <h2>{this.props.business.name}</h2>
            <div className='Business-information'>
                <div className='Business-address'>
                    <p>{this.props.business.address}</p>
                    <p>{this.props.business.city}</p>
                    <p>{this.props.business.state} {this.props.business.zipCode}</p>
                    <div className='Business-reviews'>
                        <h3>{this.props.business.category}</h3>
                        <h3 className='rating'>{this.props.business.rating} stars</h3>
                        <p>{this.props.business.reviewCount} reviews</p>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Business;


