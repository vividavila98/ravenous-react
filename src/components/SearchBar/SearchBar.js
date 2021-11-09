import React, { useState, useEffect, useRef } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import Axios from "axios";
import {YELP_API_KEY} from '../../constants';
import './SearchBar.css';
import BusinessList from '../BusinessList/BusinessList.js';
import SortList from '../SortList/SortList';
import InputTerm from "../InputTerm/InputTerm";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);


export default function SearchBar() {
  const [term, setTerm] = useState(' '); // business term searched
  const [location, setLocation] = useState('Los Angeles, CA'); // location searched
  const [sortBy, setSortBy] = useState('best_match'); // how to sort results
  const [search, setSearch] = useState(false); // when to make api call 
  const [businesses, setBusinesses] = useState([]);
  const [termSuggestions, setTermSuggestions] = useState([]); //array of term suggestions
  const myRef = useRef(null);

  const options = {
    headers: { 
      Authorization: `Bearer ${YELP_API_KEY}`
    }
  }

// useEffect(() => {
//   if ("geolocation" in navigator) {
//       console.log("Available");
//     } else {
//       console.log("Not Available");
//     }
// });

useEffect(() => {
  const autocompleteTerm = async () => {
    try {
      let res = await Axios.get(`https://obscure-oasis-27229.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${term}&latitude=37.0902&longitude=95.7129`, options);
      let data = res.data;
      if (data.terms) {
        setTermSuggestions(data.terms);
      }
    } catch(error) {
      console.error(error);
    }
  };
  autocompleteTerm();
},[term]);

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


  // this is going to be triggered when something is typed into business text field
  // what is passed in is an event OBJECT, and what is typed is extracted from this
  // using event.target.value
  const handleTermChange = e => {
    setTerm(e.target.value);
  }

  // same logic as handleTermChange
  const handleLocationChange = location => {
    setLocation(location);
  }

  // triggered when Lets Go button is clicked
  const handleSearch = e => {
    //searchYelp(term, location, sortBy);
    setSearch(!search);
    e.preventDefault();
    scrollToRef(myRef);
  }

  return (
      <div className='SearchBar'>
        <div className="heading">
          <h1>Where do you <span style={{color:"#59AFB9"}}>want to eat? </span></h1>
          <SortList />
        </div>
        <div className="fields">
          <div className='SearchBar-fields'>
            <InputTerm />
            <PlacesAutocomplete
              onChange={handleLocationChange}
              value={location}
            >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className="input-box" style={{marginTop:"-25px"}}>
              <input
                style={{height:"47px"}}
                {...getInputProps({
                  placeholder: 'Where?',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                    
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      key={suggestions.indexOf(suggestion)}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div className='SearchBar-submit'>
            <button href='#' onClick={handleSearch}>Let's Go</button>
          </div>
          </div>
        </div>
        {/* BusinessList is inhering the bussiness array/list to use */}
        <BusinessList businesses={businesses} myRef={myRef}/>
      </div>
    )
}