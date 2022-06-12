import React from "react";

import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AnswersHeaderComponent = ({ deleteAllAnswerForm, csvArray }) => {
  return (
    <div className="header-reponses">
      <Link className="toHome" to={"/backoffice"}>
        <div>
          <FontAwesomeIcon icon={"fa-chevron-left"} />
          <p>Formulaire</p>
        </div>
      </Link>
      <div className="reponse-delete-div">
        <button className="suppr-button" onClick={deleteAllAnswerForm}>
          Supprimer toutes les réponses
        </button>

        {csvArray && (
          <CSVLink className="button-light-green" data={csvArray}>
            Exporter en csv
          </CSVLink>
        )}
      </div>
    </div>
  );
};

export default AnswersHeaderComponent;
