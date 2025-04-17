// frontend/src/components/admin/GPSMap.jsx
import React from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const GPSMap = () => {
  // Sample coordinates and radius (customize this later)
  const center = [17.385044, 78.486671]; // Hyderabad coordinates for demo
  const radius = 300; // meters

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer center={center} zoom={16} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>Admin Location / Geofence Center</Popup>
        </Marker>
        <Circle center={center} radius={radius} pathOptions={{ fillColor: "blue", color: "blue", fillOpacity: 0.2 }} />
      </MapContainer>
    </div>
  );
};

export default GPSMap;
