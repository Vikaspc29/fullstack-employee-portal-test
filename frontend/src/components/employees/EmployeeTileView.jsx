import React from "react";
import { ROLE_ADMIN, ROLE_EMPLOYEE } from "../../constants";

const EmployeeTileView = ({ employees, role, onOpenDetails }) => {
  return (
    <div className="tile-grid">
      {employees.map((e) => (
        <div key={e.id} className="tile">
          <div className="tile-header">
            <div>
              <h3>{e.name}</h3>
              <span className="badge">{e.className}</span>
            </div>
            <div className="tile-actions">
              {role === ROLE_ADMIN && (
                <>
                  <button>Edit</button>
                  <button>Flag</button>
                  <button>Delete</button>
                </>
              )}
              {role === ROLE_EMPLOYEE && <button>Flag</button>}
            </div>
          </div>
          <div className="tile-body">
            <p>Age: {e.age}</p>
            <p>Subjects: {e.subjects.join(", ")}</p>
            <p>Attendance: {e.attendance}%</p>
          </div>
          <button className="link-btn" onClick={() => onOpenDetails(e.id)}>
            View full details →
          </button>
        </div>
      ))}
    </div>
  );
};

export default React.memo(EmployeeTileView);
