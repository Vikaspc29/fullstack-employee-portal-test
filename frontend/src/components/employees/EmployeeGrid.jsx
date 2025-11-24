import React from "react";

const EmployeeGrid = ({ employees, onRowClick }) => {
  return (
    <table className="employee-grid">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Class</th>
          <th>Subjects</th>
          <th>Attendance</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((e) => (
          <tr key={e.id} onClick={() => onRowClick(e.id)}>
            <td>{e.id}</td>
            <td>{e.name}</td>
            <td>{e.age}</td>
            <td>{e.className}</td>
            <td>{e.subjects.join(", ")}</td>
            <td>{e.attendance}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(EmployeeGrid);
