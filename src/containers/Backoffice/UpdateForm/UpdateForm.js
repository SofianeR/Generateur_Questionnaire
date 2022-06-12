import themeColors from "../../../assets/themeColors.json";

import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAlert } from "react-alert";

import CustomizeTheme from "../../../components/Backoffice/Create-Update/CustomizeTheme";
import HeaderFormComponent from "../../../components/Backoffice/Create-Update/HeaderFormComponent";
import InputQuestionComponent from "../../../components/Backoffice/Create-Update/InputQuestionComponent/InputQuestionComponent";
import SpliceButtonsComponent from "../../../components/Backoffice/Create-Update/SpliceButtonsComponent";
import AddQuestionButtonComponent from "../../../components/Backoffice/Create-Update/AddQuestionButtonsComponent";

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const alert = useAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showTheme, setShowTheme] = useState(false);

  // state theme color
  const [primaryThemeArray, setPrimaryThemeArray] = useState();
  const [selectedTheme, setSelectedTheme] = useState();

  // state theme photo
  const [pictureTheme, setPictureTheme] = useState();

  const [titleForm, setTitleForm] = useState("");
  const [formulaireData, setFormulaireData] = useState();
  const [questions, setQuestions] = useState([]);

  //

  const updateBdd = async () => {
    setErrorMessage("");
    try {
      setIsLoading(true);

      if (titleForm.length > 6) {
        for (let i = 0; i < questions.length; i++) {
          questions[i].index = i;
          if (questions[i].value === "") {
            return (
              alert.show("Une des questions est vide"), setIsLoading(false)
            );
          }
        }

        const formData = new FormData();

        formData.append("titleForm", titleForm);
        formData.append("id", formulaireData._id);
        formData.append("questions", JSON.stringify(questions));
        formData.append("theme", JSON.stringify(selectedTheme));

        console.log(pictureTheme);

        formData.append("picture", pictureTheme);

        const response = await axios.post(
          // "https://sofiane-rehila-94.herokuapp.com/questionForm/update",
          "http://localhost:4000/questionForm/update",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate("/backoffice");
      } else {
        alert.show("Votre titre doit faire plus de 6 caracteres");
      }
    } catch (error) {
      alert.show(error.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const deleteForm = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        // "https://sofiane-rehila-94.herokuapp.com/questionForm/questionForm/delete/single",
        "http://localhost:4000/questionForm/delete/single",

        {
          id,
        }
      );
      navigate("/backoffice");
    } catch (error) {
      alert.show(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const saveColors = () => {
      const arrayPrimary = [];
      themeColors.map((item) => {
        arrayPrimary.push(item.primary);
      });

      setPrimaryThemeArray(arrayPrimary);
    };
    saveColors();
  }, []);

  useEffect(() => {
    const fetchFormData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://sofiane-rehila-94.herokuapp.com/questionForm/single/${id}`
        );

        setFormulaireData(response.data);

        if (response.data.picture.length !== 0) {
          setPictureTheme(response.data.picture);
        }

        setTitleForm(response.data.title);

        setQuestions(JSON.parse(response.data.questions));

        setSelectedTheme(JSON.parse(response.data.theme));
      } catch (error) {
        alert.show(error.message);
      }
      setIsLoading(false);
    };
    fetchFormData();
  }, []);

  return isLoading ? (
    <div className="container-loading">
      {errorMessage && <p>{errorMessage}</p>}
      <p>En cours de chargement ...</p>
      <button
        onClick={() => {
          console.log(isLoading);
        }}>
        console
      </button>
    </div>
  ) : (
    <div className="container-update">
      {formulaireData && (
        <div>
          <HeaderFormComponent
            formSubmitFunction={updateBdd}
            deleteFunction={deleteForm}
            titleForm={titleForm}
            setTitleForm={setTitleForm}
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
                formulaireData={formulaireData}
                setFormulaireData={setFormulaireData}
              />
            ) : (
              questions.map((question, index) => {
                return (
                  <div className="question-div" key={index}>
                    <InputQuestionComponent
                      index={index}
                      question={question}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                    <SpliceButtonsComponent
                      index={index}
                      question={question}
                      questions={questions}
                      setQuestions={setQuestions}
                    />
                  </div>
                );
              })
            )}
            <AddQuestionButtonComponent
              questions={questions}
              setQuestions={setQuestions}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateForm;
