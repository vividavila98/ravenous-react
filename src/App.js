import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import {Yelp, search} from './util/Yelp.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [] };
  }


  // simulates what a search might look like once the 
  //button Lets Go is clicked
  searchYelp = (term, location, sortBy) => {
    search(term, location, sortBy)
    .then(businesses => {
      this.setState({businesses: businesses});
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>Ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        {/* BusinessList is inhering the bussiness array/list to use */}
        <BusinessList businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default App;
