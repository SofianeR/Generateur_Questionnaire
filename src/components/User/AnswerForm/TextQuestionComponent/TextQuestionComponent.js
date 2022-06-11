import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const TextQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  setQuestionsArrayState,
  questionsArrayState,
  formData,
  readOnly,
  index,
}) => {
  return (
    // <div className="component-container">
    //   <p className="count-question">Question {next + "/" + pages}</p>

    //   <p className="title-question">{question.value}</p>
    <div className="module-component">
      <textarea
        readOnly={readOnly}
        name="reponse-text"
        cols="30"
        rows="10"
        value={question.answer}
        onChange={(e) => {
          const copy = [...questionsArrayState];

          copy[index].answer = e.target.value;

          setQuestionsArrayState(copy);
        }}></textarea>
    </div>
    // <NavButtonsComponent
    //   setNext={setNext}
    //   pages={pages}
    //   question={question}
    //   next={next}
    //   questionsArrayState={questionsArrayState}
    //   setQuestionsArrayState={setQuestionsArrayState}
    //   formData={formData}
    // />
    // </div>
  );
};
export default TextQuestionComponent;
