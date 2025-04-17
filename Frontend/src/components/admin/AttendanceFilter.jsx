import React, { useState } from "react";

const AttendanceFilter = () => {
  const [filter, setFilter] = useState("");
  const [students, setStudents] = useState([
    { name: "Aarav Sharma", attendance: 80 },
    { name: "Diya Patel", attendance: 65 },
    { name: "Rohan Mehta", attendance: 90 },
    { name: "Sneha Iyer", attendance: 45 },
    { name: "Kabir Verma", attendance: 28 },
  ]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    if (!filter) return true;
    const value = parseInt(filter.replace(">", ""));
    return student.attendance > value;
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Filter Attendance</h2>
      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 p-2 rounded-md text-gray-700"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value=">75">Above 75%</option>
          <option value=">50">Above 50%</option>
          <option value=">30">Above 30%</option>
        </select>
      </div>

      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 border border-gray-300">Student Name</th>
            <th className="p-3 border border-gray-300">Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200">{student.name}</td>
              <td className="p-3 border border-gray-200">{student.attendance}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceFilter;
