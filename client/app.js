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
      this.setState({
      terminalText: this.state.terminalText +
                    this.refs.userInput.value + '\n'
      });
      this.refs.userInput.value = '';
    }
  };

}
