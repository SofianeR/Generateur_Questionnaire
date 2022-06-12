import React, { useState, useEffect } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";

// import Component questions
import TextQuestionComponent from "../../components/AnswerForm/TextQuestionComponent/TextQuestionComponent";
import RateQuesitonComponent from "../../components/AnswerForm/RateQuestionComponent/RateQuestionComponent";
import EmailQuestionComponent from "../../components/AnswerForm/EmailQuestionComponent/EmailQuestionComponent";
import ChoiceQuestionComponent from "../../components/AnswerForm/ChoiceQuestionComponent/ChoiceQuestionComponent";
import FinalScreenQuestionComponent from "../../components/AnswerForm/FinalScreenForm/FinalScreenForm";

// import component nav
import NavButtonsComponent from "../../components/AnswerForm/Nav-Buttons/NavButtonsComponent";
import FirstScreen from "../../components/AnswerForm/FirstScreen";

const AnswerForm = () => {
  const { state } = useLocation();
  const { formData } = state;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [onMouseOver, setOnMouseOver] = useState([false, false, false, false]);

  const [pages, setPages] = useState(0);
  const [next, setNext] = useState(0);

  const [primaryTheme, setPrimaryTheme] = useState();
  const [secondaryTheme, setSecondaryTheme] = useState();
  const [textTheme, setTextTheme] = useState();

  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    const fetchQuestion = () => {
      setErrorMessage("");
      setIsLoading(true);

      setPrimaryTheme(formData.theme.primary);
      setSecondaryTheme(formData.theme.secondary);
      setTextTheme(formData.theme.text);

      setQuestion(formData.questions);

      setPages(formData.questions.length);

      setIsLoading(false);
    };
    fetchQuestion();
  }, []);

  return isLoading ? (
    <div>
      <h2>En cours de chargement...</h2>
    </div>
  ) : (
    <div className="main-answer" style={{ backgroundColor: secondaryTheme }}>
      {questions && next <= pages
        ? questions.map((question, index) => {
            return next === 0 && index === 0 ? (
              <FirstScreen
                key={index}
                formData={formData}
                pages={pages}
                primaryTheme={primaryTheme}
                textTheme={textTheme}
                setNext={setNext}
                index={index}
              />
            ) : (
              next === question.index + 1 && next <= pages && (
                <div className="component-container">
                  <p className="count-question" style={{ color: primaryTheme }}>
                    Question {next + "/" + pages}
                  </p>

                  <p className="title-question" style={{ color: textTheme }}>
                    {question.value}
                  </p>
                  {question.type === "text" ? (
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
                      primaryTheme={primaryTheme}
                      textTheme={textTheme}
                    />
                  ) : question.type === "rate" ? (
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
                      primaryTheme={primaryTheme}
                      secondaryTheme={secondaryTheme}
                      textTheme={textTheme}
                    />
                  ) : question.type === "email" ? (
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
                      primaryTheme={primaryTheme}
                      textTheme={textTheme}
                    />
                  ) : question.type === "choice" ? (
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
                      primaryTheme={primaryTheme}
                      secondaryTheme={secondaryTheme}
                      textTheme={textTheme}
                      onMouseOver={onMouseOver}
                      setOnMouseOver={setOnMouseOver}
                    />
                  ) : null}
                  <NavButtonsComponent
                    setNext={setNext}
                    pages={pages}
                    question={question}
                    next={next}
                    questionsArrayState={questions}
                    setQuestionsArrayState={setQuestion}
                    formData={formData}
                    primaryTheme={primaryTheme}
                    secondaryTheme={secondaryTheme}
                    textTheme={textTheme}
                    onMouseOver={onMouseOver}
                    setOnMouseOver={setOnMouseOver}
                  />
                </div>
              )
            );
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
              primaryTheme={primaryTheme}
              secondaryTheme={secondaryTheme}
              textTheme={textTheme}
            />
          )}
    </div>
  );
};
export default AnswerForm;
