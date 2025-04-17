import React, { useEffect, useState } from "react";
import "../styles/studentDashboard.css";
import MapDisplay from "../components/MapDisplay";
// You can later create a reusable AttendanceChart component
// import AttendanceChart from "../components/AttendanceChart";

const StudentDashboard = () => {
  const [studentLocation, setStudentLocation] = useState(null);
  const [adminGeofences, setAdminGeofences] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchGeofences = async () => {
      const studentId = localStorage.getItem("userId");
  
      try {
        const res = await fetch(`http://localhost:5000/api/student/get-my-admins/${studentId}`);
        const data = await res.json();
        setAdminGeofences(data);
      } catch (err) {
        console.error("Error fetching geofences:", err);
      }
    };
  
    fetchGeofences();
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setStudentLocation(currentLocation);
        },
        (err) => {
          console.error("Location fetch failed", err);
        }
      );
    }
  
    // Attendance data (mock for now)
    setAttendanceData([
      { date: "2025-04-05", status: "Present", checkIn: "09:02", checkOut: "10:00" },
      { date: "2025-04-04", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-03", status: "Present", checkIn: "08:55", checkOut: "09:55" },
    ]);
  }, []);
  
  // Step 4: Check if outside geofence
  useEffect(() => {
    if (studentLocation && adminGeofences.length) {
      const newAlerts = [];

      adminGeofences.forEach((fence) => {
        const distance = calculateDistance(
          studentLocation.lat,
          studentLocation.lng,
          fence.center.lat,
          fence.center.lng
        );

        if (distance > fence.radius) {
          newAlerts.push(`You are outside the geofence of ${fence.name}`);
        }
      });

      setAlerts(newAlerts);
    }
  }, [studentLocation, adminGeofences]);

  // Helper: Calculate distance between two lat/lng in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const toRad = (val) => (val * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // in meters
  };

  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter((a) => a.status === "Present").length;
  const percentage = ((presentDays / totalDays) * 100).toFixed(2);

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome back! Monitor your attendance and location status here.</p>
      </header>

      {alerts.length > 0 && (
        <div className="alert-box">
          {alerts.map((a, i) => (
            <p key={i}>{a}</p>
          ))}
        </div>
      )}

      <section className="map-section">
        <MapDisplay
          userLocation={studentLocation}
          geofences={adminGeofences}
          userRole="student"
        />
      </section>

      <section className="summary-section">
        <h2>Attendance Summary</h2>
        <p><strong>Total Days:</strong> {totalDays}</p>
        <p><strong>Days Present:</strong> {presentDays}</p>
        <p><strong>Attendance %:</strong> {percentage}%</p>
        {/* <AttendanceChart data={attendanceData} /> */}
      </section>

      <section className="attendance-log">
        <h2>Past Attendance Log</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Check-In</th>
              <th>Check-Out</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((a, idx) => (
              <tr key={idx}>
                <td>{a.date}</td>
                <td>{a.status}</td>
                <td>{a.checkIn}</td>
                <td>{a.checkOut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default StudentDashboard;
