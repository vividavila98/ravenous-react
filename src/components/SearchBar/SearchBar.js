import React, {useState} from 'react';
import './SearchBar.css';

export default function SearchBar(props) {
  const { searchYelp } = props;
  const [term, setTerm] = useState(''); // business term searched
  const [location, setLocation] = useState(''); // location searched
  const [sortBy, setSortBy] = useState('best_match'); // default search is best_match

    // KEYS are string text to display and VALUE is for the API
    const sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };

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
  const handleLocationChange = e => {
    setLocation(e.target.value);
  }

  // triggered when Lets Go button is clicked
  const handleSearch = e => {
    searchYelp(term, location, sortBy);
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
          <input placeholder='Search Businesses' onChange={handleTermChange}/>
          <input placeholder='Where?' onChange={handleLocationChange}/>
        </div>
        <div className='SearchBar-submit'>
          <a href='#' onClick={handleSearch}>Let's Go</a>
        </div>
      </div>
    )
}