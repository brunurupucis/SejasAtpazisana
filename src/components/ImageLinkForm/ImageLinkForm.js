import React from "react";
import "./ImageLinkForm.css";

/* front text with button to detect*/
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  /* destructuring onInputChange is going to App.js and is used there*/
  return (
    <div>
      <p className="f3">
        {/*f3 is 'tachyons' for css to go quicker*/}
        {"This Magic Brain will detect faces in your pictures. Git it a try"}
      </p>
      <div className="center">
        <div className=" form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          {/*onInputChange inputing ad input going to App.js and to console.log*/}
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
          {/* onclick when clicking its activating onButtonSubmit and goes to App.js and onButtonSubmit goes to */}
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
