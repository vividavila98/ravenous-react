import React, { useState } from 'react';
import './SortList.css';

export default function SortList() {
  const [sortBy, setSortBy] = useState('best_match'); // how to sort results

  // KEYS are string text to display and VALUE is for the API
  const sortByOptions = {
    'Best Match': 'best_match',
    'Highest Rated': 'rating',
    'Most Reviewed': 'review_count'
  };

  const renderSortByOptions = () => {
    // Iterate thru each key and save its value to sortByOptionValue
    return Object.keys(sortByOptions).map(sortByOption => { 
      let sortByOptionValue = sortByOptions[sortByOption];
      // On click: set sortBy state to corresponding key value
      return <button className={sortBy === sortByOptionValue ? "active" : ""} onClick={() => setSortBy(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</button>
    });
  }

  return (
    <div className='SearchBar-sort-options'>
      {renderSortByOptions()}
    </div>
  )
}
