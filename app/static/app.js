const ENTER_KEY_CODE = 13;


var terminal = document.getElementById('terminal');

var input = document.getElementById('input');
input
  .addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == ENTER_KEY_CODE) {
    terminal.innerText += input.value + '\n';
    input.value = '';
  }
});
