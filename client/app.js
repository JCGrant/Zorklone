import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sceneText: '',
      terminalText: '',
    }
    this.handleUserInput();
  }

  render() {
    return (
      <div>
        <div><em>{this.state.sceneText}</em></div>
        <pre>{this.state.terminalText}</pre>
        <input
          type='text'
          ref='userInput'
          onKeyUp={this.handleInputChange}
        />
      </div>
    );
  }

  handleUserInput = (userInput) => {
    fetch('/user_input', {
      method: 'POST',
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
