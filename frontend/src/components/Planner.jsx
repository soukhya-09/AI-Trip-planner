import React, { useState } from "react";
import axios from "axios";

const Planner = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_URL = "https://maps.gomaps.pro/maps/api/place/autocomplete/json";
  const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY; 

 
  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          input: value,
          key: API_KEY,
        },
      });

      if (response.data.predictions) {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

 
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    fetchSuggestions(value);
  };

  const handleSelect = (place) => {
    setInput(place.description);
    setSuggestions([]);
  };

  return (
    <div className="w-full p-3">
      <h1 className="text-center text-3xl text-red-500 pb-3">
        Tell Us Your Preference
      </h1>
      <h2 className="pb-3 text-center text-xl">
        Provide some basic information about the trip so that the AI can generate the best trip plans for you! ❤️
      </h2>
      <div className="flex justify-center">
        <form>
          <h1 className=" font-bold">What is the destination of your choice?</h1>
          <input
          
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Enter a location..."
            className="border p-3 w-80 rounded-md"
          />
          {suggestions.length > 0 && (
            <ul className="bg-white border mt-2 rounded-md shadow-md w-80 absolute z-10">
              {suggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => handleSelect(place)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {place.description}
                </li>
              ))}
            </ul>
          )}

          <h1 className=" font-bold pt-3">How many days are you planning the trip ?</h1>
          <input
          
          type="number"
         
          
          placeholder="Enter a time period..."
          className="border p-3 w-80 rounded-md"
        />
        </form>
      </div>
    </div>
  );
};

export default Planner;
