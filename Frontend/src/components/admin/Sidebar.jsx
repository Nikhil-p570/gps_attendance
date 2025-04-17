import React from 'react';
import { FaMapMarkerAlt, FaUsers, FaFilter, FaClipboardCheck, FaChartBar, FaCog, FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', icon: <FaHome />, path: '/admin/dashboard' },
    { name: 'Location Set', icon: <FaMapMarkerAlt />, path: '/admin/location' },
    { name: 'Attendance', icon: <FaClipboardCheck />, path: '/admin/attendance' },
    { name: 'Filter Attendance', icon: <FaFilter />, path: '/admin/filter' },
    { name: 'Manual Marking', icon: <FaUsers />, path: '/admin/manual' },
    { name: 'Reports', icon: <FaChartBar />, path: '/admin/reports' },
    { name: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col shadow-lg fixed left-0 top-0">
      <div className="text-2xl font-bold text-center py-6 border-b border-gray-600">Admin Panel</div>
      <div className="flex-1 px-4 py-6 space-y-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-200 ${
                isActive ? 'bg-blue-600' : ''
              }`
            }
          >
            <span className="text-lg mr-3">{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;