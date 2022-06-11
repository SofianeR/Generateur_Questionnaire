import React from "react";

import { CirclePicker, ChromePicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomizeTheme = ({
  themeColors,
  selectedTheme,
  setSelectedTheme,
  primaryThemeArray,
  setPictureTheme,
  pictureTheme,
}) => {
  return (
    <div className="theme-container">
      <div className="colors-container">
        <CirclePicker
          onChange={(color) => {
            themeColors.map((theme, index) => {
              if (theme.primary.toLowerCase() === color.hex) {
                setSelectedTheme(theme);
              }
            });
          }}
          colors={primaryThemeArray}
          circleSize={100}
        />
        <div className="color-preview">
          <p>Couleur du formulaire :</p>
          <CirclePicker
            onChange={(color) => {
              themeColors.map((theme, index) => {
                if (theme.primary.toLowerCase() === color.hex) {
                  setSelectedTheme(theme);
                }
              });
            }}
            colors={[selectedTheme.primary]}
            circleSize={20}
          />
        </div>
      </div>
      {pictureTheme ? (
        <div className="image-preview">
          <img src={URL.createObjectURL(pictureTheme)} alt="" />
          <button
            onClick={() => {
              setPictureTheme();
            }}>
            Supprimer la photo
          </button>
        </div>
      ) : (
        <div className="picture-fetch">
          <label className="label-fetch-img" htmlFor="fetch-img">
            Ajouter une photo
            <FontAwesomeIcon className="icon-plus" icon={"fa-plus"} size="5x" />
            <input
              id="fetch-img"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => {
                setPictureTheme(event.target.files[0]);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default CustomizeTheme;
