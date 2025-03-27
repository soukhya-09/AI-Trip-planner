import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import axios from "axios";

const TripDetails = () => {
  const tripData = useSelector((state) => state.data?.data);
  const formdata = useSelector((state) => state.form?.formData);
  const [images, setImages] = useState([]); // Store images
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
        
      } finally {
        setLoad(false);
      }
    };

    getImages();
  }, [tripData]); 

  // 
  const loc = formdata.placeselected.split(",")[0]

  if (!tripData || !tripData.tripDetails || loc.toLowerCase() !== tripData.tripDetails.location.split(",")[0].toLowerCase() ) {
    return (
      <div className="w-full flex justify-center">
        <div>
          <Spinner />
          <p className="text-center text-lg text-gray-500">Loading trip details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loader ? (
        <div className="container mx-auto p-6">
          {/* Trip Summary */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-blue-700">{tripData.tripDetails.location}</h1>
            <p className="text-lg text-gray-700 text-center">
              Duration: <strong>{tripData.tripDetails.duration}</strong> | Budget: <strong>{tripData.tripDetails.budget}</strong> | Travelers: <strong>{tripData.tripDetails.travelers}</strong>
            </p>
          </div>

          {/* Hotel Options */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Hotel Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tripData.hotelOptions.map((hotel, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                  <img
                    src={images[0+index]?.urls?.full }
                    alt={hotel.hotelName}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mt-2">{hotel.hotelName}</h3>
                  <p className="text-gray-600">{hotel.hotelAddress}</p>
                  <p className="text-gray-800 font-bold">Price: {hotel.price}</p>
                  <p className="text-yellow-500">⭐ {hotel.rating}</p>
                  <p className="text-sm text-gray-500 mt-1">{hotel.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Itinerary</h2>
            {Object.entries(tripData.itinerary).map(([day, details], index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-600">{day.toUpperCase()} - {details.theme}</h3>
                <p className="text-gray-700">Best Time to Visit: {details.bestTimeToVisit}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {details.places.map((place, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                      <img src={images[Math.floor(Math.random()*10)]?.urls?.full} alt={place.placeName} className="w-full h-40 object-cover rounded-lg" />
                      <h4 className="text-lg font-semibold mt-2">{place.placeName}</h4>
                      <p className="text-sm text-gray-600">{place.placeDetails}</p>
                      <p className="text-gray-800 font-bold">Entry Fee: {place.ticketPricing}</p>
                      <p className="text-gray-500 text-sm">🕒 Travel Time: {place.travelTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default TripDetails;
