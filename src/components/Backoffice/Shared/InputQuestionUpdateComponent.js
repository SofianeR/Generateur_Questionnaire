import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputQuestionUpdateComponent = ({
  question,
  questions,
  setQuestions,
  index,
}) => {
  return (
    <div>
      <div
        className="type"
        style={{
          backgroundColor:
            question.type === "text"
              ? "#F5BA49"
              : question.type === "rate"
              ? "#F09F97"
              : question.type === "choice"
              ? "#9ACE83"
              : question.type === "email"
              ? "#79A5DD"
              : null,
        }}>
        <p>{`${index + 1}`}</p>
        <p>-</p>
        <FontAwesomeIcon
          className="icon"
          icon={
            question.type === "text"
              ? "fa-file-lines"
              : question.type === "rate"
              ? "fa-star"
              : question.type === "choice"
              ? "fa-question"
              : question.type === "email" && "fa-envelope"
          }
        />
      </div>

      <div className="input-div">
        <input
          type="text"
          value={question.value}
          onChange={(e) => {
            const copy = [...questions];

            copy[index].value = e.target.value;

            setQuestions(copy);
          }}
        />
      </div>
    </div>
  );
};

export default InputQuestionUpdateComponent;
