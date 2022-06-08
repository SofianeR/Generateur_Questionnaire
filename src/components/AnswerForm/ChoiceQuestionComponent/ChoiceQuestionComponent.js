import React, { useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const ChoiceQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  answersArray,
  setAnswersArray,
}) => {
  const [choiceAnswer, setChoiceAnswer] = useState(question.answer || "");

  return (
    <div className="component-container">
      <button onClick={() => {}}>console</button>
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.question}</p>

      <div className="module-component">
        <div className="button-choice">
          <button
            className={choiceAnswer ? "selected" : null}
            onClick={() => {
              if (!choiceAnswer) {
                setChoiceAnswer(true);
              }
            }}>
            Oui
          </button>
          <button
            className={choiceAnswer ? "idle" : "selected"}
            onClick={() => {
              if (choiceAnswer) {
                setChoiceAnswer(false);
              }
            }}>
            Non
          </button>
        </div>
      </div>

      <NavButtonsComponent
        setNext={setNext}
        pages={pages}
        answerState={choiceAnswer}
        question={question}
        answersArray={answersArray}
        setAnswersArray={setAnswersArray}
      />
    </div>
  );
};
export default ChoiceQuestionComponent;
