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

  const [questions, setQuestion] = useState([]);

  const [pages, setPages] = useState(0);
  const [next, setNext] = useState(0);

  // state reponses component
  const [answersArray, setAnswersArray] = useState([]);

  useEffect(() => {
    const fetchQuestion = () => {
      const arrayForSetQuestions = [];
      formData.questions.map((arrayQuestion) => {
        const keys = Object.keys(arrayQuestion).join("");

        arrayQuestion[keys].map((item) => {
          arrayForSetQuestions.push({
            index: item.index,
            question: item.question,
            answer: "",
            type: keys,
          });
        });
      });

      arrayForSetQuestions.sort((a, b) => a.index - b.index);

      setPages(arrayForSetQuestions.length);

      setQuestion(arrayForSetQuestions);
      console.log(questions);
    };
    fetchQuestion();
  }, []);
  return (
    <div className="main-answer">
      {questions && next <= pages
        ? questions.map((item, index) => {
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
                  <TextQuestionComponent
                    key={index}
                    pages={pages}
                    next={next}
                    setNext={setNext}
                    question={item}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                  />
                );
              } else if (item.type === "rateQuestion") {
                return (
                  <RateQuesitonComponent
                    key={index}
                    pages={pages}
                    next={next}
                    question={item}
                    setNext={setNext}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                  />
                );
              } else if (item.type === "emailQuestion") {
                return (
                  <EmailQuestionComponent
                    key={index}
                    pages={pages}
                    next={next}
                    question={item}
                    setNext={setNext}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    readOnly={false}
                  />
                );
              } else if (item.type === "choiceQuestion") {
                return (
                  <ChoiceQuestionComponent
                    key={index}
                    pages={pages}
                    next={next}
                    question={item}
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
