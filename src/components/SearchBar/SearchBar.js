import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import BusinessList from '../BusinessList/BusinessList.js';
import PlacesAutocomplete from 'react-places-autocomplete';
import Axios from "axios";
import {YELP_API_KEY} from '../../constants';


export default function SearchBar() {
  const [term, setTerm] = useState(''); // business term searched
  const [location, setLocation] = useState(''); // location searched
  const [sortBy, setSortBy] = useState('best_match'); // how to sory results
  const [search, setSearch] = useState(false); // when to make api call 
  const [businesses, setBusinesses] = useState([]);
  
  // KEYS are string text to display and VALUE is for the API
  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  const options = {
    headers: { 
        Authorization: `Bearer ${YELP_API_KEY}`

    }
}

const autocompleteTerm = async () => {
  try {
    let res = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${term}&latitude=37.0902&longitude=95.7129`, options);
  }
}

const searchBusinesses = async () => {
  try {
    let res = await Axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, options);
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
            };
        });
        setBusinesses(newArr);
    }
} catch(error) {
    console.error(error);
  }
}

  useEffect(() => {
    searchBusinesses();
  }, [search]);

  // returns the current CSS class for a sorting option: either it's active
  // or it's nothing. 
  const getSortByClass = sortByOption => {
    // if the sortByOption is the same as the state value, 
    //then it's being used so it's 'active'
    if (sortBy === sortByOption) {
      return 'active';
    }
    else {
      return '';
    }
  }

  // sets the state of sortBy to the parameter sortByOption
  const handleSortByChange = sortByOption => {
    setSortBy(sortByOption);
  }

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

  }

  /**
   * Purpose: dynamically creates the list items needed to
   * display the sort options 
   * Iterate through the keys and values of object sortByOptions and
   * return a list item
   */
  const renderSortByOptions = () => {
    // keys() method is to access the KEYS
    // iterate through the KEYS as an array using the map() method
    return Object.keys(sortByOptions).map(sortByOption => {
      // now in the map() method, it's storing the VALUE of each KEY 
      // in a variable sortByOptionValue as an array
      // sortByOptions[sortByOption] = VALUE of KEY
      // sortByOptionValue = ['best_match', 'rating', 'review_count']
      let sortByOptionValue = sortByOptions[sortByOption];
      // return the array of KEYS as a list with the VALUES are the unique ID/key
      // returns list Best Match Highest Rated Most Reviewed
      // onClick is wrapped with an arrow function bc it's an event handler
      return <li className={getSortByClass(sortByOptionValue)} onClick={() => handleSortByChange(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
    });
  }

  return (
      <div className='SearchBar'>
        <h1>What's Here?</h1>
        {/* 
        the three buttons: best match, highest rated, most reviewed
         as a list
         */}
        <div className='SearchBar-sort-options'>
          <ul>
            {renderSortByOptions()}
          </ul>
        </div>
        <div className='SearchBar-fields'>
          <input placeholder='Search Businesses' className='search-business' onChange={handleTermChange}/>
          <PlacesAutocomplete
            onChange={handleLocationChange}
            value={location}
          >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Where?',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                  
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
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
        </div>
        <div className='SearchBar-submit'>
          <a href='#' onClick={handleSearch}>Let's Go</a>
        </div>
        {/* BusinessList is inhering the bussiness array/list to use */}
        <BusinessList businesses={businesses}/>
      </div>
    )
}