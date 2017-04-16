import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.restartApp();
  }

  render() {
    return (
      <div>
        <button onClick={this.restartGame}>Restart</button>
        <div dangerouslySetInnerHTML={{ __html: this.state.sceneText }}></div>
        <pre>{this.state.terminalText}</pre>
        <input
          type='text'
          ref='userInput'
          onKeyUp={this.handleInputChange}
        />
      </div>
    );
  }

  restartApp = () => {
    this.state = {
      sceneText: '',
      terminalText: '',
    };
    this.handleUserInput();
  };

  restartGame = (event) => {
    fetch('/restart_game', {
      method: 'POST',
      credentials: 'same-origin',
    })
    .then(this.restartApp);
  };

  handleUserInput = (userInput) => {
    fetch('/user_input', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: userInput,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.type === 'scene') {
        this.setState({sceneText: responseJson.body});
      } else {
        this.setState({terminalText: this.state.terminalText + responseJson.body + '\n'});
      }
    });
  };

  handleInputChange = (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      let userInput = this.refs.userInput.value;
      this.setState({terminalText: this.state.terminalText + userInput + '\n'});
      this.refs.userInput.value = '';
      this.handleUserInput(userInput);
    }
  };

}
