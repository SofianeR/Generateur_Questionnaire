import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmailAnswerComponent = ({ question }) => {
  return (
    <div className="reponse-title">
      <div style={{ backgroundColor: "#79A5DD" }} className="icon-container">
        <p>{question.index + 1}</p>
        <p>-</p>
        <FontAwesomeIcon icon={"fa-envelope"} />
      </div>
      <div className="reponse">
        <h4>{question.value}</h4>
        <p>{question.answer}</p>
      </div>
    </div>
  );
};
export default EmailAnswerComponent;
