import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar'
import Navbar from '../components/admin/Navbar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;