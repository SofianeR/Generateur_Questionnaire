import React, { useState, useEffect } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // state listForm formulaire list
  const [listForm, setListForm] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await axios.get("http://localhost:4000/formList");
        setListForm(response.data.listForm);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchForms();
  }, []);

  return (
    <div className="main">
      <h1>Répondre à un questionnaire</h1>
      {isLoading ? (
        <div>
          <p>En cours de chargement ...</p>
        </div>
      ) : (
        listForm &&
        listForm.map((form, index) => {
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
        })
      )}
    </div>
  );
};

export default Home;
