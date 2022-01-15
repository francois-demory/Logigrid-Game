const play = {

  name: ['Robinson', 'Slater', 'Marion', 'Shen', 'Montague'],
  firstName: ['Andrew', 'Anna', 'Jim', 'Nicole', 'Peter'],
  instructions: ['Le nom de famille d\'Andrew est Robinson.', 'Shen n\'est pas le nom de famille d\'Anna ou de Peter.', 'Le nom de famille de Nicole est Marion.', 'Slater n\'est pas le nom de famille de Peter.'],
  gameOver: false,
  gameSolution: [true, false, false, false, false, false, true, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, true],

  init() {
    play.createGrid();
    play.fillGrid();
    play.printInstructions();
    play.checkCell();
    play.resetButton();
  },

  createGrid() {
    for (let x = 0; x <= play.firstName.length; x++) {
      let tableRow = document.createElement('div');
      let table = document.getElementById('game_container');
      table.appendChild(tableRow);
      tableRow.className = 'row';
      for (let y = 0; y <= play.name.length; y++) {
        let tableCell = document.createElement('div');
        tableRow.appendChild(tableCell);
        if (x === 0 && y === 0) {
          tableCell.classList.add('logo');
        } else if (x === 0 && y <= play.name.length) {
          tableCell.classList.add('name');
        } else if (y === 0 && x <= play.firstName.length) {
          tableCell.classList.add('firstName');
        } else {
          tableCell.classList.add('cell');
        }
      }
    }
  },

  fillGrid() {
    let names = document.getElementsByClassName('name');
    for (let i = 0; i < names.length; i++) {
      names[i].innerText = play.name[i];
    }
    let firstNames = document.getElementsByClassName('firstName');
    for (let i = 0; i < firstNames.length; i++) {
      firstNames[i].innerText = play.firstName[i];
    }
  },

  printInstructions() {
    let boardInstructions = document.getElementById('game_instructions');
    for (let i = 0; i < play.instructions.length; i++) {
      let instructions = document.createElement('div');
      boardInstructions.appendChild(instructions);
      instructions.className = 'instructions';
      instructions.innerText = play.instructions[i];
    }

  },

  checkCell() {
    let cellBoard = document.getElementsByClassName('cell');
    for (let i = 0; i < cellBoard.length; i++) {
      cellBoard[i].addEventListener('click', function () {
        if (play.gameOver) {
          return;
        }
        if (cellBoard[i].classList.contains('checked')) {
          cellBoard[i].classList.replace('checked', 'unchecked');
        } else if (cellBoard[i].classList.contains('unchecked')) {
          cellBoard[i].classList.replace('unchecked', 'cell');
        } else {
          cellBoard[i].classList.toggle('checked');
        }
        play.isGameOver();
      });
    }
  },

  clear() {
    let cellChecked = document.getElementsByClassName('checked');
    let cellUnchecked = document.getElementsByClassName('unchecked');
    while (cellChecked.length !== 0) {
      for (let i = 0; i < cellChecked.length; i++) {
        cellChecked[i].className = 'cell';
      }
    }
    while (cellUnchecked.length !== 0) {
      for (let i = 0; i < cellUnchecked.length; i++) {
        cellUnchecked[i].className = 'cell';
      }
    }
    if (document.getElementsByTagName('h1')[0]) {
      document.getElementsByTagName('h1')[0].innerText = '';
    }
    play.gameOver = false;
  },

  resetButton() {
    let resetDiv = document.getElementById('game_container');
    let resetButton = document.createElement('button');
    resetButton.id = 'reset_button';
    resetButton.innerText = 'RESET';
    resetButton.addEventListener('click', function () {
      play.clear();
    });
    resetDiv.appendChild(resetButton);
  },

  isGameOver() {
    let solution = Array.from(document.getElementsByClassName('cell'));
    for (let i = 0; i < solution.length; i++) {
      if (solution[i].classList.contains('checked')) {
        solution[i] = true;
      } else {
        solution[i] = false;
      }
    }
    if (solution.join() === play.gameSolution.join()) {
      let modal = document.createElement('div');
      modal.className = 'modal';
      let message = document.createElement('h1');
      message.className = 'modal-content';
      message.innerText = 'YOU WON !';
      document.getElementById('game_container').prepend(modal);
      document.getElementById('game_container').prepend(message);
      play.gameOver = true;
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = 'none';
          message.style.display = 'none';
        }
      }
    }
  }
};


document.addEventListener('DOMContentLoaded', play.init());