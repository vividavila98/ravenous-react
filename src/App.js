import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';

// business object is in App.js to pass it down to
// the appropriate Child components
// this is a business template
const business = {
  imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
  name: 'MarginOtto Pizzeria',
  address: '1010 Paddington Way',
  city: 'Flavortown',
  state: 'NY',
  zipCode: '10101',
  category: 'Italian',
  rating: 4.5,
  reviewCount: 90
}

// this is a LIST of the businesses
// moved from BusinessList to here so that it can be passed around
const businesses = [business, business, business, business, business, business];

class App extends Component{

  // simulates what a search might look like once the button Lets Go is clicked
  searchYelp(term, location, sortBy) {
    console.log(`Searching Yelp with ${term}, ${location}, ${sortBy}`);
  }

  render() {
    return (
      <div className='App'>
        <h1>Ravenous</h1>
        <SearchBar searchYelp={this.searchYelp}/>
        {/* BusinessList is inhering the bussiness array/list to use */}
        <BusinessList businesses={businesses}/>
      </div>
    );
  }
}

export default App;
