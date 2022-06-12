import React from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const EmailQuestionComponent = ({
  pages,
  next,
  question,
  setNext,
  questionsArrayState,
  setQuestionsArrayState,
  formData,
  readOnly,
  index,
  primaryTheme,
  textTheme,
}) => {
  return (
    <div className="module-component">
      <input
        autoFocus
        placeholder="Répondez ici ..."
        style={{ outlineColor: primaryTheme, color: textTheme }}
        type="text"
        value={question.answer}
        onChange={(e) => {
          const copy = [...questionsArrayState];
          copy[index].answer = e.target.value;

          setQuestionsArrayState(copy);
        }}
      />
    </div>
  );
};
export default EmailQuestionComponent;
