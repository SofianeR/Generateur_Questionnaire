import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateFormulaire = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formulaireData, setFormulaireData] = useState();

  //
  const [titleForm, setTitleForm] = useState("");
  const [textQuestion, setTextQuestion] = useState([]);
  const [rateQuestion, setRateQuestion] = useState([]);
  const [emailQuestion, setEmailQuestion] = useState([]);
  const [choiceQuestion, setChoiceQuestion] = useState([]);
  const [questionDisplay, setQuestionDisplay] = useState([]);

  useEffect(() => {
    const fetchFormData = async () => {
      setIsLoading(true);
      try {
        const server_url = `http://localhost:4000/form/${id}`;
        const response = await axios.get(server_url);

        const result = response.data;

        setFormulaireData(result);
        setTitleForm(result.title);

        const arrayQuestionsForm = [...questionDisplay];

        result.questions.map((item) => {
          const keys = Object.keys(item).join("");

          if (item[keys].length > 0) {
            if (keys === "textQuestion") {
              const copy = [...item[keys]];
              setTextQuestion(copy);

              copy.map((question, index) => {
                arrayQuestionsForm.push({
                  indexOrigin: index,
                  index: question.index,
                  value: question.question,
                  type: "text",
                  icon: "fa-file-lines",
                  state: setTextQuestion,
                  backGround: "#F5BA49",
                });
              });
            } else if (keys === "rateQuestion") {
              const copy = [...item[keys]];
              setRateQuestion(copy);

              copy.map((question, index) => {
                arrayQuestionsForm.push({
                  indexOrigin: index,
                  index: question.index,
                  value: question.question,
                  type: "rate",
                  icon: "fa-star",
                  state: setRateQuestion,
                  backGround: "#F09F97",
                });
              });
            } else if (keys === "emailQuestion") {
              const copy = [...item[keys]];
              setEmailQuestion(copy);

              copy.map((question, index) => {
                arrayQuestionsForm.push({
                  indexOrigin: index,
                  index: question.index,
                  value: question.question,
                  type: "email",
                  icon: "fa-envelope",
                  state: setEmailQuestion,
                  backGround: "#79A5DD",
                });
              });
            } else if (keys === "choiceQuestion") {
              const copy = [...item[keys]];
              setChoiceQuestion(copy);

              copy.map((question, index) => {
                arrayQuestionsForm.push({
                  indexOrigin: index,
                  index: question.index,
                  value: question.question,
                  type: "choice",
                  icon: "fa-question",
                  state: setChoiceQuestion,
                  backGround: "#9ACE83",
                });
              });
            }
            arrayQuestionsForm.sort((a, b) => a.index - b.index);
            setQuestionDisplay(arrayQuestionsForm);
          }
        });
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    fetchFormData();
  }, []);

  const updateForm = async () => {
    setErrorMessage("");
    try {
      if (titleForm.length > 6) {
        questionDisplay.map((question, index) => {
          if (question.type === "text") {
            const copy = [...textQuestion];
            copy[question.indexOrigin].index = index;
            question.state(copy);
          } else if (question.type === "rate") {
            const copy = [...rateQuestion];
            copy[question.indexOrigin].index = index;
            question.state(copy);
          }
          if (question.type === "choice") {
            const copy = [...choiceQuestion];
            copy[question.indexOrigin].index = index;
            question.state(copy);
          }
          if (question.type === "email") {
            const copy = [...emailQuestion];
            copy[question.indexOrigin].index = index;
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

        const response = await axios.post("http://localhost:4000/updateForm", {
          id: formulaireData._id,
          titleForm,
          slug,
          textQuestion,
          rateQuestion,
          choiceQuestion,
          emailQuestion,
        });

        navigate("/backoffice");
      } else {
        setErrorMessage("votre titre doit faire plus de 6 caracteres");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <div className="container-loading">
      <p>En cours de chargement ...</p>
    </div>
  ) : (
    <div className="container-update">
      {formulaireData && (
        <div>
          <form
            className="header-create"
            onSubmit={(e) => {
              e.preventDefault();
              updateForm();
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
                  textQuestion,
                  rateQuestion,
                  choiceQuestion,
                  emailQuestion,
                  // formulaireData,
                  questionDisplay
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
                  setErrorMessage("");
                  setTitleForm("");
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
            {/* {questionDisplay.map((item, index) => {
              const keys = Object.keys(item).join("");

              if (item[keys].length > 0) {
                return (
                  <div className="question-div" key={index}>
                    <div
                      className="type"
                      style={{
                        backgroundColor:
                          keys === "textQuestion"
                            ? "#F5BA49"
                            : keys === "rateQuestion"
                            ? "#F09F97"
                            : keys === "choiceQuestion"
                            ? "#9ACE83"
                            : keys === "emailQuestion"
                            ? "#79A5DD"
                            : null,
                      }}>
                      <p>{`${index + 1}`}</p>
                      <p>-</p>
                      <FontAwesomeIcon
                        className="icon"
                        icon={
                          keys === "textQuestion"
                            ? "fa-file-lines"
                            : keys === "rateQuestion"
                            ? "fa-star"
                            : keys === "choiceQuestion"
                            ? "fa-question"
                            : keys === "emailQuestion"
                            ? "fa-envelope"
                            : null
                        }
                      />
                    </div>
                    <div className="input-div">
                      <input
                        type="text"
                        value={item[keys]}
                        onChange={(e) => {
                          if (keys === "textQuestion") {
                            const copy = [...textQuestion];
                            copy[item.indexOrigin] = e.target.value;
                            setTextQuestion(copy);
                          } else if (keys === "rateQuestion") {
                            const copy = [...rateQuestion];
                            copy[item.indexOrigin] = e.target.value;
                            setRateQuestion(copy);
                          } else if (keys === "emailQuestion") {
                            const copy = [...emailQuestion];
                            copy[item.indexOrigin] = e.target.value;
                            setEmailQuestion(copy);
                          } else if (keys === "choiceQuestion") {
                            const copy = [...choiceQuestion];
                            copy[item.indexOrigin] = e.target.value;
                            setChoiceQuestion(copy);
                          }
                        }}
                      />
                    </div>
                    <div className="question-buttons">
                      <div className="up-chevron">
                        <FontAwesomeIcon
                          className="icon"
                          icon={"fa-angle-up"}
                        />
                      </div>
                      <div className="down-chevron">
                        <FontAwesomeIcon
                          className="icon"
                          icon={"fa-angle-down"}
                        />
                      </div>
                      <div className="delete-button">
                        <FontAwesomeIcon className="icon" icon={"fa-trash"} />
                      </div>
                    </div>
                  </div>
                );
              }
            })} */}
            {questionDisplay &&
              questionDisplay.map((item, index) => {
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

                            copy[item.indexOrigin].question = e.target.value;

                            item.value = e.target.value;

                            item.state(copy);
                          } else if (item.type === "rate") {
                            const copy = [...rateQuestion];

                            copy[item.indexOrigin].question = e.target.value;

                            item.value = e.target.value;

                            item.state(copy);
                          } else if (item.type === "email") {
                            const copy = [...emailQuestion];

                            copy[item.indexOrigin].question = e.target.value;

                            item.value = e.target.value;

                            item.state(copy);
                          } else if (item.type === "choice") {
                            const copy = [...choiceQuestion];

                            copy[item.indexOrigin].question = e.target.value;

                            item.value = e.target.value;
                            // item.indexOrigin = index;

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
                            const copyQuestions = [...questionDisplay];
                            if (index > 0) {
                              copyQuestions.splice(index, 1);
                              copyQuestions.splice(index - 1, 0, item);
                              setQuestionDisplay(copyQuestions);
                            }
                          }}
                        />
                      </div>
                      <div className="down-chevron">
                        <FontAwesomeIcon
                          className="icon"
                          icon={"fa-angle-down"}
                          onClick={() => {
                            const copyQuestions = [...questionDisplay];
                            if (index < questionDisplay.length - 1) {
                              copyQuestions.splice(index, 1);
                              copyQuestions.splice(index + 1, 0, item);
                            }
                            setQuestionDisplay(copyQuestions);
                          }}
                        />
                      </div>
                      <div className="delete-button">
                        <FontAwesomeIcon
                          className="icon"
                          icon={"fa-trash"}
                          onClick={() => {
                            const copyQuestions = [...questionDisplay];
                            copyQuestions.splice(index, 1);
                            setQuestionDisplay(copyQuestions);

                            if (item.type === "text") {
                              const copy = [...textQuestion];
                              copy.splice(item.indexOrigin, 1);
                              item.state(copy);
                            } else if (item.type === "rate") {
                              const copy = [...rateQuestion];
                              copy.splice(item.indexOrigin, 1);
                              item.state(copy);
                            } else if (item.type === "email") {
                              const copy = [...emailQuestion];
                              copy.splice(item.indexOrigin, 1);
                              item.state(copy);
                            } else if (item.type === "choice") {
                              const copy = [...choiceQuestion];
                              copy.splice(item.indexOrigin, 1);
                              item.state(copy);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateFormulaire;
