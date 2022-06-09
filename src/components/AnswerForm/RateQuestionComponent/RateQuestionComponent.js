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
}) => {
  const [rateDisplay, setRateDisplay] = useState([]);

  useEffect(() => {
    const rateStar = async () => {
      const displayArray = [...rateDisplay];
      for (let i = 0; i < 5; i++) {
        displayArray.push(<p key={i}>{i + 1}</p>);
      }
      setRateDisplay(displayArray);
    };
    rateStar();
  }, []);

  return (
    <div className="component-container">
      <p className="count-question">Question {next + "/" + pages}</p>

      <p className="title-question">{question.question}</p>

      <div className="module-component">
        <div className="rate-container">
          {rateDisplay &&
            rateDisplay.map((rate, index) => {
              return (
                <div
                  className={
                    question.answer - 1 === Number(rate.key)
                      ? "selected-rate"
                      : "rate-block"
                  }
                  style={
                    Number(rate.key) === 0
                      ? {
                          borderTopLeftRadius: "10px",
                          borderBottomLeftRadius: "10px",
                        }
                      : Number(rate.key) === rateDisplay.length - 1
                      ? {
                          borderBottomRightRadius: "10px",
                          borderTopRightRadius: "10px",
                        }
                      : null
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
export default RateQuestionComponent;
