import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const TextQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  answersArray,
  setAnswersArray,
}) => {
  const [textAnswer, setTextAnswer] = useState(question.answer || "");
  return (
    <div className="component-container">
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.question}</p>
      <div className="module-component">
        <textarea
          name="reponse-text"
          cols="30"
          rows="10"
          value={question.answer}
          onChange={(e) => {
            setTextAnswer(e.target.value);
            question.answer = e.target.value;
          }}></textarea>
      </div>
      <NavButtonsComponent
        setNext={setNext}
        pages={pages}
        answerState={textAnswer}
        question={question}
        answersArray={answersArray}
        setAnswersArray={setAnswersArray}
      />
    </div>
  );
};
export default TextQuestionComponent;
