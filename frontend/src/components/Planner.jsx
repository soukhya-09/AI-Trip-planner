import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFormData } from "../Redux/formSlice";
import { data, alongdata } from "./Budget";

const Planner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [placeid, setPlaceId] = useState("");
  const API_URL = "https://maps.gomaps.pro/maps/api/place/autocomplete/json";
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [formdata, setFormDataState] = useState({
    budget: "",
    along: "",
    time: "",
    placeselected:"",
    placeid:""
  });

  const handleInputChange = (e) => {
    setInput(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleFormChange = (e) => {
    const updatedFormData = { ...formdata, [e.target.name]: e.target.value };
    setFormDataState(updatedFormData);
    dispatch(setFormData(updatedFormData)); 
  };

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(API_URL, {
        params: { input: value, key: API_KEY },
      });
      setSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSelect = (place) => {
    setPlaceId(place.place_id);

    setInput(place.description);
    const updatedFormData = { ...formdata, placeselected: place.description ,placeid:place.place_id};
    setFormDataState(updatedFormData);
    dispatch(setFormData(updatedFormData)); 
    console.log(place.description);
    setSuggestions([]);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-center text-3xl text-red-500 pb-3 font-semibold">
        Tell Us Your Preference
      </h1>
      <h2 className="pb-3 text-center text-lg">
        Provide some basic information about the trip so AI can generate the best trip plans for you! ❤️
      </h2>

      <div className="flex justify-center w-full">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full flex flex-col items-center space-y-4"
        >
          {/* Destination Input */}
          <div className="relative w-80">
            <h1 className="font-bold mb-1">What is the destination of your choice?</h1>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter a location..."
              className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-400"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border mt-1 rounded-md shadow-md w-full z-10">
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
          </div>

     
          <div className="w-80">
            <h1 className="font-bold">How many days are you planning the trip?</h1>
            <input
              name="time"
              type="number"
              onChange={handleFormChange}
              placeholder="Enter a time period..."
              className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-400"
            />
          </div>

    
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold pl-12">
              What is your budget?
              <p className="text-sm font-thin">Budget is exclusively allocated for activities and dining purposes.</p>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full max-w-2xl">
              {data.map((ele, id) => (
                <div
                  key={id}
                  onClick={() => handleFormChange({ target: { name: "budget", value: ele.budget } })}
                  className={`p-4 border hover:bg-slate-400 rounded-lg shadow-lg hover:cursor-pointer text-center ${
                    formdata.budget === ele.budget ? "bg-gray-400 border-black" : "bg-white"
                  }`}
                >
                  <h1 className="text-lg font-bold">{ele.budget}</h1>
                  <h2 className="text-sm">{ele.desc}</h2>
                  <h3 className="text-xl">{ele.icon}</h3>
                </div>
              ))}
            </div>
          </div>

    
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold pl-12">
              Who are you traveling with?
              <p className="text-sm font-thin">Choose the people you will travel with.</p>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full max-w-2xl">
              {alongdata.map((ele, id) => (
                <div
                  key={id}
                  onClick={() => handleFormChange({ target: { name: "along", value: ele.people } })}
                  className={`p-4 border hover:bg-slate-400 rounded-lg shadow-lg hover:cursor-pointer text-center ${
                    formdata.along === ele.people ? "bg-gray-400 border-black" : "bg-white"
                  }`}
                >
                  <h1 className="text-lg font-bold">{ele.people}</h1>
                  <h2 className="text-sm">{ele.desc}</h2>
                  <h3 className="text-xl">{ele.icon}</h3>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Planner;
