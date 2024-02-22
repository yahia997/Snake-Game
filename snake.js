// snake class

/* 
  dir(direction)
  0 => top
  1 => right
  2 => bottom
  3 => left
  default (top)
*/

import table from "./tableGraph.js";

export default class Snake {
  constructor(startPoint, length = 1, dir = 0, dead = false, speed = 100) {
    this.snake = [startPoint];
    this.length = length;
    this.dir = dir;
    this.dead = dead;
    this.speed = speed;
  }

  eat() {
    // remove old food
    document.querySelector(".food").classList.remove("food");
    this.length++;

    // snake will get bigger
    /*
      top => last[bottom]
      bottom => last[top]
      right => last[left]
      left => last[right]
    */
    const last = this.snake[this.snake.length-1];
    this.snake.push(table[last][(this.dir+2)%4]);

    // increase speed
    this.speed -= 15;

    // To create new food in random position
    const random = Math.floor(Math.random() * 26);
    document.getElementById(`${String.fromCharCode(97 + random)}${random}`).classList.add("food");
  }

  // when user click(w, d, s, a) to change direction of walking
  changeDir(newDir) {
    this.dir = newDir;
  }

  // to make snake walk and render it to screen every this.speed
  walk() {
    const it = setInterval(() => {
      
      // update points while walking
      this.snake = this.snake.map((p, i) => {

        // head of the snake
        if(i == 0) {
          return table[p][this.dir];
        }
        
        // rest will follow each other
        return this.snake[i-1];
      });

      let unique = new Set(this.snake);
      if(unique.size != this.snake.length) {
        this.dead = true;
      }

      // render menu positions on screen
      this.render();

      // when snake is dead stop walking
      if(this.dead) {
        clearInterval(it);
        const restart = confirm("You lose\n" + `your score is: ${this.length}` + "\n" + "Do you want to restart the game ?");

        // restart the game
        if(restart){
          this.snake = ['a1'];
          this.length = 1;
          this.dir = 0;
          this.dead = false;
          this.speed = 100;

          this.render();
          this.walk();
        }
      }
    }, this.speed);
  }
  
  // to render snake on screen
  render() {
    // check if head of the snake eat food
    const foodElem = document.querySelector(".food");
    if(foodElem && this.snake[0] == foodElem.id) {
      this.eat();
    }

    // remove old styles
    document.querySelectorAll('.snake').forEach(elem => {
      elem.classList.remove("snake");
    });

    // add updated styles
    this.snake.forEach(p => {
      document.getElementById(p).classList.add("snake");
    });
  }
}