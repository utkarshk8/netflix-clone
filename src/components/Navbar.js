import React, { useEffect, useState } from "react";
import "./Navbar.css";
const Navbar = () => {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://th.bing.com/th/id/R.3483cbba02fe083b87330a99857f59ed?rik=ejgwaTp6m0Dv6g&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f05%2fNetflix-Logo.png&ehk=gJbypm3nuRFxW%2fGn3WbaXOcTVq6kNgynGml%2fdXD79fM%3d&risl=&pid=ImgRaw&r=0"
        alt="Netflix Logo"
      />
    </div>
  );
};
export default Navbar;
