import themeColors from "../../../assets/themeColors.json";

import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import { CirclePicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateFormulaire = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showTheme, setShowTheme] = useState(false);

  // state theme color
  const [primaryTheme, setPrimaryTheme] = useState();
  const [selectedTheme, setSelectedTheme] = useState();

  // state theme photo
  const [formPicture, setFormPicture] = useState();

  const [titleForm, setTitleForm] = useState("");
  const [formulaireData, setFormulaireData] = useState();
  const [questions, setQuestions] = useState([]);

  //

  const addTextQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "text",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addRateQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "rate",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addEmailQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "email",
    });
    setQuestions(arrayQuestionsForm);
  };

  const addChoiceQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      index: index,

      value: "",
      type: "choice",
    });
    setQuestions(arrayQuestionsForm);
  };

  const updateForm = async () => {
    setIsLoading(true);

    setErrorMessage("");
    try {
      if (titleForm.length > 6) {
        for (let i = 0; i < questions.length; i++) {
          questions[i].index = i;
          if (questions[i].value === "") {
            return setErrorMessage("Une des questions est vide");
          }
        }

        const formData = new FormData();

        formData.append("titleForm", titleForm);
        formData.append("id", formulaireData._id);
        formData.append("questions", JSON.stringify(questions));
        formData.append("theme", JSON.stringify(selectedTheme));

        formData.append("picture", formPicture);

        const response = await axios.post(
          "http://localhost:4000/updateForm",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/backoffice");
      } else {
        setErrorMessage("Votre titre doit faire plus de 6 caracteres");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const saveColors = () => {
      const arrayPrimary = [];
      themeColors.map((item) => {
        arrayPrimary.push(item.primary);
      });

      setPrimaryTheme(arrayPrimary);
    };
    saveColors();
  }, []);

  useEffect(() => {
    const fetchFormData = async () => {
      setIsLoading(true);
      try {
        const server_url = `http://localhost:4000/form/${id}`;
        const response = await axios.get(server_url);

        setFormulaireData(response.data);

        setTitleForm(response.data.title);

        setQuestions(JSON.parse(response.data.questions));

        setSelectedTheme(JSON.parse(response.data.theme));

        console.log(questions);
      } catch (error) {
        console.log(error.message);
      }
      setIsLoading(false);
    };
    fetchFormData();
  }, []);

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
                console.log(questions);
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
              <h3
                onClick={() => {
                  setShowTheme(!showTheme);
                }}
                className="custom">
                Personnaliser le formulaire
              </h3>
            </div>
            {showTheme ? (
              <div className="theme-container">
                <div>
                  <CirclePicker
                    onChange={(color) => {
                      themeColors.map((theme, index) => {
                        if (theme.primary.toLowerCase() === color.hex) {
                          setSelectedTheme(theme);
                        }
                      });
                    }}
                    colors={primaryTheme}
                    circleSize={100}
                  />
                </div>

                <div className="picture-fetch">
                  <input
                    type="file"
                    onChange={(event) => {
                      setFormPicture(event.target.files[0]);
                    }}
                  />

                  <div className="image-preview">
                    <img
                      src={
                        formPicture
                          ? URL.createObjectURL(formPicture)
                          : formulaireData.picture && formulaireData.picture
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            ) : (
              questions.map((question, index) => {
                return (
                  <div className="question-div" key={index}>
                    <div
                      className="type"
                      style={{
                        backgroundColor:
                          question.type === "text"
                            ? "#F5BA49"
                            : question.type === "rate"
                            ? "#F09F97"
                            : question.type === "choice"
                            ? "#9ACE83"
                            : question.type === "email"
                            ? "#79A5DD"
                            : null,
                      }}>
                      <p>{`${index + 1}`}</p>
                      <p>-</p>
                      <FontAwesomeIcon
                        className="icon"
                        icon={
                          question.type === "text"
                            ? "fa-file-lines"
                            : question.type === "rate"
                            ? "fa-star"
                            : question.type === "choice"
                            ? "fa-question"
                            : question.type === "email" && "fa-envelope"
                        }
                      />
                    </div>

                    <div className="input-div">
                      <input
                        type="text"
                        value={question.value}
                        onChange={(e) => {
                          const copy = [...questions];

                          copy[index].value = e.target.value;

                          setQuestions(copy);
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

                              copyQuestions.splice(index - 1, 0, question);

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

                              copyQuestions.splice(index + 1, 0, question);
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
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
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
      )}
    </div>
  );
};
export default UpdateFormulaire;
