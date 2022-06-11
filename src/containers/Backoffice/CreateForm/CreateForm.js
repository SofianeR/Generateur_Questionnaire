import React, { useState, useEffect } from "react";

import themeColors from "../../../assets/themeColors.json";

// import package
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import CustomizeTheme from "../../../components/Backoffice/Shared/CustomizeTheme";
import HeaderCreateComponent from "../../../components/Backoffice/CreateForm/HeaderCreateComponent";
import SpliceButtonsComponent from "../../../components/Backoffice/Shared/SpliceButtonsComponent";
import AddQuestionButtonComponent from "../../../components/Backoffice/Shared/AddQuestionButtonsComponent";
import InputQuestionUpdateComponent from "../../../components/Backoffice/Shared/InputQuestionUpdateComponent";

const CreateForm = () => {
  // navigation
  const navigate = useNavigate();

  //
  const [isLoading, setIsLoading] = useState(false);
  // state error display
  const [errorMessage, setErrorMessage] = useState("");

  // state modal perso
  const [showTheme, setShowTheme] = useState(false);

  // state theme color
  const [primaryThemeArray, setPrimaryThemeArray] = useState();
  const [selectedTheme, setSelectedTheme] = useState(themeColors[0]);

  // state theme photo
  const [pictureTheme, setPictureTheme] = useState();

  // state title form
  const [titleForm, setTitleForm] = useState("");

  // state questions to display
  const [questions, setQuestions] = useState([]);

  // function to send form to database
  const saveForm = async () => {
    setIsLoading(true);
    setErrorMessage("requete en cours ...");
    try {
      if (titleForm.length > 6) {
        const formData = new FormData();

        const arrayQuestions = [];

        for (let i = 0; i < questions.length; i++) {
          if (questions[i].value === "") {
            return setErrorMessage("une des question est vide");
          }
          questions[i].index = i;

          arrayQuestions.push(questions[i]);
        }

        const slug = titleForm
          .split(" ")
          .join("-")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        formData.append("slug", slug);
        formData.append("titleForm", titleForm);

        formData.append("questions", JSON.stringify(arrayQuestions));

        formData.append("theme", JSON.stringify(selectedTheme));

        if (pictureTheme) {
          formData.append("picture", pictureTheme);
        }

        try {
          const response = await axios.post(
            "https://sofiane-rehila-94.herokuapp.com/questionForm/create",
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
      themeColors.map((question) => {
        arrayPrimary.push(question.primary);
      });

      setPrimaryThemeArray(arrayPrimary);
    };
    saveColors();
  }, []);

  return (
    <div className="create-container">
      <HeaderCreateComponent
        saveForm={saveForm}
        titleForm={titleForm}
        setTitleForm={setTitleForm}
        setErrorMessage={setErrorMessage}
        setQuestions={setQuestions}
      />
      {errorMessage && (
        <div className="div-alert">
          <p className="message-alert">{errorMessage}</p>
        </div>
      )}
      <div className="main-create">
        <div className="main-title">
          <h3
            onClick={() => {
              setShowTheme(false);
            }}
            className="question">
            Questions
          </h3>
          <h3
            onClick={() => {
              setShowTheme(true);
            }}
            className="custom">
            Personnaliser le formulaire
          </h3>
        </div>
        {showTheme ? (
          <CustomizeTheme
            themeColors={themeColors}
            setSelectedTheme={setSelectedTheme}
            primaryThemeArray={primaryThemeArray}
            setPictureTheme={setPictureTheme}
            pictureTheme={pictureTheme}
            selectedTheme={selectedTheme}
          />
        ) : (
          <div>
            {questions &&
              questions.map((question, index) => {
                return (
                  <div className="question-div" key={index}>
                    <InputQuestionUpdateComponent
                      questions={questions}
                      setQuestions={setQuestions}
                      question={question}
                      index={index}
                    />
                    <SpliceButtonsComponent
                      setQuestions={setQuestions}
                      questions={questions}
                      question={question}
                      index={index}
                    />
                  </div>
                );
              })}

            <AddQuestionButtonComponent
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
