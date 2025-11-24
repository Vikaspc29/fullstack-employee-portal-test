import React, { useState } from "react";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);

  return (
    <div className="hamburger-wrapper">
      <button
        className="hamburger-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open main menu"
      >
        ☰
      </button>
      {open && (
        <nav className="hamburger-menu">
          <button className="submenu-trigger">Dashboard</button>
          <button className="submenu-trigger">Employees</button>
          <div>
            <button
              className="submenu-trigger"
              onClick={() => setOpenSub((prev) => !prev)}
            >
              Reports ▾
            </button>
            {openSub && (
              <div className="submenu">
                <button className="submenu-trigger">Monthly</button>
                <button className="submenu-trigger">Yearly</button>
              </div>
            )}
          </div>
          <button className="submenu-trigger">Settings</button>
        </nav>
      )}
    </div>
  );
};

export default HamburgerMenu;
