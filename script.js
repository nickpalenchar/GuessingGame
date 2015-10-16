var game = {
    guesses: 6,
    guessLog: [],
    guessRecord: [],
    goal: random(100),
    playing: true
};

$(document).ready(function() {

    function guess(event) {
        if (game.playing) {
            $(".error").hide();
            var myGuess = $("#user-guess").val();
            if (game.guessLog.indexOf(myGuess) !== -1) $("#err2").show();
            else if (/[^\d+]/.test(myGuess)) $("#err1").show();
            else if(myGuess < 1 || myGuess > 100) $("#err3").show();
            else {
                if (myGuess == game.goal){
                    if(event.data.lucky) luckywin();
                    else win();
                }
                else {
                    var diff = game.goal - myGuess;
                    //clear guessers to prepare new feedback
                    $("#guess-higher").text('.');
                    $("#guess-lower").text('.');
                    //lower thans
                    if (diff > 50) $("#guess-higher").html('You\'re very far away! <br/> Higher');
                    else if (diff > 35) $("#guess-higher").html("You're far away! <br/> Higher!");
                    else if (diff > 15) $("#guess-higher").html("You're getting close! <br/> Higher!");
                    else if (diff > 5) $("#guess-higher").html("You're very close! <br/> Higher!");
                    else if (diff > 0) $("#guess-higher").html("You're EXTREAMLY close! <br/> Higher!");
                    //greater thans
                    else if (diff > -5) $("#guess-lower").html("You're EXTREAMLY close! <br/> Lower!");
                    else if (diff > -15) $("#guess-lower").html("You're very close! <br/> Lower!");
                    else if (diff > -35) $("#guess-lower").html("You're getting close! <br/> Lower!");
                    else if (diff > -50) $("#guess-lower").html("You're far away! <br/> Lower!");
                    else $("#guess-lower").text("You're very far away! <br/> Lower!");
                    //lose a guess
                    var clue = '';
                    if(Math.abs(diff) > 50) clue = 'Ice cold';
                    else if(Math.abs(diff) > 35) clue = 'cold';
                    else if(Math.abs(diff) > 15) clue = 'warm';
                    else if(Math.abs(diff) > 5) clue = 'hot';
                    else clue = 'burning hot';
                       
                    game.guessLog.push(myGuess);
                    game.guessRecord.unshift(myGuess + " - " + clue);
                    $("#last-guess-list").html(game.guessRecord.join("<br/>"));
                    game.guesses--;
                    $('#feedback').text(game.guesses + ' Guesses Remaining');
                    if(event.data.lucky) lose();
                    if(game.guesses === 0) lose();
                    if(game.guesses === 3) $("#btn-lucky").fadeOut(400);
                }
            }
        }
    }
    $("#btn-guess").on('click', {lucky: false}, guess);
    $("#btn-lucky").on('click', {lucky: true}, guess); 
    $("#btn-newgame").on('click', function() {
        var newgame = true;
        if(game.playing) {
            newgame = confirm("End this game and start a new one?");
        }
        if(newgame) {
            game = {
                guesses: 6,
                guessLog: [],
                goal: random(100),
                playing: true
                };
            $("body").css("background", "url('http://www.backgroundlabs.com/wp-content/uploads/2013/06/seamless-pattern-of-circuit-board-black.png')");
            $("#title").html("Guessing Game!");
            $("#subtext").html("Try to guess the number I am thinking of! Enter in the text field and hit \"guess,\" or just hit \"hint\" and I'll give you a clue about a random number. Click \"I'm feeling lucky\"... IF YOU DARE!\">");
            $("#guess-higher").html(".");
            $("#guess-lower").html(".");
            $("#error").hide();
            $("input").val("");
        }
    });
    $("#btn-hint").on('click', function(){
        if(game.playing){
            if($(this).text() === "Hint"){
                var newGuess = random(100)
                while(newGuess === game.goal) newGuess = random(100);
                if(newGuess > game.goal) $(this).text("< "+newGuess);
                else $(this).text("> "+newGuess);
            }else{
                $(this).text(game.goal);
            }
        }
    });
});
function random(num) {
    return Math.round(Math.random() * num);
}
function logGuess(num) {
    game.guessLog.push(num);
}
function win() {
    $('body').css('background', 'url(http://www.backgroundlabs.com/wp-content/uploads/2013/06/seamless-pattern-of-circuit-board.png)');
    $('#title-text').text('You guessed right!').css('color', 'yellow');
    $('#subtext').text('Great job! You\'ve guessed the number! Now you can take that number with you and walk with it hand-in-hand till your end-of-days :)');
    game.playing = false;
}
function luckywin() {
    $('body').css('background', 'url(http://www.backgroundlabs.com/wp-content/uploads/2013/06/seamless-pattern-of-circuit-board.png)');
    $('#title-text').text("We've found the chosen one").css('color', 'yellow');
    $("#subtext").text("The experiment is over. You are the one the prophecies have spoken of. You will lead us to the Iron Throne with your guessing prowess. Now, time to defeat Voldermort!");
}
function lose(){
    $('body').css('background', '#000000');
    $('#title-text').text('You didn\'t guess my number...');
    $("#subtext").text("Sorry, you didn't win this time. Try again? Click \"New Game\" below");
    game.playing = false;
}
