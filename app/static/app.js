(function () {

const ENTER_KEY_CODE = 13;

var story = document.createElement('div');

var terminal = document.createElement('pre');

var userInput = document.createElement('input');
userInput
  .addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode == ENTER_KEY_CODE) {
      terminal.innerText += userInput.value + '\n';
      userInput.value = '';
    }
  });

var appElement = document.getElementById('app');
appElement.appendChild(story);
appElement.appendChild(terminal);
appElement.appendChild(userInput);

})();
