import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RateAnswerComponent = ({ question }) => {
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
    <div className="reponse-title">
      <div style={{ backgroundColor: "#F09F97" }} className="icon-container">
        <p>{question.index + 1}</p>
        <p>-</p>
        <FontAwesomeIcon icon={"fa-star"} />
      </div>
      <div className="reponse">
        <h4>{question.value}</h4>
        <div className="rate-container">
          {rateDisplay &&
            rateDisplay.map((rate, index) => {
              return (
                <div
                  key={index}
                  className={
                    Number(rate.key) + 1 === question.answer
                      ? "selected-rate"
                      : "rate-block"
                  }>
                  {rate}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default RateAnswerComponent;
