import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

export default function InputLocation() {
  const [location, setLocation] = useState('Los Angeles, CA'); // location searched

  const handleLocationChange = location => {
    setLocation(location);
  }

  return (
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
  )
}
