//The game variables
var alienX = Math.floor(Math.random() * 300 + 1);
var alienY = Math.floor(Math.random()* 300 + 1);
console.log("X: " + alienX);
console.log("Y: " + alienY);
var guessX = 0;
var guessY = 0;
var guessesMade = 0;
var guessesRemaining = 7;
var gameMessage = "";
var gameWon = false;

//The game objects
var alien  = document.querySelector("#alien");
var explosion  = document.querySelector("#explosion");
var fire  = document.querySelector("#fire");
var gun  = document.querySelector("#gun");

//the input and output fields
var inputX = document.querySelector("#inputX");
var inputY = document.querySelector("#inputY");
var output = document.querySelector ("#output");

//The button field
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);


function render()
{
    alien.style.left = alienX + "px";
    
alien.style.top = alienY + "px";

//position the gun and the fire
gun.style.left = guessX + "px";
fire.style.left = guessX + "px"
fire.style.top = guessY + "px";
fire.style.display = "block"

//The explosion
if(gameWon)
{
    explosion.style.display = "block";
    explosion.style.left = alienX + "px";
    alien.style.display = "none";
    gun.style.display = "none";
    fire.style.display = "none"

}
}

//Listen for the enter key
window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(event)
{
    if(event.keycode === 13)
    {
        validateInput();
    }
}

function clickHandler()
{
    validateInput();
}

function validateInput()
{
    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value)

    if(isNaN(guessX) || isNaN(guessY))
    {
        output.innerHTML = "Please enter a number";
    }
    else if(guessX > 300 || guessY > 300)
    {
        output.innerHTML = "Please enter a number less than 300";
    }
    else{
        playGame();
    }
}

function playGame()
{
    guessesMade = guessesMade + 1;
    guessesRemaining = guessesRemaining - 1;
    gameMessage = "Guess: " + guessesMade + ",Remaining: " + guessesRemaining

    if(guessX >= alienX && guessX <= alienX + 150)
    {
        if(guessY >= alienY && guessY <= alienY + 100)
        {
            gameWon = true;
            endGame();
        }
    }
    else
    {
        output.innerHTML = "Miss!" + gameMessage

        if(guessesRemaining < 1)
        {
            endGame();
        }
    }
    if(!gameWon)
    {
        alienX = Math.floor(Math.random() * 281);
        alienY += 30;
       
    }

    render();

    
}

function endGame()
{
    if(gameWon)
    {
        output.innerHTML = "Hit! You saved the earth!" +"<br>" +" It only took you " + guessesMade + " shots"
    }
    else
    {
      output.innerHTML = "You lost!" + "<br>" + "The earth has been invaded!";
    }

    button.removeEventListener("click", clickHandler,false);
    button.disabled = true;

    window.removeEventListener("keydown", keydownHandler, false);

    inputX.disabled = true;
    inputY.disabled = true;
}


