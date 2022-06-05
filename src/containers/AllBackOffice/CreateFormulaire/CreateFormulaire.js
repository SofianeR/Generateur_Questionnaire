import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// import package
import { Link, useNavigate } from "react-router-dom";

const CreateFormulaire = () => {
  // navigation
  const navigate = useNavigate();
  return (
    <div className="create-container">
      <form className="header-create">
        <Link className="go-back-link" to={"/backoffice"}>
          <div className="go-back">
            <FontAwesomeIcon icon={"fa-chevron-left"} />
            <p>Formulaire</p>
          </div>
        </Link>
        <div className="title">
          <input
            type="text"
            placeholder="Veuillez renseigner un nom de formulaire"
          />
        </div>
        <div className="title-buttons">
          <button>Supprimer</button>
          <input type="submit" value={"Sauvegarder"} />
        </div>
      </form>
    </div>
  );
};

export default CreateFormulaire;
