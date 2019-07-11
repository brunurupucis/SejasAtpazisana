import React from "react";
import Clarifai from "clarifai"; /* need to add because npm install clarify and now App can access it*/
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Particles from "react-particles-js"; /* background particles walking arround*/
import Rank from "./components/Rank/Rank";
import "./App.css";

const app = new Clarifai.App({
  /* got from website code and need to install npm install clarify*/
  apiKey: "68b401bd19bc4b75a884f63e537712bc" /* my api key from website*/
});

const particlesOption = {
  /* creating background*/
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 100
      }
    }
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      /* to remember entered value and replace when new entered*/
      input: "",
      imageUrl: "",
      box: {},
      route: "signin" /* route is fallowing up where you are on page*/,
      isSignedIn: false /* what to do to signe in*/
    };
  }
  /* to get acess to your local server*/
  /*
/// componentDidMount was only for testing to acess array and get information out of it
  componentDidMount() {
    console.log("inside componentDidMount");
    fetch('http://localhost:3000/') ///if error json 0 in console.log than wrong fetch adress
    .then(response => response.json()) 
    .then(console.log)
  }
*/
  calculateFaceLocation = data => {
    /* to create box arround face wi taking parameters getting from clarify api*/
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById(
      "inputimage"
    ); /* imputimage is from faceRecognition.js file and it means url gived in input box*/
    const width = Number(image.width); /* getting image sizes*/
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = box => {
    /*Box?*/
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({
      input: event.target.value
    }); /*to fallow up the event and target.value to get acess to ImageLinkForm.js onInputChange*/ /* simply way is updating image */
    /* adding input from ImageLinkForm.js and with this.setState goes to imageURL TO BE this.state.input*/
  };

  onButtonSubmit = () => {
    console.log("click"); /* copy app.models.... from clarify website*/
    this.setState({
      imageUrl: this.state.input
    }); /*  on click going to from inputed url to Facerecognition*/
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // URL
        this.state.input /*to put in api input url and recogniting face*/
      )
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )

      // do something with response
      /* console.log(response.outputs[0].data.regions[0].region_info.bounding_box); info from google chrome development tool place 4 coordinates to get arround face*/
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const {
      isSignedIn,
      imageUrl,
      route,
      box
    } = this.state; /* shorter , to not put in front each time*/
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            {/* Showing value from ImageLinkForm.js onInputChange to here onInputChange = (event) => 
              console.log(event) and showing up here after rank*/}{" "}
            {/* onButtonSubmit ={this.onButtonSubmit} to get access to onButtonSubmit. When clicking Detect*/}
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}

        {/* place where picture will be displayed.  {this.state.imageUrl} is taking url from input and goes here and in js file. */}
      </div>
    );
  }
}

export default App;
