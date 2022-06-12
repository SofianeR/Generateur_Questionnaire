import React from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderFormComponent = ({
  titleForm,
  setTitleForm,
  setErrorMessage,
  setQuestions,
  saveForm,
  formSubmitFunction,
  deleteFunction,
}) => {
  return (
    <div className="header-create">
      <Link className="go-back-link" to={"/backoffice"}>
        <div className="go-back">
          <FontAwesomeIcon icon={"fa-chevron-left"} />
          <p>Formulaire</p>
        </div>
      </Link>

      <div className="title">
        <input
          type="text"
          value={titleForm}
          onChange={(e) => {
            setTitleForm(e.target.value);
          }}
          placeholder="Veuillez renseigner un nom de formulaire"
        />
      </div>
      <div className="title-buttons">
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteFunction();
          }}>
          Supprimer
        </button>
        <button
          className="save-button"
          onClick={(e) => {
            e.preventDefault();
            formSubmitFunction();
          }}>
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default HeaderFormComponent;
