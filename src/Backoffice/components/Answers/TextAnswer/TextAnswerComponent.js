import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextAnswerComponent = ({ question }) => {
  return (
    <div className="reponse-title">
      <div style={{ backgroundColor: "#F5BA49" }} className="icon-container">
        <p>{question.index + 1}</p>
        <p>-</p>
        <FontAwesomeIcon icon={"fa-file-lines"} />
      </div>
      <div className="reponse">
        <h4>{question.value}</h4>
        <p>{question.answer}</p>
      </div>
    </div>
  );
};
export default TextAnswerComponent;
