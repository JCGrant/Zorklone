const ENTER_KEY_CODE = 13;

let story = document.createElement('div');

let terminal = document.createElement('pre');

let userInput = document.createElement('input');
userInput
  .addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == ENTER_KEY_CODE) {
      terminal.innerText += userInput.value + '\n';
      userInput.value = '';
    }
  });

let appElement = document.getElementById('app');
appElement.appendChild(story);
appElement.appendChild(terminal);
appElement.appendChild(userInput);
