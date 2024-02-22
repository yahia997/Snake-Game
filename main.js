import Snake from "./snake.js";

const snake = new Snake('a0');
snake.render();
snake.walk();

// To create new food in random position
const random = Math.floor(Math.random() * 26);
document.getElementById(`${String.fromCharCode(97 + random)}${random}`).classList.add("food");

// when user change direction with keyboard
/*
  w => top
  d => right
  s => bottom
  a => left
*/
window.addEventListener('keypress', (e) => {
  switch(e.key) {
    case "w":
      snake.changeDir(0);
      break;
    case "d":
      snake.changeDir(1);
      break;
    case "s":
      snake.changeDir(2);
      break;
    case "a":
      snake.changeDir(3);
      break;
  }
});