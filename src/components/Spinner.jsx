import React from "react";
import "./Spinner.css"; // Importer le fichier CSS pour le spinner

// Composant Spinner
const Spinner = ({ size = 16, color = "#cececeff" }) => {
  return (
    <>
      <div
        className="loader"
        style={{ width: size, height: size, color: color }}
      >
        <div className="loader-inner" />
      </div>
    </>
  );
};

export default Spinner;
