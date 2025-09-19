import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFormData } from "../Redux/formSlice";
import { data, alongdata } from "./Budget";
import { motion, AnimatePresence } from "framer-motion";

const Planner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [placeid, setPlaceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const API_URL = "https://maps.gomaps.pro/maps/api/place/autocomplete/json";
  const API_KEY = process.env.REACT_APP_API_KEY;
  const debounceRef = useRef(null);
  const suggestionsRef = useRef(null);

  const [formdata, setFormDataState] = useState({
    budget: "",
    along: "",
    time: "",
    placeselected: "",
    placeid: ""
  });

  useEffect(() => {
    setFormDataState((prev) => ({ ...prev, placeselected: input }));
  }, [input]);

  useEffect(() => {
    // sync to redux whenever formdata changes
    dispatch(setFormData(formdata));
  }, [formdata, dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setHighlight(-1);
    // Debounce API calls
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(value), 350);
  };

  const handleFormChange = (e) => {
    const updatedFormData = { ...formdata, [e.target.name]: e.target.value };
    setFormDataState(updatedFormData);
  };

  const fetchSuggestions = async (value) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    if (!API_KEY) {
      toast.error("API key missing. Set REACT_APP_API_KEY in your .env");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { input: value, key: API_KEY }
      });
      setSuggestions(response.data.predictions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      toast.error("Failed to fetch place suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (place) => {
    setPlaceId(place.place_id);
    setInput(place.description);
    const updatedFormData = { ...formdata, placeselected: place.description, placeid: place.place_id };
    setFormDataState(updatedFormData);
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlight((h) => Math.max(h - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlight >= 0 && suggestions[highlight]) {
        handleSelect(suggestions[highlight]);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const submitPlan = () => {
    if (!formdata.placeselected || !formdata.time || !formdata.budget || !formdata.along) {
      toast.info("Please fill destination, days, budget and who you're travelling with.");
      return;
    }
    // navigate or call API to generate plan
    navigate("/results");
  };

  return (
    <div className="w-full p-6 bg-gradient-to-b from-white via-sky-50 to-rose-50 min-h-[70vh]">
      <div className="max-w-4xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-3xl text-rose-600 pb-3 font-semibold">
          Tell Us Your Preference
        </motion.h1>
        <motion.h2 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }} className="pb-3 text-center text-lg">
          Provide basic trip details and our AI will craft great itineraries for you! ❤️
        </motion.h2>

        <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col items-center space-y-6">
          {/* Destination Input */}
          <div className="relative w-full max-w-md">
            <label className="font-bold mb-1 block">Destination</label>
            <div className="relative">
              <input
                aria-label="Destination"
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter a location..."
                className="border p-3 w-full rounded-md focus:ring-2 focus:ring-rose-300 focus:outline-none"
              />
              <div className="absolute right-3 top-3 text-sm text-gray-500">{loading ? "Searching..." : ""}</div>
            </div>

            <div className="mt-2 relative">
              <AnimatePresence>
                {suggestions.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute bg-white border mt-1 rounded-md shadow-lg w-full z-30 max-h-56 overflow-auto"
                    ref={suggestionsRef}
                  >
                    {suggestions.map((place, idx) => (
                      <li
                        key={place.place_id}
                        onClick={() => handleSelect(place)}
                        onMouseEnter={() => setHighlight(idx)}
                        className={`p-3 cursor-pointer ${highlight === idx ? "bg-rose-50" : "hover:bg-gray-50"}`}
                      >
                        <div className="text-sm font-medium">{place.structured_formatting?.main_text || place.description}</div>
                        <div className="text-xs text-gray-500">{place.structured_formatting?.secondary_text || place.description}</div>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Days */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <label className="font-bold mb-1 block">How many days?</label>
            <input
              name="time"
              type="number"
              min={1}
              onChange={handleFormChange}
              value={formdata.time}
              placeholder="Number of days"
              className="border p-3 w-full rounded-md focus:ring-2 focus:ring-rose-300 focus:outline-none"
            />
          </motion.div>

          {/* Budget */}
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold pl-2">What is your budget?</h1>
            <p className="text-xs text-gray-600">Budget is for activities & dining only.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full max-w-2xl">
              {data.map((ele, id) => (
                <motion.div
                  key={id}
                  onClick={() => handleFormChange({ target: { name: "budget", value: ele.budget } })}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border rounded-lg shadow-sm hover:shadow-lg cursor-pointer text-center select-none ${
                    formdata.budget === ele.budget ? "bg-rose-100 border-rose-400" : "bg-white"
                  }`}
                >
                  <h1 className="text-lg font-bold">{ele.budget}</h1>
                  <h2 className="text-sm text-gray-600">{ele.desc}</h2>
                  <h3 className="text-xl mt-2">{ele.icon}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Along With */}
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold pl-2">Who are you traveling with?</h1>
            <p className="text-xs text-gray-600">Choose who you'll travel with.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full max-w-2xl">
              {alongdata.map((ele, id) => (
                <motion.div
                  key={id}
                  onClick={() => handleFormChange({ target: { name: "along", value: ele.people } })}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 border rounded-lg shadow-sm hover:shadow-lg cursor-pointer text-center select-none ${
                    formdata.along === ele.people ? "bg-rose-100 border-rose-400" : "bg-white"
                  }`}
                >
                  <h1 className="text-lg font-bold">{ele.people}</h1>
                  <h2 className="text-sm text-gray-600">{ele.desc}</h2>
                  <h3 className="text-xl mt-2">{ele.icon}</h3>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            

            <motion.button
              onClick={() => {
                setFormDataState({ budget: "", along: "", time: "", placeselected: "", placeid: "" });
                setInput("");
                setSuggestions([]);
                toast.success("Form reset");
              }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-medium shadow-lg"
            >
              Reset
            </motion.button>
          </div>
        </form>

        <ToastContainer position="bottom-right" autoClose={2500} />
      </div>
    </div>
  );
};

export default Planner;
