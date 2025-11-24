import React, { useState, useMemo } from "react";
import EmployeeGrid from "./EmployeeGrid";
import EmployeeTileView from "./EmployeeTileView";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import ViewToggle from "./ViewToggle";
import { useEmployees } from "../../hooks/useEmployees";

const EmployeePage = ({ role }) => {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const { employees, meta, loading, error } = useEmployees(page);

  const selectedEmployee = useMemo(
    () => employees.find((e) => e.id === selectedId),
    [employees, selectedId]
  );

  if (loading && !meta) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="employees-page">
      <div className="toolbar">
        <h2>Employees</h2>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {view === "grid" ? (
        <EmployeeGrid employees={employees} onRowClick={setSelectedId} />
      ) : (
        <EmployeeTileView
          employees={employees}
          role={role}
          onOpenDetails={setSelectedId}
        />
      )}

      {meta && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          <button
            disabled={page === meta.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
};

export default EmployeePage;
