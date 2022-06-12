import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChoiceAnswerComponent = ({ question }) => {
  return (
    <div className="reponse-title">
      <div style={{ backgroundColor: "#9ACE83" }} className="icon-container">
        <p>{question.index + 1}</p>
        <p>-</p>
        <FontAwesomeIcon icon={"fa-question"} />
      </div>
      <div className="reponse">
        <h4>{question.value}</h4>
        <div className="choice-container">
          {question.answer === "Pas de réponse" ? (
            <p style={{ width: "100%" }}>{question.answer}</p>
          ) : (
            <>
              <div
                className={
                  question.answer === true ? "selected-block" : "choice"
                }>
                <p>Oui</p>
              </div>
              <div
                className={
                  question.answer === false ? "selected-block" : "choice"
                }>
                <p>Non</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChoiceAnswerComponent;
