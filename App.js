const sounds = [
  {
    keyCode: 81,
    keyPress: "Q",
    id: "bass drum",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

//for populating the display using the value of the button
const keyPairs = {
  Q: "Heater-1",
  W: "Heater-2",
  E: "Heater-3",
  A: "Heater-4",
  S: "Clap",
  D: "Open-HH",
  Z: "Kick-n-Hat",
  X: "Kick",
  C: "Closed-HH"
};

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="card"
        style={{
          backgroundColor: "white",
          width: 500,
          maxWidth: "90vw",
          margin: "0 auto",
          position: "relative",
          top: "15vh",
          textAlign: "center"
        }}
      >
        <div className="card header bg-secondary text-white">
          <h3>Drum Machine!</h3>
        </div>
        <div className="card-body" style={{ margin: "0 auto" }}>
          <div className="row">
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Heater-1"
              value="Q"
            >
              Q
              <audio className="clip" id="Q" src={sounds[0]["url"]} />
            </button>
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Heater-2"
              value="W"
            >
              W
              <audio className="clip" id="W" src={sounds[1]["url"]} />
            </button>
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Heater-3"
              value="E"
            >
              E
              <audio className="clip" id="E" src={sounds[2]["url"]} />
            </button>
          </div>
          <div className="row">
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Heater-4"
              value="A"
            >
              A
              <audio className="clip" id="A" src={sounds[3]["url"]} />
            </button>
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Clap"
              value="S"
            >
              S
              <audio className="clip" id="S" src={sounds[4]["url"]} />
            </button>
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Open-HH"
              value="D"
            >
              D
              <audio className="clip" id="D" src={sounds[5]["url"]} />
            </button>
          </div>
          <div className="row">
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Kick-n'-Hat"
              value="Z"
            >
              Z
              <audio className="clip" id="Z" src={sounds[6]["url"]} />
            </button>
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Kick"
              value="X"
            >
              X
              <audio className="clip" id="X" src={sounds[7]["url"]} />
            </button>
            <button
              className="drum-pad btn btn-primary btn-lg"
              onClick={this.props.handleClick}
              id="Closed-HH"
              value="C"
            >
              C
              <audio className="clip" id="C" src={sounds[8]["url"]} />
            </button>
          </div>
        </div>
        <div className="card-footer">
          <h4 id="display">{this.props.name}</h4>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sound: { sounds },
      name: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

//focus Div so that keydown works on load without requiring manual focus
  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
    this.focusDiv();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

//go and grab the ref'd div and focus it
  focusDiv() {
    ReactDOM.findDOMNode(this.refs.focusedDiv).focus();
  }

//get the value of the clicked button and play the element containing the <audio>, set the display name to the name of the drum
  handleClick(e) {
    let val = e.currentTarget.value;
    let audio = document.getElementById(val);
    audio.currentTime = 0;
    audio.play();
    this.setState({
      name: keyPairs[val]
    });
  }

// get the code from the pressed key - convert it to string and use it to grab the audio element
  handleKey(event) {
    let key = event.keyCode;
    let val = String.fromCharCode(key);
    let audio = document.getElementById(val);
    audio.currentTime = 0;
    audio.play();
  }

  render() {
    return (
      <div
        ref="focusedDiv"
        tabIndex={0}
        className="container-fluid"
        style={{
          backgroundColor: "#660673",
          height: "300vh"
        }}
      >
        <DrumMachine
          handleClick={this.handleClick}
          sound={this.state.sound}
          name={this.state.name}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("drum-machine"));
