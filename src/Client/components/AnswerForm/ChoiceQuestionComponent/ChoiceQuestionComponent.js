import React from "react";

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
  onMouseOver,
  setOnMouseOver,
}) => {
  return (
    <div className="module-component">
      <div className="button-choice">
        <button
          // className={question.answer ? "selected" : null}
          style={
            question.answer || onMouseOver[2]
              ? {
                  backgroundColor: primaryTheme,
                  color: "white",
                  border: "none",
                }
              : {
                  backgroundColor: secondaryTheme,
                  color: textTheme,
                  borderColor: textTheme,
                }
          }
          onMouseEnter={() => {
            const copyHover = [...onMouseOver];
            copyHover[2] = true;
            copyHover[3] = false;
            setOnMouseOver(copyHover);
          }}
          onMouseLeave={() => {
            const copyHover = [...onMouseOver];
            copyHover[2] = false;
            setOnMouseOver(copyHover);
          }}
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
            (question.answer === undefined && !onMouseOver[3]) ||
            (question.answer && !onMouseOver[3])
              ? {
                  backgroundColor: secondaryTheme,
                  color: textTheme,
                  borderColor: textTheme,
                }
              : {
                  backgroundColor: primaryTheme,
                  color: "white",
                  border: "none",
                }
          }
          onMouseEnter={() => {
            const copyHover = [...onMouseOver];
            copyHover[3] = true;
            copyHover[2] = false;

            setOnMouseOver(copyHover);
          }}
          onMouseLeave={() => {
            const copyHover = [...onMouseOver];
            copyHover[3] = false;
            setOnMouseOver(copyHover);
          }}
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
