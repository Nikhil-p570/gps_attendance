// frontend/src/components/admin/AttendanceOverview.jsx

import React from "react";

const AttendanceOverview = () => {
  // Dummy KPI data
  const data = {
    totalOrgMembers: 120,
    todayPresent: 95,
    averageAttendance: "87%",
    absentees: 25,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 text-center">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">Total Members</h2>
        <p className="text-3xl mt-2 text-indigo-600 dark:text-indigo-400">{data.totalOrgMembers}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 text-center">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">Today Present</h2>
        <p className="text-3xl mt-2 text-green-500 dark:text-green-400">{data.todayPresent}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 text-center">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">Avg Attendance</h2>
        <p className="text-3xl mt-2 text-yellow-500 dark:text-yellow-400">{data.averageAttendance}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 text-center">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white">Absentees</h2>
        <p className="text-3xl mt-2 text-red-500 dark:text-red-400">{data.absentees}</p>
      </div>
    </div>
  );
};

export default AttendanceOverview;
 