import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import axios from "axios";
import { motion } from 'framer-motion';

const TripDetails = () => {
  const tripData = useSelector((state) => state.data?.data);
  const formdata = useSelector((state) => state.form?.formData);
  const [images, setImages] = useState([]);
  const [loader, setLoad] = useState(true);
  const apikey = "JKViSHXUr2uz2ae8DvEEfyjTyoiLoY3m8bn-yXUal30";

  useEffect(() => {
    if (!tripData?.tripDetails) return;

    const getImages = async () => {
      try {
        const url = `https://api.unsplash.com/search/photos?query=${tripData.tripDetails.location}&client_id=${apikey}`;
        const imagesResult = await axios.get(url);
        setImages(imagesResult.data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
      }
    };

    getImages();
  }, [tripData]);

  const loc = formdata.placeselected.split(",")[0];

  if (!tripData || !tripData.tripDetails || loc.toLowerCase() !== tripData.tripDetails.location.split(",")[0].toLowerCase()) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <Spinner />
        <p className="text-center text-lg text-gray-500 mt-4">Loading trip details...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="container mx-auto p-6 bg-gradient-to-b from-cyan-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Trip Summary */}
      <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-blue-300 to-blue-500 p-6 rounded-xl shadow-2xl text-white text-center">
        <h1 className="text-4xl font-bold mb-2">🌍 {tripData.tripDetails.location}</h1>
        <p className="text-lg">Duration: <strong>{tripData.tripDetails.duration}</strong> | Budget: <strong>{tripData.tripDetails.budget}</strong> | Travelers: <strong>{tripData.tripDetails.travelers}</strong></p>
      </motion.div>

      {/* Hotel Options */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6">🏨 Hotel Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tripData.hotelOptions.map((hotel, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <img src={images[index]?.urls?.regular} alt={hotel.hotelName} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-purple-800 mb-1">{hotel.hotelName}</h3>
                <p className="text-gray-600 mb-1">{hotel.hotelAddress}</p>
                <p className="text-purple-700 font-semibold">Price: {hotel.price}</p>
                <p className="text-yellow-500 font-bold mt-1">⭐ {hotel.rating}</p>
                <p className="text-gray-500 text-sm mt-2">{hotel.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6">🗺️ Itinerary</h2>
        {Object.entries(tripData.itinerary).map(([day, details], index) => (
          <motion.div key={index} whileHover={{ scale: 1.01 }} className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl shadow-2xl mb-8">
            <h3 className="text-2xl font-bold text-purple-800 mb-2">{day.toUpperCase()} - {details.theme}</h3>
            <p className="text-gray-700 font-medium mb-4">Best Time to Visit: {details.bestTimeToVisit}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {details.places.map((place, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300">
                  <img src={images[Math.floor(Math.random() * images.length)]?.urls?.regular} alt={place.placeName} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-purple-800 mb-1">{place.placeName}</h4>
                    <p className="text-gray-600 text-sm mb-1">{place.placeDetails}</p>
                    <p className="text-purple-700 font-semibold">Entry Fee: {place.ticketPricing}</p>
                    <p className="text-gray-500 text-sm mt-1">🕒 Travel Time: {place.travelTime}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TripDetails;