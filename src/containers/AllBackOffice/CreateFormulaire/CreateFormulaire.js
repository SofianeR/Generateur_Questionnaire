import React, { useState, useRef, useEffect } from "react";

// import package
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateFormulaire = () => {
  // navigation
  const navigate = useNavigate();

  // state error display
  const [errorMessage, setErrorMessage] = useState("");

  // state title form
  const [titleForm, setTitleForm] = useState("");

  // state questions to display
  const [questions, setQuestions] = useState([]);

  // state value / type question
  const [textQuestion, setTextQuestion] = useState([]);
  const [rateQuestion, setRateQuestion] = useState([]);
  const [emailQuestion, setEmailQuestion] = useState([]);
  const [choiceQuestion, setChoiceQuestion] = useState([]);

  const addTextQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const arrayTextQuestion = [...textQuestion];

    const index = textQuestion.length;

    let valueNewQuestion = { index: "", question: "" };

    arrayTextQuestion.push(valueNewQuestion);
    setTextQuestion(arrayTextQuestion);

    arrayQuestionsForm.push({
      index: index,
      value: "",
      type: "text",
      icon: "fa-file-lines",
      state: setTextQuestion,
      array: textQuestion,
      backGround: "#F5BA49",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addRateQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const arrayRateQuestion = [...rateQuestion];

    const index = rateQuestion.length;

    let valueNewQuestion = { index: "", question: "" };

    arrayRateQuestion.push(valueNewQuestion);
    setRateQuestion(arrayRateQuestion);

    arrayQuestionsForm.push({
      index: index,
      value: "",
      type: "rate",
      icon: "fa-star",
      state: setRateQuestion,
      array: textQuestion,
      backGround: "#F09F97",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addEmailQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const arrayEmailQuestion = [...emailQuestion];

    const index = emailQuestion.length;

    let valueNewQuestion = { index: "", question: "" };

    arrayEmailQuestion.push(valueNewQuestion);
    setEmailQuestion(arrayEmailQuestion);

    arrayQuestionsForm.push({
      index: index,
      value: "",
      type: "email",
      icon: "fa-envelope",
      state: setEmailQuestion,
      array: emailQuestion,
      backGround: "#79A5DD",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addChoiceQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const arrayChoiceQuestion = [...choiceQuestion];

    const index = choiceQuestion.length;

    let valueNewQuestion = { index: "", question: "" };

    arrayChoiceQuestion.push(valueNewQuestion);
    setChoiceQuestion(arrayChoiceQuestion);

    arrayQuestionsForm.push({
      index: index,
      value: "",
      type: "choice",
      icon: "fa-question",
      state: setChoiceQuestion,
      array: choiceQuestion,
      backGround: "#9ACE83",
    });
    setQuestions(arrayQuestionsForm);
  };

  // function to send form to database
  const saveForm = async () => {
    setErrorMessage("");
    try {
      if (titleForm.length > 6) {
        questions.map((question, index) => {
          if (question.type === "text") {
            const copy = [...textQuestion];
            copy[question.index].index = index;
            question.state(copy);
          } else if (question.type === "rate") {
            const copy = [...rateQuestion];
            copy[question.index].index = index;
            question.state(copy);
          }
          if (question.type === "choice") {
            const copy = [...choiceQuestion];
            copy[question.index].index = index;
            question.state(copy);
          }
          if (question.type === "email") {
            const copy = [...emailQuestion];
            copy[question.index].index = index;
            question.state(copy);
          }
        });

        for (let i = 0; i < textQuestion.length; i++) {
          if (!textQuestion[i]) {
            return setErrorMessage(
              "un des champs d'un question texte est vide"
            );
          }
        }

        for (let i = 0; i < rateQuestion.length; i++) {
          if (!rateQuestion[i]) {
            return setErrorMessage("un des champs d'un question note est vide");
          }
        }

        for (let i = 0; i < emailQuestion.length; i++) {
          if (!emailQuestion[i]) {
            return setErrorMessage(
              "un des champs d'un question Email est vide"
            );
          }
        }

        for (let i = 0; i < choiceQuestion.length; i++) {
          if (!choiceQuestion[i]) {
            return setErrorMessage(
              "un des champs d'un question OUI/NON est vide"
            );
          }
        }

        const slug = titleForm.split(" ").join("-");

        const response = await axios.post("http://localhost:4000/createForm", {
          slug,
          titleForm,
          textQuestion,
          rateQuestion,
          choiceQuestion,
          emailQuestion,
        });
        // console.log(response.data);

        navigate("/backoffice");
      } else {
        setErrorMessage("votre titre doit faire plus de 6 caracteres");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="create-container">
      <form
        className="header-create"
        onSubmit={(e) => {
          e.preventDefault();
          saveForm();
        }}>
        <Link className="go-back-link" to={"/backoffice"}>
          <div className="go-back">
            <FontAwesomeIcon icon={"fa-chevron-left"} />
            <p>Formulaire</p>
          </div>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(
              // questions,
              textQuestion,
              rateQuestion,
              choiceQuestion,
              emailQuestion
            );
          }}>
          console
        </button>
        <div className="title">
          <input
            type="text"
            value={titleForm}
            onChange={(e) => {
              setTitleForm(e.target.value);
            }}
            placeholder="Veuillez renseigner un nom de formulaire"
          />
        </div>
        <div className="title-buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              setTitleForm("");
              setErrorMessage("");
              setQuestions([]);
              setTextQuestion([]);
              setChoiceQuestion([]);
              setEmailQuestion([]);
              setRateQuestion([]);
            }}>
            Supprimer
          </button>
          <input type="submit" value={"Sauvegarder"} />
        </div>
      </form>
      {errorMessage && (
        <div className="div-alert">
          <p className="message-alert">{errorMessage}</p>
        </div>
      )}
      <div className="main-create">
        <div className="main-title">
          <h3 className="question">Questions</h3>
          <h3 className="custom">Personnaliser le formulaire</h3>
        </div>
        {questions &&
          questions.map((item, index) => {
            return (
              <div className="question-div" key={index}>
                <div
                  className="type"
                  style={{ backgroundColor: item.backGround }}>
                  <p>{`${index + 1}`}</p>
                  <p>-</p>
                  <FontAwesomeIcon className="icon" icon={item.icon} />
                </div>
                <div className="input-div">
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      if (item.type === "text") {
                        const copy = [...textQuestion];

                        copy[item.index].question = e.target.value;
                        // copy[item.index].index = index;

                        item.value = e.target.value;
                        item.index = index;

                        item.state(copy);
                      } else if (item.type === "rate") {
                        const copy = [...rateQuestion];

                        copy[item.index].question = e.target.value;
                        // copy[item.index].index = index;

                        item.value = e.target.value;
                        // item.index = index;

                        item.state(copy);
                      } else if (item.type === "email") {
                        const copy = [...emailQuestion];

                        copy[item.index].question = e.target.value;
                        // copy[item.index].index = index;

                        item.value = e.target.value;
                        // item.index = index;

                        item.state(copy);
                      } else if (item.type === "choice") {
                        const copy = [...choiceQuestion];

                        copy[item.index].question = e.target.value;
                        // copy[item.index].index = index;

                        item.value = e.target.value;
                        // item.index = index;

                        item.state(copy);
                      }
                    }}
                  />
                </div>
                <div className="question-buttons">
                  <div className="up-chevron">
                    <FontAwesomeIcon
                      className="icon"
                      icon={"fa-angle-up"}
                      onClick={() => {
                        const copyQuestions = [...questions];
                        if (index > 0) {
                          copyQuestions.splice(index, 1);
                          copyQuestions.splice(index - 1, 0, item);
                          setQuestions(copyQuestions);
                        }
                      }}
                    />
                  </div>
                  <div className="down-chevron">
                    <FontAwesomeIcon
                      className="icon"
                      icon={"fa-angle-down"}
                      onClick={() => {
                        const copyQuestions = [...questions];
                        if (index < questions.length - 1) {
                          copyQuestions.splice(index, 1);
                          copyQuestions.splice(index + 1, 0, item);
                        }
                        setQuestions(copyQuestions);
                      }}
                    />
                  </div>
                  <div className="delete-button">
                    <FontAwesomeIcon
                      className="icon"
                      icon={"fa-trash"}
                      onClick={() => {
                        const copyQuestions = [...questions];
                        copyQuestions.splice(index, 1);
                        setQuestions(copyQuestions);

                        if (item.type === "text") {
                          const copy = [...textQuestion];
                          copy.splice(item.index, 1);
                          item.state(copy);
                        } else if (item.type === "rate") {
                          const copy = [...rateQuestion];
                          copy.splice(item.index, 1);
                          item.state(copy);
                        } else if (item.type === "email") {
                          const copy = [...emailQuestion];
                          copy.splice(item.index, 1);
                          item.state(copy);
                        } else if (item.type === "choice") {
                          const copy = [...choiceQuestion];
                          copy.splice(item.index, 1);
                          item.state(copy);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        <div className="add-question">
          <div className="question-item" onClick={addTextQuestion}>
            <FontAwesomeIcon className="icon" icon={"fa-file-lines"} />
            <p>Ajouter une question Texte</p>
          </div>

          <div className="question-item" onClick={addRateQuestion}>
            <FontAwesomeIcon className="icon" icon={"fa-star"} />
            <p>Ajouter une question Note</p>
          </div>

          <div className="question-item" onClick={addEmailQuestion}>
            <FontAwesomeIcon className="icon" icon={"fa-envelope"} />
            <p>Ajouter une question Email</p>
          </div>

          <div className="question-item" onClick={addChoiceQuestion}>
            <FontAwesomeIcon className="icon" icon={"fa-question"} />
            <p>Ajouter une question Oui/Non</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormulaire;
