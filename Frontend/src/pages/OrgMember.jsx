import MapDisplay from "../components/MapDisplay";
import "../styles/dashboard.css";

const OrgMemberDashboard = () => {
  const geofences = [
    { center: { lat: 19.0760, lng: 72.8777 }, radius: 250 }, // Mumbai
    { center: { lat: 28.6139, lng: 77.2090 }, radius: 350 }  // Delhi
  ];

  return (
    <div className="dashboard-container">
      <h2>🏢 Org Member Dashboard</h2>
      <MapDisplay geofences={geofences} />
    </div>
  );
};

export default OrgMemberDashboard;
