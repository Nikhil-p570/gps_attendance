import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";            // ✅ Updated path
import Register from "../pages/Register";      // ✅ Updated path
import AdminDashboard from "../pages/AdminDashboard";
import StudentDashboard from "../pages/StudentDashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
    </Routes>
  );
};

export default AppRouter;
