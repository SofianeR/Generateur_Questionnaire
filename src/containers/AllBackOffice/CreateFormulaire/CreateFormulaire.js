import React, { useState, useEffect } from "react";

import themeColors from "../../../assets/themeColors.json";

// import package
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CirclePicker, ChromePicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CreateFormulaire = () => {
  // navigation
  const navigate = useNavigate();

  //
  const [isLoading, setIsLoading] = useState(false);
  // state error display
  const [errorMessage, setErrorMessage] = useState("");

  // state modal perso
  const [showTheme, setShowTheme] = useState(false);

  // state theme color
  const [primaryTheme, setPrimaryTheme] = useState();
  const [selectedTheme, setSelectedTheme] = useState(themeColors[0]);

  // state theme photo
  const [photoTheme, setPhotoTheme] = useState();

  // state title form
  const [titleForm, setTitleForm] = useState("");

  // state questions to display
  const [questions, setQuestions] = useState([]);

  const addTextQuestion = () => {
    const arrayQuestionsForm = [...questions];
    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      icon: "fa-file-lines",
      backGround: "#F5BA49",

      question: {
        index: index,

        value: "",
        type: "text",
      },
    });
    setQuestions(arrayQuestionsForm);
  };

  const addRateQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      icon: "fa-star",
      backGround: "#F09F97",

      question: {
        index: index,

        value: "",
        type: "rate",
      },
    });
    setQuestions(arrayQuestionsForm);
  };

  const addEmailQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      icon: "fa-envelope",
      backGround: "#79A5DD",

      question: {
        index: index,

        value: "",
        type: "email",
      },
    });
    setQuestions(arrayQuestionsForm);
  };

  const addChoiceQuestion = () => {
    const arrayQuestionsForm = [...questions];

    const index = arrayQuestionsForm.length;

    arrayQuestionsForm.push({
      icon: "fa-question",
      backGround: "#9ACE83",

      question: {
        index: index,

        value: "",
        type: "choice",
      },
    });
    setQuestions(arrayQuestionsForm);
  };

  // function to send form to database
  const saveForm = async () => {
    setIsLoading(true);
    setErrorMessage("requete en cours ...");
    try {
      if (titleForm.length > 6) {
        const formData = new FormData();

        const arrayQuestions = [];

        for (let i = 0; i < questions.length; i++) {
          if (questions[i].question.value === "") {
            return setErrorMessage("une des question est vide");
          }
          questions[i].question.index = i;

          arrayQuestions.push(questions[i].question);
        }

        const slug = titleForm.split(" ").join("-");

        formData.append("slug", slug);
        formData.append("titleForm", titleForm);

        formData.append("questions", JSON.stringify(arrayQuestions));

        formData.append("theme", JSON.stringify(selectedTheme));

        if (photoTheme) {
          formData.append("picture", photoTheme);
        }

        try {
          const response = await axios.post(
            "http://localhost:4000/createForm",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          setErrorMessage(error.message);
        }

        navigate("/backoffice");
      } else {
        setErrorMessage("votre titre doit faire plus de 6 caracteres");
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
                  setPhotoTheme(event.target.files[0]);
                }}
              />
              {photoTheme && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(photoTheme)} alt="" />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
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
                        value={item.question.value}
                        onChange={(e) => {
                          if (item.question.type === "text") {
                            const copyQuestionsArrayState = [...questions];

                            copyQuestionsArrayState[index].question.value =
                              e.target.value;

                            copyQuestionsArrayState[index].index = index;

                            setQuestions(copyQuestionsArrayState);
                          } else if (item.question.type === "rate") {
                            const copyQuestionsArrayState = [...questions];

                            copyQuestionsArrayState[index].question.value =
                              e.target.value;

                            copyQuestionsArrayState[index].index = index;

                            setQuestions(copyQuestionsArrayState);
                          } else if (item.question.type === "email") {
                            const copyQuestionsArrayState = [...questions];

                            copyQuestionsArrayState[index].question.value =
                              e.target.value;

                            copyQuestionsArrayState[index].index = index;

                            setQuestions(copyQuestionsArrayState);
                          } else if (item.question.type === "choice") {
                            const copyQuestionsArrayState = [...questions];

                            copyQuestionsArrayState[index].question.value =
                              e.target.value;

                            copyQuestionsArrayState[index].index = index;

                            setQuestions(copyQuestionsArrayState);
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

                              setQuestions(copyQuestions);
                            }
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
        )}
      </div>
    </div>
  );
};

export default CreateFormulaire;
