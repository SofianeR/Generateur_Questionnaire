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
      <button
        disabled={index === 0 ? true : false}
        onClick={() => {
          const copyQuestions = [...questions];

          if (index > 0) {
            copyQuestions.splice(index, 1);

            copyQuestions.splice(index - 1, 0, question);

            copyQuestions.map((question, index) => {
              return (question.index = index);
            });

            setQuestions(copyQuestions);
          }
        }}>
        <FontAwesomeIcon icon={"fa-angle-up"} />
      </button>
      <button
        disabled={question.index === questions.length - 1 ? true : false}
        className="icon-div"
        onClick={() => {
          const copyQuestions = [...questions];

          if (index < questions.length - 1) {
            copyQuestions.splice(index, 1);

            copyQuestions.splice(index + 1, 0, question);

            copyQuestions.map((question, index) => {
              return (question.index = index);
            });

            setQuestions(copyQuestions);
          }
        }}>
        <FontAwesomeIcon icon={"fa-angle-down"} />
      </button>
      <button
        className="icon"
        onClick={() => {
          const copyQuestions = [...questions];

          copyQuestions.splice(index, 1);

          setQuestions(copyQuestions);
        }}>
        <FontAwesomeIcon className="icon-trash" icon={"fa-trash"} />
      </button>
    </div>
  );
};

export default SpliceButtonsComponent;
