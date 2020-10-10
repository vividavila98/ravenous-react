import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Business.css';

export default function Business(props) {
     const { business } = props;
     const [modal, setModal] = useState(false);
     const toggle = () => setModal(!modal);

    return (
    <div className='Business'>
        <div className='image-container'>
            <img src={business.image} alt='restaurant'/>
        </div>
        <h2>{business.name}</h2>
        <div className='Business-information'>
            <div className='Business-address'>
                <p className='mb-0'>{business.address}</p>
                <p className='mb-0'>{business.city}, {business.state} {business.zipCode}</p>
                <div className='Business-reviews'>
                    <h3>{business.category}</h3>
                    <h3 className='rating mb-0'>{business.rating} stars</h3>
                    <p >{business.reviewCount} reviews</p>
                    <Button className='learn-more' onClick={toggle}>Learn More</Button>
                </div>
            </div>
        </div>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{business.name}</ModalHeader>
        <ModalBody>
        <div className='image-container'>
            <img src={business.image} alt='restaurant'/>
        </div>
        <p className='mb-0'><b>Phone number:</b></p>
        <p>{business.phone}</p>
        </ModalBody>
        <ModalFooter>
            <a href={business.website} target='_blank' rel="noopener noreferrer" className='yelp-button'>Yelp Info</a>
        </ModalFooter>
      </Modal>
    </div>
    )
}


