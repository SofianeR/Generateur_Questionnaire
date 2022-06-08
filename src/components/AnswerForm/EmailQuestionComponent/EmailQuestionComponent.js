import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const EmailQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  answersArray,
  setAnswersArray,
}) => {
  const [emailAnswer, setEmailAnswer] = useState(question.answer || "");
  return (
    <div className="component-container">
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.question}</p>

      <div className="module-component">
        <input
          type="text"
          value={question.answer}
          onChange={(e) => {
            setEmailAnswer(e.target.value);
          }}
        />
      </div>
      <NavButtonsComponent
        setNext={setNext}
        pages={pages}
        answerState={emailAnswer}
        question={question}
        answersArray={answersArray}
        setAnswersArray={setAnswersArray}
      />
    </div>
  );
};
export default EmailQuestionComponent;
