// table of the game as directed graph
/*
  table: {
    (letter)(number): [top, right, bottom, left]
    .
    .
    .
  }
  
    top, right, bottom, left => (letter)(number)

    - number is zero-based
*/

// To generate game's table with specified size (max = 26)
function generateTable(size) {
  const table = {};

  for(let i = 0; i < size; i++) {
    
    for(let j = 0; j < size; j++) {

      // generate directions (top, right, bottom, left)
      const top = `${String.fromCharCode(97 + i)}${
        j-1 >= 0 ? j-1 : size-1
      }`;

      const right = `${
        i < size-1 ? String.fromCharCode(98 + i) : 'a'
      }${j}`;

      const bottom = `${String.fromCharCode(97 + i)}${
        j+1 >= size ? 0 : j+1
      }`;

      const left = `${
        i > 0 ? String.fromCharCode(96 + i) : String.fromCharCode(96 + size)
      }${j}`;

      table[`${String.fromCharCode(97 + i)}${j}`] = [
        top,
        right,
        bottom,
        left
      ];

      // create element with this id
      document.querySelector('main').innerHTML += `
        <div id="${String.fromCharCode(97 + j)}${i}"></div>
      `;

    }
  }

  return table;
}

const table = generateTable(26);

export default table;