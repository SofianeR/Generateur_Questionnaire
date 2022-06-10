import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";

// import Component
import TextQuestionComponent from "../../components/AnswerForm/TextQuestionComponent/TextQuestionComponent";
import RateQuesitonComponent from "../../components/AnswerForm/RateQuestionComponent/RateQuestionComponent";
import EmailQuestionComponent from "../../components/AnswerForm/EmailQuestionComponent/EmailQuestionComponent";
import ChoiceQuestionComponent from "../../components/AnswerForm/ChoiceQuestionComponent/ChoiceQuestionComponent";
import FinalScreenQuestionComponent from "../../components/AnswerForm/FinalScreenForm/FinalScreenForm";

const AnswerForm = () => {
  const { state } = useLocation();
  const { formData } = state;

  const [pages, setPages] = useState(0);
  const [next, setNext] = useState(0);

  const [theme, setTheme] = useState();

  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestion = () => {
      setQuestion(JSON.parse(formData.questions));

      setPages(JSON.parse(formData.questions).length);

      setTheme(JSON.parse(formData.theme));
    };
    fetchQuestion();
  }, []);
  return (
    <div className="main-answer">
      {questions && next <= pages
        ? questions.map((question, index) => {
            if (next === 0 && index === 0) {
              return (
                <div className="form-card" key={index}>
                  <div className="card-description">
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
                  {formData.picture && (
                    <div className="img-form">
                      <img src={formData.picture} />
                    </div>
                  )}
                </div>
              );
            } else if (next === question.index + 1 && next <= pages) {
              if (question.type === "text") {
                return (
                  <TextQuestionComponent
                    key={index}
                    pages={pages}
                    next={next}
                    setNext={setNext}
                    question={question}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                    index={index}
                  />
                );
              } else if (question.type === "rate") {
                return (
                  <RateQuesitonComponent
                    key={index}
                    pages={pages}
                    next={next}
                    question={question}
                    setNext={setNext}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                  />
                );
              } else if (question.type === "email") {
                return (
                  <EmailQuestionComponent
                    key={index}
                    pages={pages}
                    next={next}
                    question={question}
                    setNext={setNext}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                    index={index}
                  />
                );
              } else if (question.type === "choice") {
                return (
                  <ChoiceQuestionComponent
                    key={index}
                    pages={pages}
                    next={next}
                    question={question}
                    setNext={setNext}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                  />
                );
              }
            }
          })
        : next === pages + 1 && (
            <FinalScreenQuestionComponent
              pages={pages}
              next={next}
              setNext={setNext}
              formData={formData}
              questionsArrayState={questions}
              setQuestionsArrayState={setQuestion}
              readOnly={false}
            />
          )}
    </div>
  );
};
export default AnswerForm;
