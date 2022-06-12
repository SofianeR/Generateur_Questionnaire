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
    <form
      className="header-create"
      onSubmit={(e) => {
        e.preventDefault();
        formSubmitFunction();
      }}>
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
        <input className="submit" type="submit" value={"Sauvegarder"} />
      </div>
    </form>
  );
};

export default HeaderFormComponent;
