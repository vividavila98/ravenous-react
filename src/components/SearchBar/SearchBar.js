import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '', // business term searched
      location: '', // location searched
      sortBy: 'best_match' // default search is best_match
    };
    
    // KEYS are string text to display and VALUE is for the API
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count'
    };
  }

  // returns the current CSS class for a sorting option: either it's active
  // or it's nothing. 
  getSortByClass = (sortByOption) => {
    // if the sortByOption is the same as the state value, 
    //then it's being used so it's 'active'
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    else {
      return '';
    }
  }

  // sets the state of sortBy to the parameter sortByOption
  handleSortByChange = (sortByOption) => {
    this.setState({sortBy: sortByOption});
    console.log(`sorted by ${this.state.sortBy}`);
  }

  // this is going to be triggered when something is typed into business text field
  // what is passed in is an event OBJECT, and what is typed is extracted from this
  // using event.target.value
  handleTermChange = (event) => {
    this.setState({term: event.target.value});
    console.log(`term is ${this.state.term}`);
  }

  // same logic as handleTermChange
  handleLocationChange = (event) => {
    this.setState({location: event.target.value});
    console.log(`location is ${this.state.location}`);
  }

  // triggered when Lets Go button is clicked
  handleSearch = (event) => {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    event.preventDefault();
  }

  /**
   * Purpose: dynamically creates the list items needed to
   * display the sort options 
   * Iterate through the keys and values of object sortByOptions and
   * return a list item
   */
  renderSortByOptions = () => {
    // keys() method is to access the KEYS
    // iterate through the KEYS as an array using the map() method
    return Object.keys(this.sortByOptions).map(sortByOption => {
      // now in the map() method, it's storing the VALUE of each KEY 
      // in a variable sortByOptionValue as an array
      // sortByOptions[sortByOption] = VALUE of KEY
      // sortByOptionValue = ['best_match', 'rating', 'review_count']
      let sortByOptionValue = this.sortByOptions[sortByOption];
      // return the array of KEYS as a list with the VALUES are the unique ID/key
      // returns list Best Match Highest Rated Most Reviewed
      // onClick is wrapped with an arrow function bc it's an event handler
      return <li className={this.getSortByClass(sortByOptionValue)} onClick={() => this.handleSortByChange(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
    });
  }

  render() {
    return (
      <div className='SearchBar'>
        {/* 
        the three buttons: best match, highest rated, most reviewed
         as a list
         */}
        <div className='SearchBar-sort-options'>
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className='SearchBar-fields'>
          <input placeholder='Search Businesses' onChange={this.handleTermChange}/>
          <input placeholder='Where?' onChange={this.handleLocationChange}/>
        </div>
        <div className='SearchBar-submit'>
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;