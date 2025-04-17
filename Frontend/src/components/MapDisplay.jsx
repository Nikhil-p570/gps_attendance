import React from "react";
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";

const MapDisplay = ({ userLocation, geofences }) => {
  return (
    <div className="map-wrapper">
      {userLocation ? (
        <MapContainer
          center={userLocation}
          zoom={17}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* Blue circle for student/org member */}
          <Circle
            center={userLocation}
            radius={10}
            pathOptions={{ color: "blue" }}
          />
          <Marker position={userLocation} />

          {/* Admin geofences - red circles */}
          {geofences.map((fence) => (
            <Circle
              key={fence.id}
              center={fence.center}
              radius={fence.radius}
              pathOptions={{ color: "red" }}
            />
          ))}
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default MapDisplay;
