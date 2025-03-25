import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const TripDetails = () => {
  const tripData = useSelector((state) => state.data?.data); // Safe access with optional chaining

  if (!tripData || !tripData.tripDetails) {
    return <p className="text-center text-lg text-gray-500">Loading trip details...</p>;
  }

  const { tripDetails, hotelOptions, itinerary } = tripData;

  return (
    <div className="container mx-auto p-6">
      {/* Trip Summary */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700">{tripDetails.location}</h1>
        <p className="text-lg text-gray-700 text-center">
          Duration: <strong>{tripDetails.duration}</strong> | Budget: <strong>{tripDetails.budget}</strong> | Travelers: <strong>{tripDetails.travelers}</strong>
        </p>
      </div>

      {/* Hotel Options */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Hotel Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotelOptions.map((hotel, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-2">{hotel.hotelName}</h3>
              <p className="text-gray-600">{hotel.hotelAddress}</p>
              <p className="text-gray-800 font-bold">Price: {hotel.price}</p>
              <p className="text-yellow-500">⭐ {hotel.rating}</p>
              <p className="text-sm text-gray-500 mt-1">{hotel.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Itinerary</h2>
        {Object.entries(itinerary).map(([day, details], index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-600">{day.toUpperCase()} - {details.theme}</h3>
            <p className="text-gray-700">Best Time to Visit: {details.bestTimeToVisit}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {details.places.map((place, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                  <img src={place.placeImageUrl} alt={place.placeName} className="w-full h-40 object-cover rounded-lg" />
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
  );
};

export default TripDetails;
