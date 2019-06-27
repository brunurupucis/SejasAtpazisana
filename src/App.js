import React from 'react';
import Clarifai from 'clarifai'; /* need to add because npm install clarify and now App can access it*/
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js'; /* background particles walking arround*/
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({ /* got from website code and need to install npm install clarify*/
  apiKey: "68b401bd19bc4b75a884f63e537712bc" /* my api key from website*/
});

const particlesOption = { /* creating background*/
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 100
      }
    }
  }
}

class App extends React.Component {
  constructor(){
    super();
    this.state = { /* to remember entered value and replace when new entered*/
      input : '',
      imageUrl:''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); /*to fallow up the event and target.value to get acess to ImageLinkForm.js onInputChange*/
    /* adding input from ImageLinkForm.js and with this.setState goes to imageURL TO BE this.state.input*//* simply way is updating image */
  }

  onButtonSubmit = () => {
    console.log('click');/* copy app.models.... from clarify website*/
    this.setState({imageUrl: this.state.input}) /*  on click going to from inputed url to Facerecognition*/
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
          // URL
          this.state.input /*to put in api input url and recogniting face*/
      ).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);/*info from google chrome development tool place*/
    },
    function(err) {
      // there was an error
    }
  );
  }
  render(){
    return (
    <div className="App">
      <Particles className="particles"
              params={particlesOption}  
            />
      <Navigation/>
      <Signin/>
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit ={this.onButtonSubmit}/>{/* Showing value from ImageLinkForm.js onInputChange to here onInputChange = (event) => {
    console.log(event);
}  and showing up here after rank*/} {/* onButtonSubmit ={this.onButtonSubmit} to get access to onButtonSubmit. When clicking Detect*/}
      {<FaceRecognition imageUrl = {this.state.imageUrl}/>}{/* place where picture will be displayed.  {this.state.imageUrl} is taking url from input and goes here and in js file. */}

    </div>
  );
  }
}

export default App;
