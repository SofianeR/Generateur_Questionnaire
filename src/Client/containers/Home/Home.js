import React, { useState, useEffect } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // state listForm formulaire list
  const [listForm, setListForm] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get(
          "https://sofiane-rehila-94.herokuapp.com/questionForm/all"
        );
        setListForm(response.data.listForm);
      } catch (error) {
        alert.show(error.message);
      }
      setIsLoading(false);
    };
    fetchForms();
  }, []);

  if (isLoading) {
    return (
      <div className="main">
        <div>
          <p>En cours de chargement ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>Répondre à un questionnaire</h1>
      {listForm?.map((form) => {
        return (
          <Link
            state={{ formData: form }}
            to={`/form/${form.slug}`}
            className="form-link-container"
            key={form._id}>
            <div className="link-title">
              <p>{form.title}</p>
            </div>
            <div className="link-button">
              <FontAwesomeIcon icon={"fa-arrow-up-right-from-square"} />
            </div>
          </Link>
        );
      })}

      {listForm.length === 0 && <h3>Aucuns formulaires 🥲</h3>}
    </div>
  );
};

export default Home;
