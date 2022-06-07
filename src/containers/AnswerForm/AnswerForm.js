import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// import Component
import TextQuestionComponent from "../../components/AnswerForm/TextQuestionComponent/TextQuestionComponent";
import RateQuesitonComponent from "../../components/AnswerForm/RateQuestionComponent/RateQuestionComponent";
import EmailQuestionComponent from "../../components/AnswerForm/EmailQuestionComponent/EmailQuestionComponent";
import ChoiceQuestionComponent from "../../components/AnswerForm/ChoiceQuestionComponent/ChoiceQuestionComponent";

const AnswerForm = () => {
  const { state } = useLocation();
  const { formData } = state;

  const [questions, setQuestion] = useState([]);

  const [pages, setPages] = useState(0);
  const [next, setNext] = useState(0);

  useEffect(() => {
    const fetchQuestion = () => {
      const arrayForSetQuestions = [];
      formData.questions.map((arrayQuestion) => {
        const keys = Object.keys(arrayQuestion).join("");

        arrayQuestion[keys].map((item) => {
          arrayForSetQuestions.push({
            index: item.index,
            question: item.question,
            type: keys,
          });
        });
      });

      arrayForSetQuestions.sort((a, b) => a.index - b.index);

      setPages(arrayForSetQuestions.length);

      setQuestion(arrayForSetQuestions);
    };
    fetchQuestion();
  }, []);

  useEffect(() => {}, [next]);
  return (
    <div className="main-answer">
      {questions &&
        questions.map((item, index) => {
          if (next === 0 && index === 0) {
            return (
              <div className="form-card" key={index}>
                <p className="form-type">Sondage</p>
                <p className="form-title">{formData.title}</p>
                <p className="form-count">{pages} questions</p>
                <button
                  onClick={() => {
                    setNext((prevState) => prevState + 1);
                  }}
                  className="form-button">
                  Commencer
                </button>
              </div>
            );
          } else if (next === item.index + 1 && next <= pages) {
            if (item.type === "textQuestion") {
              return (
                <div className="component-container" key={index}>
                  <TextQuestionComponent pages={pages} next={next} />
                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState < pages ? prevState + 1 : prevState
                      );
                    }}>
                    click ++
                  </button>
                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState > 0 ? prevState - 1 : prevState
                      );
                    }}>
                    click --
                  </button>
                </div>
              );
            } else if (item.type === "rateQuestion") {
              return (
                <div className="component-container" key={index}>
                  <RateQuesitonComponent pages={pages} next={next} />

                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState < pages ? prevState + 1 : prevState
                      );
                    }}>
                    click ++
                  </button>
                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState > 0 ? prevState - 1 : prevState
                      );
                    }}>
                    click --
                  </button>
                </div>
              );
            } else if (item.type === "emailQuestion") {
              return (
                <div className="component-container" key={index}>
                  <EmailQuestionComponent pages={pages} next={next} />

                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState < pages ? prevState + 1 : prevState
                      );
                    }}>
                    click ++
                  </button>
                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState > 0 ? prevState - 1 : prevState
                      );
                    }}>
                    click --
                  </button>
                </div>
              );
            } else if (item.type === "choiceQuestion") {
              return (
                <div className="component-container" key={index}>
                  <ChoiceQuestionComponent pages={pages} next={next} />

                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState < pages ? prevState + 1 : prevState
                      );
                    }}>
                    click ++
                  </button>
                  <button
                    onClick={() => {
                      setNext((prevState) =>
                        prevState > 0 ? prevState - 1 : prevState
                      );
                    }}>
                    click --
                  </button>
                </div>
              );
            }
          }
        })}
    </div>
  );
};
export default AnswerForm;
