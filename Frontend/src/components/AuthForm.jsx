import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../styles/auth.css";

const IMAGES = {
  register: [
    "https://static.vecteezy.com/system/resources/thumbnails/011/019/770/small_2x/3d-pin-point-map-gps-3d-rendering-png.png",
    "https://cdn-icons-png.flaticon.com/512/4479/4479312.png",
    "https://cdn-icons-png.flaticon.com/512/684/684809.png",
  ],
  login: [
    "https://static.vecteezy.com/system/resources/thumbnails/011/019/770/small_2x/3d-pin-point-map-gps-3d-rendering-png.png",
    "https://cdn-icons-png.flaticon.com/512/4479/4479312.png",
    "https://cdn-icons-png.flaticon.com/512/684/684809.png",
  ],
};

const AuthForm = ({ isRegister }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institution: "",
    classes: "",
    employeeId: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  // Fetch admin list if role is student or organization
  useEffect(() => {
    const fetchAdmins = async () => {
      if (isRegister && (role === "student" || role === "organization")) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/get-admins");
          setAdminList(res.data.admins);
        } catch (err) {
          console.error("Failed to fetch admins:", err);
        }
      }
    };

    fetchAdmins();
  }, [isRegister, role]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageError = () => {
    setCurrentImageIndex((prev) =>
      prev + 1 < IMAGES[isRegister ? "register" : "login"].length
        ? prev + 1
        : prev
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = isRegister ? "/auth/register" : "/auth/login";
      // const res = await axios.post(url, payload);
      const payload = isRegister
        ? {
            role,
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            institution: role === "admin" ? formData.institution : undefined,
            classes:
              role === "student"
                ? formData.classes.split(",").map((cls) => cls.trim())
                : undefined,
            organization:
              role === "organization" ? formData.employeeId : undefined,
            admins:
              role === "student" || role === "organization"
                ? selectedAdmins
                : undefined,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const res = await axios.post(url, payload);

      console.log("Auth success:", res.data);

      if (!isRegister) {
        const user = res.data.user;
        const userRole = user?.role;

        // ✅ Store user in localStorage for session access
        localStorage.setItem("user", JSON.stringify(user));

        if (userRole === "student") {
          navigate("/student-dashboard");
        } else if (userRole === "admin") {
          navigate("/admin-dashboard");
        } else if (userRole === "organization") {
          navigate("/orgmem-dashboard");
        }
      } else {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Auth error:", err);
      alert(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className={`auth-container ${isRegister ? "register-mode" : "login-mode"}`}>
      <div className="auth-image">
        <img
          src={IMAGES[isRegister ? "register" : "login"][currentImageIndex]}
          alt={isRegister ? "GPS Registration" : "Secure Login"}
          onError={handleImageError}
        />
        <div className="image-caption">
          <h3>{isRegister ? "GPS Attendance System" : "Welcome Back"}</h3>
          <p>
            {isRegister
              ? "Track attendance with geolocation precision"
              : "Sign in to access your dashboard"}
          </p>
        </div>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Create Account" : "Login"}</h2>

        {isRegister && (
          <>
            <div className="form-group">
              <label>Register as:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="role-select"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="organization">Organization Member</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {isRegister && (
          <>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {role === "admin" && (
              <div className="form-group">
                <input
                  type="text"
                  name="institution"
                  placeholder="Institution Name"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {role === "student" && (
              <div className="form-group">
                <input
                  type="text"
                  name="classes"
                  placeholder="Classes (comma separated)"
                  value={formData.classes}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {role === "organization" && (
              <div className="form-group">
                <input
                  type="text"
                  name="employeeId"
                  placeholder="Organization Name"
                  value={formData.employeeId}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {(role === "student" || role === "organization") && (
              <div className="form-group">
                <label>Select Admin(s) to Register Under:</label>
                <select
                  multiple
                  value={selectedAdmins}
                  onChange={(e) =>
                    setSelectedAdmins(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {adminList.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.fullName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}

        <button type="submit" className="submit-btn">
          {isRegister ? "Register" : "Login"}
        </button>

        <div className="auth-footer">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <a href={isRegister ? "/login" : "/register"}>
            {isRegister ? "Login" : "Register"}
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
