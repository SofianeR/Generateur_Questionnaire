import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const RateQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  answersArray,
  setAnswersArray,
}) => {
  const [rateAnswer, setRateAnswer] = useState(question.answer || "");
  return (
    <div className="component-container">
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.question}</p>

      <div className="module-component">
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>

      <NavButtonsComponent
        setNext={setNext}
        pages={pages}
        answerState={rateAnswer}
        question={question}
        answersArray={answersArray}
        setAnswersArray={setAnswersArray}
      />
    </div>
  );
};
export default RateQuestionComponent;
