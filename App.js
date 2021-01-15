const sounds = [
  {
    keyCode: 81,
    keyTrigger: "Q",
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

const DrumBank = (props) => {
  const DrumGenerator = props.sounds.map((i) => {
    return (
      <button
        className="drum-pad btn btn-primary btn-lg"
        onClick={props.handleClick}
        id={i.id}
        value={i.keyTrigger}
        key={i.id}
        style={{ flexGrow: 2 }}
      >
        {i.keyTrigger}
        <audio className="clip" id={i.keyTrigger} src={i.url} />
      </button>
    );
  });

  return (
    <div
      id="drum-container"
      style={{ display: "inline-flex", flexWrap: "wrap" }}
    >
      {DrumGenerator}
    </div>
  );
};

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
          <DrumBank sounds={sounds} handleClick={this.props.handleClick} />
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
      name: "Let's play drums!"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
    this.focusDiv();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }

  focusDiv() {
    ReactDOM.findDOMNode(this.refs.focusedDiv).focus();
  }

  handleClick(e) {
    let val = e.currentTarget.value;
    let audio = document.getElementById(val);
    audio.currentTime = 0;
    audio.play();
    this.setState({
      name: keyPairs[val]
    });
  }

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
