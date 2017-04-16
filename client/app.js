import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      terminalText: '',
    }
  }

  render() {
    return (
      <div>
        <pre>{this.state.terminalText}</pre>
        <input
          type='text'
          ref='userInput'
          onKeyUp={this.handleInputChange}
        />
      </div>
    );
  }

  handleInputChange = (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      let input = this.refs.userInput.value;
      fetch('/input', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input,
        })
      });
      this.setState({
        terminalText: this.state.terminalText + input + '\n'
      });
      this.refs.userInput.value = '';
    }
  };

}
