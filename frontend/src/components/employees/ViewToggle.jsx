import React from "react";

const ViewToggle = ({ view, onChange }) => {
  return (
    <div className="view-toggle">
      <button
        className={view === "grid" ? "active" : ""}
        onClick={() => onChange("grid")}
      >
        Grid
      </button>
      <button
        className={view === "tile" ? "active" : ""}
        onClick={() => onChange("tile")}
      >
        Tile
      </button>
    </div>
  );
};

export default ViewToggle;
