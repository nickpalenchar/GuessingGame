var game = {
    guesses: 6,
    guessLog: [],
    goal: random(100),
    playing: true
};
var feedback = document.getElementById('feedback');
var lastGuess = document.getElementById('last-guess');
var guessLower = document.getElementById('guess-lower');
var guessHigher = document.getElementById('guess-higher');


function guess() {
    if (game.playing) {
        var myGuess = document.getElementById('user-guess').value;
        if (/\d+/.test(myGuess)) {
            if (myGuess == game.goal) win();
            else {
                var diff = game.goal - myGuess;
                //clear guessers to prepare new feedback
                guessLower.innerHTML = '.';
                guessHigher.innerHTML = '.';
                //lower than's
                if (diff > 50) guessHigher.innerHTML = "You're very far away! <br/> Higher!";
                else if (diff > 35) guessHigher.innerHTML = "You're far away! <br/> Higher!";
                else if (diff > 15) guessHigher.innerHTML = "You're getting close! <br/> Higher!";
                else if (diff > 5) guessHigher.innerHTML = "You're very close! <br/> Higher!";
                else if (diff > 0) guessHigher.innerHTML = "You're EXTREAMLY close! <br/> Higher!";
                else if (diff > -5) guessLower.innerHTML = "You're EXTREAMLY close! <br/> Lower!";
                else if (diff > -15) guessLower.innerHTML = "You're very close! <br/> Lower!";
                else if (diff > -35) guessLower.innerHTML = "You're getting close! <br/> Lower!";
                else if (diff > -50) guessLower.innerHTML = "You're far away! <br/> Lower!";
                else guessLower.innerHTML = "You're very far away! <br/> Lower!";
                game.guesses--;
                $('#feedback').text(game.guesses + ' Guesses Remaining');
                if(game.guesses === 0) lose();
            }
        }
    }
}

function random(num) {
    return Math.round(Math.random() * num);
}

function refreshStats() {
    
}
function logGuess(num) {
    game.guessLog.push(num);
}
function win() {
    alert("you win");
    $('body').css('background', 'url(http://www.backgroundlabs.com/wp-content/uploads/2013/06/seamless-pattern-of-circuit-board.png)');
    $('#title-text').text('You guessed right!').css('color', 'yellow');
    $('#subtext').text('Great job! You\'ve guessed the number! Now you can take that number with you and walk with it hand-in-hand till your end-of-days :)');
    game.playing = false;
}
function lose(){
    $('body').css('background', '#000000');
    $('#title-text').text('You didn\'t guess my number...');
    game.playing = false;
}
function newGame() {
    //TODO: reset all vars
}

//TODO: Hint button
//TODO: I'm feeling lucky button