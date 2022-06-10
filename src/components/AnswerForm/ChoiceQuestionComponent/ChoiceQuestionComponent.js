import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const ChoiceQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  questionsArrayState,
  setQuestionsArrayState,
  formData,
  readOnly,
}) => {
  return (
    <div className="component-container">
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.value}</p>

      <div className="module-component">
        <div className="button-choice">
          <button
            className={question.answer ? "selected" : null}
            onClick={() => {
              if (!readOnly) {
                const copy = [...questionsArrayState];
                if (!copy[question.index].answer) {
                  copy[question.index].answer = true;
                  setQuestionsArrayState(copy);
                }
              }
            }}>
            Oui
          </button>
          <button
            className={question.answer ? "idle" : "selected"}
            onClick={() => {
              if (!readOnly) {
                const copy = [...questionsArrayState];

                if (copy[question.index].answer) {
                  copy[question.index].answer = false;
                  setQuestionsArrayState(copy);
                }
              }
            }}>
            Non
          </button>
        </div>
      </div>

      <NavButtonsComponent
        setNext={setNext}
        pages={pages}
        question={question}
        next={next}
        questionsArrayState={questionsArrayState}
        setQuestionsArrayState={setQuestionsArrayState}
        formData={formData}
      />
    </div>
  );
};
export default ChoiceQuestionComponent;
