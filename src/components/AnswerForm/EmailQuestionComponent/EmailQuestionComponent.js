import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const EmailQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  questionsArrayState,
  setQuestionsArrayState,
  formData,
}) => {
  return (
    <div className="component-container">
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.question}</p>

      <div className="module-component">
        <input
          type="email"
          value={question.answer}
          onChange={(e) => {
            const copy = [...questionsArrayState];
            copy[question.index].answer = e.target.value;

            setQuestionsArrayState(copy);
          }}
        />
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
export default EmailQuestionComponent;