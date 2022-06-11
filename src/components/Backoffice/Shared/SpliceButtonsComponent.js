import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SpliceButtonsComponent = ({
  setQuestions,
  questions,
  question,
  index,
}) => {
  return (
    <div className="question-buttons">
      <div className="up-chevron">
        <FontAwesomeIcon
          className="icon"
          icon={"fa-angle-up"}
          onClick={() => {
            const copyQuestions = [...questions];

            if (index > 0) {
              copyQuestions.splice(index, 1);

              copyQuestions.splice(index - 1, 0, question);

              setQuestions(copyQuestions);
            }
          }}
        />
      </div>
      <div className="down-chevron">
        <FontAwesomeIcon
          className="icon"
          icon={"fa-angle-down"}
          onClick={() => {
            const copyQuestions = [...questions];

            if (index < questions.length - 1) {
              copyQuestions.splice(index, 1);

              copyQuestions.splice(index + 1, 0, question);

              setQuestions(copyQuestions);
            }
          }}
        />
      </div>
      <div className="delete-button">
        <FontAwesomeIcon
          className="icon"
          icon={"fa-trash"}
          onClick={() => {
            const copyQuestions = [...questions];

            copyQuestions.splice(index, 1);

            setQuestions(copyQuestions);
          }}
        />
      </div>
    </div>
  );
};

export default SpliceButtonsComponent;
