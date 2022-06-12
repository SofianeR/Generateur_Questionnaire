import React, { useEffect, useState } from "react";

import NavButtonsComponent from "../Nav-Buttons/NavButtonsComponent";

const RateQuestionComponent = ({
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
  const [rateDisplay, setRateDisplay] = useState([]);

  useEffect(() => {
    const rateStar = () => {
      const displayArray = [...rateDisplay];
      for (let i = 0; i < 5; i++) {
        displayArray.push(<p key={i}>{i + 1}</p>);
      }
      setRateDisplay(displayArray);
    };
    rateStar();
  }, []);

  return (
    <div className="module-component">
      <div className="rate-container">
        {rateDisplay &&
          rateDisplay.map((rate, index) => {
            return (
              <div
                className={
                  Number(rate.key) === rateDisplay.length - 1
                    ? "last-block"
                    : Number(rate.key) === 0
                    ? "first-block"
                    : null
                }
                style={
                  question.answer - 1 === Number(rate.key)
                    ? { backgroundColor: primaryTheme, color: "white" }
                    : { backgroundColor: secondaryTheme, color: textTheme }
                }
                key={index}
                onClick={() => {
                  if (!readOnly) {
                    const copy = [...questionsArrayState];
                    copy[question.index].answer = index + 1;
                    setQuestionsArrayState(copy);
                  }
                }}>
                {rate}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default RateQuestionComponent;
