import React from "react";

// import packages
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BackOffice = () => {
  return (
    <div className="container-backOffice">
      <h1>Formulaires</h1>
      <div className="formulaire-container">
        <Link className="add-formulaire" to={"/backoffice/create"}>
          <FontAwesomeIcon icon={"fa-plus"} size={"2x"} color={"white"} />
          <p>Nouveau formulaire</p>
        </Link>
      </div>
    </div>
  );
};

export default BackOffice;
