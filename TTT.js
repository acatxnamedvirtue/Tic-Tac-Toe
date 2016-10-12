var TicTacToe = window.TicTacToe = {};
var playerSymbol = window.TicTacToe.playerSymbol = "";
var moves = window.TicTacToe.moves = 0;

var gameBoard = window.TicTacToe.gameBoard = [["", "", ""],
                                              ["", "", ""],
                                              ["", "", ""]];

var reset = TicTacToe.reset = function() {
  for(var i = 0; i <= 2; i++) {
    for(var j = 0; j <= 2; j++) {
      gameBoard[i][j] = "";
    }
  }

  moves = 0;
  updateBoard();
  playerSymbol = "";
  $('.symbol-choice-box').removeClass('hide');
};

var winner = TicTacToe.winner = function() {
  //row win
  var row1 = (gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2]) && gameBoard[0][0] !== "";
  var row2 = (gameBoard[1][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[1][2]) && gameBoard[1][0] !== "";
  var row3 = (gameBoard[2][0] === gameBoard[2][1] && gameBoard[2][1] === gameBoard[2][2]) && gameBoard[2][0] !== "";

  //col win
  var col1 = (gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0]) && gameBoard[0][0] !== "";
  var col2 = (gameBoard[0][1] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][1]) && gameBoard[0][1] !== "";
  var col3 = (gameBoard[0][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[2][2]) && gameBoard[0][2] !== "";

  //diag win
  var diag1 = (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) && gameBoard[0][0] !== "";
  var diag2 = (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]) && gameBoard[0][2] !== "";

  var row = row1 || row2 || row3;
  var col = col1 || col2 || col3;
  var diag = diag1 || diag2;

  return row || col || diag;
}

var handleClick = TicTacToe.handleClick = function(e) {
  if(playerSymbol === "") { return; }
  if(moves >= 9 || winner()) {
    reset();
    return;
  }
  var row = $(e.currentTarget).data('row');
  var col = $(e.currentTarget).data('col');

  if(!empty(row, col)) { return; }

  $('[data-row="' + row + '"][data-col="' + col + '"]').text(playerSymbol);
  gameBoard[row][col] = playerSymbol;
  moves++;
  updateBoard();

  if(moves < 9){
    playComputer();
  }
};

var playComputer = TicTacToe.playComputer = function() {
  var choice = false;
  var x;
  var y;


  while(!choice) {
    x = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    y = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

    if(gameBoard[x][y] === "") {
      choice = true;
    }
  }

  makeComputerMove([x,y]);
}

var handleSymbolSelect = TicTacToe.handleSymbolSelect = function(e) {
  playerSymbol = $(e.target).text();
  $('.symbol-choice-box').addClass('hide');
}

var makeComputerMove = TicTacToe.makeComputeMove = function(move) {
  var i = move[0];
  var j = move[1];
  var mark;

  playerSymbol === "X" ? mark = "O" : mark = "X";

  gameBoard[i][j] = mark;
  moves++;
  updateBoard();
}

var updateBoard = TicTacToe.updateBoard = function() {
  for(var i = 0; i <= 2; i++) {
    for(var j = 0; j <= 2; j++) {
      $('[data-row="' + i + '"][data-col="' + j + '"]').text(gameBoard[i][j]);
    }
  }
};

var empty = TicTacToe.empty = function(x,y) {
  return gameBoard[x][y] === "";
}
