import React, { useState } from 'react';
import Axios from "axios";
import {YELP_API_KEY} from '../../constants';
import './InputTerm.css';

export default function SearchTerm() {
  const [term, setTerm] = useState(' '); // business term searched
  const [termSuggestions, setTermSuggestions] = useState([]); //array of term suggestions

  const options = {
    headers: { 
      Authorization: `Bearer ${YELP_API_KEY}`
    }
  }

  const handleTermChange = e => {
    setTerm(e.target.value);
    autocompleteTerm(term);
  }

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

  return (
    <div className="input-box" style={{marginTop:"-25px"}}>
      <input value={term} placeholder='Search Businesses' className='search-business' onChange={handleTermChange}/>
      {termSuggestions.length > 1 && 
        <div className="term-container">
        {termSuggestions.map(newTerm => {
          return (
            <div className="suggestions" key={termSuggestions.indexOf(newTerm)}>
              <span onClick={() => setTerm(newTerm.text)}>{newTerm.text}</span>
            </div>
          );
        })}
      </div>}
    </div>
  )
}
