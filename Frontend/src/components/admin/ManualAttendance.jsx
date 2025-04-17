import React, { useState } from "react";

const ManualAttendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Sharma", present: false },
    { id: 2, name: "Diya Patel", present: true },
    { id: 3, name: "Rohan Mehta", present: false },
    { id: 4, name: "Sneha Iyer", present: false },
    { id: 5, name: "Kabir Verma", present: true },
  ]);

  const handleToggle = (id) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updated);
  };

  const handleSubmit = () => {
    const marked = students.filter((s) => s.present);
    alert(`Marked present:\n${marked.map((s) => s.name).join("\n")}`);
    // Future: Send this data to backend
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manual Attendance</h2>
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border border-gray-300">Student Name</th>
            <th className="p-3 border border-gray-300">Mark Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50">
              <td className="p-3 border border-gray-200">{student.name}</td>
              <td className="p-3 border border-gray-200 text-center">
                <input
                  type="checkbox"
                  checked={student.present}
                  onChange={() => handleToggle(student.id)}
                  className="w-5 h-5 accent-green-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleSubmit}
        className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default ManualAttendance;
