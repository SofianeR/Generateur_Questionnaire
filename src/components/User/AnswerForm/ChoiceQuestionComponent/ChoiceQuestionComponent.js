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
  primaryTheme,
  secondaryTheme,
  textTheme,
}) => {
  console.log(question.answer);
  return (
    <div className="module-component">
      <div className="button-choice">
        <button
          className={question.answer ? "selected" : null}
          style={
            question.answer
              ? { backgroundColor: primaryTheme, color: "white" }
              : {
                  backgroundColor: secondaryTheme,
                  color: textTheme,
                  borderColor: textTheme,
                }
          }
          onClick={() => {
            const copy = [...questionsArrayState];

            if (!copy[question.index].answer) {
              copy[question.index].answer = true;
              setQuestionsArrayState(copy);
            }
          }}>
          Oui
        </button>
        <button
          // className={question.answer ? "idle" : "selected"}
          style={
            question.answer || question.answer === undefined
              ? {
                  backgroundColor: secondaryTheme,
                  color: textTheme,
                  borderColor: textTheme,
                }
              : { backgroundColor: primaryTheme, color: "white" }
          }
          onClick={() => {
            const copy = [...questionsArrayState];

            if (copy[question.index].answer) {
              copy[question.index].answer = false;
              setQuestionsArrayState(copy);
            }
            if (copy[question.index].answer === undefined) {
              copy[question.index].answer = false;
              setQuestionsArrayState(copy);
            }
          }}>
          Non
        </button>
      </div>
    </div>
  );
};
export default ChoiceQuestionComponent;
