import React, {useState} from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import { search } from './util/Yelp.js';

export default function App () {
  const [businesses, setBusinesses] = useState([]);

  // simulates what a search might look like once the 
  //button Lets Go is clicked
  const searchYelp = (term, location, sortBy) => {
    search(term, location, sortBy)
    .then(businesses => {
      setBusinesses(businesses);
    });
  }

    return (
      <div className='App'>
        <h1>Ravenous</h1>
        <SearchBar searchYelp={searchYelp}/>
        {/* BusinessList is inhering the bussiness array/list to use */}
        <BusinessList businesses={businesses}/>
      </div>
    ); 
}
