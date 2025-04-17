``// frontend/src/pages/admin/LocationSet.jsx

import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../admin/adminDashboard.css";
const LocationMarker = ({ setCenter }) => {
  useMapEvents({
    click(e) {
      setCenter(e.latlng);
    },
  });
  return null;
};

const LocationSet = () => {
  const [center, setCenter] = useState({ lat: 17.385044, lng: 78.486671 }); // default: Hyderabad
  const [radius, setRadius] = useState(300);

  return (
    <div className="location-set-container p-4">
      <h2 className="text-3xl font-bold mb-4 text-center">📍 Location Set</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-medium mb-1">Radius (meters):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="p-2 border rounded w-full"
            min={50}
          />
        </div>

        <MapContainer
          center={center}
          zoom={17}
          style={{ height: "500px", width: "100%", borderRadius: "10px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle center={center} radius={radius} color="blue" />
          <LocationMarker setCenter={setCenter} />
        </MapContainer>

        <div className="text-sm mt-2 text-gray-600">
          📌 Click on the map to change center. Current Center:{" "}
          <strong>
            {center.lat.toFixed(5)}, {center.lng.toFixed(5)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default LocationSet;
