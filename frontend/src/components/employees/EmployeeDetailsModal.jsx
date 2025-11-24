import React from "react";

const EmployeeDetailsModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{employee.name}</h2>
        <p>
          <strong>ID:</strong> {employee.id}
        </p>
        <p>
          <strong>Age:</strong> {employee.age}
        </p>
        <p>
          <strong>Class:</strong> {employee.className}
        </p>
        <p>
          <strong>Subjects:</strong> {employee.subjects.join(", ")}
        </p>
        <p>
          <strong>Attendance:</strong> {employee.attendance}%
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetailsModal;
