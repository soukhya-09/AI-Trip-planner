import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { data,prompt , alongdata} from "./Budget";

import { ToastContainer, toast } from 'react-toastify';
import { chatSession } from "./Aimodel";
const Planner = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [placeselected, setPlace] = useState("");
  const [placeid, setPlaceId] = useState("");
  const API_URL = "https://maps.gomaps.pro/maps/api/place/autocomplete/json";
  const API_KEY = "AlzaSyfj6r7lIWccUAJsrJCuh8D2naaIy4WoptY"; 


  const [formdata, setdata] = useState({budget:"",along:"",time:""})
  function onchangedata(e){
setdata({
  ...formdata,
  [e.target.name]:e.target.value
})
console.log(formdata);
  }
  const handlesubmit=async()=>{
      
      if(!formdata.budget || !formdata.along|| !formdata.time  || !placeselected){
        toast("Data incomplete")
      }
      else if (!formdata.time || isNaN(formdata.time) || Number(formdata.time) <= 0) {
        toast("Invalid time duration.");
    }
    else if (!formdata.time || isNaN(formdata.time) || Number(formdata.time) <= 0 || Number(formdata.time) > 9 ) {
      toast("Invalid time duration.");
  }
    
      else{
        console.log(chatSession);
        console.log(typeof chatSession.sendMessage); 
        const final_prompt = prompt.replace('{location}',placeselected).replace('{alongwith}',formdata?.along).replace('{amountofmoney}',formdata?.budget).replace('{numberofdays}',formdata?.time)

        console.log(final_prompt);
        const result = await chatSession.sendMessage(final_prompt);
          console.log(result);
      }
    
  }
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

  useEffect(() => {
    console.log("Selected Place:", placeselected,placeid);
    console.log(formdata);
  }, [placeselected,formdata]);

  function handleSelect  (place, placeid) {
  
    setPlaceId(placeid);
    setPlace(place.description);
    setInput(place.description);
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
        <form onSubmit={(e)=>{
            e.preventDefault();
        }} className="w-full flex justify-center items-center flex-col space-y-4">
          
          <div className="relative w-80">
            <h1 className="font-bold mb-1">What is the destination of your choice?</h1>
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Enter a location..."
              className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-400"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border mt-1 rounded-md shadow-md w-full z-10">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onClick={() =>{
                     
                      handleSelect(place, place.place_id)}}
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
            onChange={onchangedata}
              type="number"
              placeholder="Enter a time period..."
              className="border p-3 w-full rounded-md focus:ring-2 focus:ring-red-400"
            />
          </div>

        
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold pl-12">
              What is your budget?
              <p className="text-sm font-thin">Budget is exclusively allocated for activities and dining purposes.</p>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full max-w-2xl  ">
              {data.map((ele, id) => (
                <div key={id}     onClick={() => setdata(prev => ({ ...prev, budget: ele.budget }))}  className={`p-4 border hover:bg-slate-400 rounded-lg shadow-lg hover:cursor-pointer text-center ${formdata.budget===ele.budget ? "bg-gray-400 border-black ":"bg-white"} `} >
                  <h1 className="text-lg font-bold">{ele.budget}</h1>
                  <h2 className="text-sm">{ele.desc}</h2>
                  <h3 className="text-xl">{ele.icon}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold pl-12">
              What is your budget?
              <p className="text-sm font-thin">Budget is exclusively allocated for activities and dining purposes.</p>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full max-w-2xl  ">
              {alongdata.map((ele, id) => (
                <div key={id}  onClick={() => setdata(prev => ({ ...prev, along: ele.people }))}  className={`p-4 border hover:bg-slate-400 rounded-lg shadow-lg hover:cursor-pointer ${formdata.along===ele.people ? "bg-gray-400 border-black":"bg-white"} text-center`}>
                  <h1 className="text-lg font-bold">{ele.people}</h1>
                  <h2 className="text-sm">{ele.desc}</h2>
                  <h3 className="text-xl">{ele.icon}</h3>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handlesubmit} className=' text-white bg-black rounded-2xl p-2  h-[35%]  hover:bg-slate-400 hover:text-black'>
            Generate Trip
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Planner;
