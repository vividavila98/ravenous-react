import React from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';

function App() {
  return (
    <div className='App'>
      <h1>Ravenous</h1>
      <SearchBar />
      <BusinessList />
    </div>
  );
}

export default App;
