import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import {YELP_API_KEY} from '../../constants';
import './SearchBar.css';
import BusinessList from '../BusinessList/BusinessList.js';
import SortList from '../SortList/SortList';
import InputTerm from "../InputTerm/InputTerm";
import InputLocation from '../InputLocation/InputLocation';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function SearchBar() {
  const [term, setTerm] = useState(' '); // business term searched
  const [location, setLocation] = useState('Los Angeles, CA'); // location searched
  const [sortBy, setSortBy] = useState('best_match'); // how to sort results
  const [search, setSearch] = useState(false); // when to make api call 
  const [businesses, setBusinesses] = useState([]);
  const myRef = useRef(null);

  const options = {
    headers: { 
      Authorization: `Bearer ${YELP_API_KEY}`
    }
  }

  useEffect(() => {
    const searchBusinesses = async () => {
      try {
        let res = await Axios.get(`https://obscure-oasis-27229.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, options);
        let data = res.data;
        if(data.businesses) {
            // return an array that has all of the business properties
            // we need: name, address, city, etc. 
            const newArr = data.businesses.map(business => {
                return {
                    id: business.id,
                    image: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories.title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    website: business.url,
                    phone: business.display_phone,
                    photos: business.photos
    
                };
            });
            setBusinesses(newArr);
        }
    } catch(error) {
        console.error(error);
      }
    };

    searchBusinesses();
  }, [search]);

  // triggered when Lets Go button is clicked
  const handleSearch = e => {
    //searchYelp(term, location, sortBy);
    setSearch(!search);
    e.preventDefault();
    scrollToRef(myRef);
  }

  return (
      <div className='SearchBar'>
        <header className="heading">
          <h1>Where do you <span style={{color:"#59AFB9"}}>want to eat? </span></h1>
          <SortList />
        </header>
          <div className='SearchBar-fields'>
            <InputTerm />
            <InputLocation />
            <div className='SearchBar-submit'>
              <button href='#' onClick={handleSearch}>Let's Go</button>
            </div>
          </div>
        <BusinessList businesses={businesses} myRef={myRef}/>
      </div>
    )
}