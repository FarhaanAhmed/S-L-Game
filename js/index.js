var dice1 = document.getElementById("dice1");
var dice2 = document.getElementById("dice2");

var diceMessage1 = document.getElementById("status1");
var diceMessage2 = document.getElementById("status2");

var first = true;
var p2First = true;

// Creating an array to get the start and end position of the id with the ladders on the grid
//            Start||End
var ladders = [ [3, 20],
                [6, 14],
                [11, 28],
                [15, 34],
                [17, 74],
                [22, 37],
                [38, 59],
                [49, 67],
                [57, 76],
                [61, 78],
                [73, 86],
                [81, 98],
                [88, 91] ];

// Creating an array to get the start and end position of the id with the snakes on the grid
//            Start||End
var snakes =  [ [99, 63],
                [97, 87],
                [92, 25],
                [90, 48],
                [85, 59],
                [83, 45],
                [75, 28],
                [60, 23],
                [56, 1],
                [54, 36],
                [51, 6],
                [39, 5],
                [26, 10],
                [18, 1],
                [8, 4] ];

//Starting position of both player one and two
var playerOne = 0;
var playerTwo = 0;

document.getElementById("p2Dice").disabled = true;

function rollDice1(){

  var d1 = Math.floor(Math.random() * 6) + 1;
  dice1.innerHTML = d1;
  diceMessage1.innerHTML = "You rolled " + d1 + ".";

  if (first){
    if(d1 !== 6){
      document.getElementById("p1Dice").disabled = true; // disable player one button
      document.getElementById("p2Dice").disabled = false; // enables player ones button
    }
    if(d1 == 6){
      diceMessage1.textContent = "You rolled a 6, game piece on the board!"; // displays message if condition is met
      document.getElementById('1').className += ' piece1'; // moves peice one onto id 1 if player rolls a six on the first go
      playerOne = 1; // sets player one's default value as 1 now
      first = false; // no longer the first go
    }
  }
  else if (d1 == 6) {
    diceMessage1.textContent = "You rolled a 6, you get another turn!";
    document.getElementById(String(playerOne)).className = 'a'; // remove the piece from the current element in class a
    playerOne = playerOne + d1; // add player one current posittion with the dice roll
    document.getElementById(String(playerOne)).className += ' piece1'; // moves the piece to the new postion
    document.getElementById("p1Dice").disabled = false;
    document.getElementById("p2Dice").disabled = true;
    checkSnakes(playerOne,playerOne);
    checkLadders(playerOne,playerOne);
  }
  else {
    document.getElementById(String(playerOne)).className = 'a';
    playerOne = playerOne + d1;
    document.getElementById(String(playerOne)).className += ' piece1';
    document.getElementById("p1Dice").disabled = true;
    document.getElementById("p2Dice").disabled = false;
    checkSnakes(playerOne,playerOne);
    checkLadders(playerOne,playerOne);
  }
  console.log(d1);
  console.log(playerOne);
  winner();
}

function rollDice2(){

  var d2 = Math.floor(Math.random() * 6) + 1;
  dice2.innerHTML = d2;
  diceMessage2.innerHTML = "You rolled " + d2 + ".";

  if (p2First){
    if(d2 !== 6){
      document.getElementById("p1Dice").disabled = false;
      document.getElementById("p2Dice").disabled = true;
    }
    if(d2 == 6){
      diceMessage2.textContent = "You rolled a 6, game piece on the board!"; // displays message if condition is met
      document.getElementById('1').className += ' piece2'; // moves peice two onto id 1 if player rolls a six on the first go
      playerTwo = 1; // sets player two's default value as 1 now
      p2First = false; // no longer player two's first go so its set to false
    }
  }
  else if (d2 == 6) {
    diceMessage2.textContent = "You rolled a 6, you get another turn!";
    document.getElementById(String(playerTwo)).className = 'a';
    playerTwo = playerTwo + d2;
    document.getElementById(String(playerTwo)).className += ' piece2';
    document.getElementById("p1Dice").disabled = true;
    document.getElementById("p2Dice").disabled = false;
    checkSnakes(playerTwo,playerTwo);
    checkLadders(playerTwo,playerTwo);
  }
  else {
    document.getElementById(String(playerTwo)).className = 'a';
    playerTwo = playerTwo + d2;
    document.getElementById(String(playerTwo)).className += ' piece2';
    document.getElementById("p2Dice").disabled = true;
    document.getElementById("p1Dice").disabled = false;
    checkSnakes(playerTwo,playerTwo);
    checkLadders(playerTwo,playerTwo);
  }
  console.log(d2);
  console.log(playerTwo);
  winner();
}

function checkSnakes(player, position){
  for (let i = 0; i < snakes.length; i++) { // itterates through the number of snakes in the array
    if (player == playerOne){ // checks to see which player is rolling
      if (player == snakes[i][0]) { // check if the current position of the player touches the start of the snake
        document.getElementById(String(position)).className = ' a'; // remove the piece from the current element in class a
        document.getElementById(String(snakes[i][1])).className += ' piece1'; // adds the piece to the new element
        playerOne = snakes[i][1]; // prints out alert if player piece lands on snake moving piece to end of snake
        setTimeout(alert, 200, "You hit a snake! You have to move down."); // displays message alerting player they hit a snake
      }
    }
    else if (player == playerTwo){
      if (player == snakes[i][0]) {
        document.getElementById(String(position)).className = ' a';
        document.getElementById(String(snakes[i][1])).className += ' piece2';
        playerTwo = snakes[i][1];
        setTimeout(alert, 200, "You hit a snake! You have to move down.");
      }
    }
  }
}

function checkLadders(player, position){
  for (let i = 0; i < ladders.length; i++) { // itterates through the number of ladders in the array
    if (player == playerOne){ // checks to see which player is rolling
      if (player == ladders[i][0]) { // check if the current position of the player touches the start of the ladder
        document.getElementById(String(position)).className = ' a'; // remove the piece from the current element in class a
        document.getElementById(String(ladders[i][1])).className += ' piece1'; // adds the piece to the new element
        playerOne = ladders[i][1]; // prints out alert if player piece lands on ladder moving the piece up the ladder
        setTimeout(alert, 200, "You hit a ladder! You get to move up."); // displays message alerting player they hit a ladder
      }
    }
    else if (player == playerTwo){
      if (player == ladders[i][0]) {
        document.getElementById(String(position)).className = ' a';
        document.getElementById(String(ladders[i][1])).className += ' piece2';
        playerTwo = ladders[i][1];
        setTimeout(alert, 200, "You hit a ladder! You get to move up.");
      }
    }
  }
}

function winner(){
  if (playerOne >= 100) { // prints alert message if player one piece land on or over 100 first
    alert("Player One Wins");
    document.getElementById("p1Dice").disabled = true; // disable player ones dice button
    document.getElementById("p2Dice").disabled = true; // disable player twos dice button
  }
  else if (playerTwo >= 100) {
    alert("Player Two Wins");
    document.getElementById("p1Dice").disabled = true; // disable player ones dice button
    document.getElementById("p2Dice").disabled = true; // disable player twos dice button
  }
}
