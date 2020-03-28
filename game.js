var person = prompt("Please enter your name", "Player" );
confirm("Welcome " + person + "! We're happy to have you. This game is meant to test your knowledge of Mathematics.  Click on the START QUIZ button and let's begin.");

var playing = false;
var answered = false;
var score;
var timer;
var action;
var timeremaining;
var correctAnswer;
var correctPosition;

// if we click on the start/reset
document.getElementById("startreset").onclick = function () {
    // if we are playing, our button will be a RESET button and we will reset the page
    if (playing == true) {
        location.reload();
        
   
        //reloading page
    } else { // if we are not playing,   
        playing = true; //change mode to playing
        score = 0; // set score to 0
        document.getElementById("name").innerHTML = person;
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("timer").style.display = "block"; //show countdown box,
        timeremaining = 60;
        document.getElementById("timevalue").innerHTML = timeremaining;
        startCountDown(); // start countdown
        document.getElementById("gameOver").style.display = "none"; //hide gameover box
        document.getElementById("startreset").innerHTML = "Reset Quiz"; //change button to reset
        //generate Q & A
        generateQA();
    }
}

function resolve(i) {
    // if(!confirm('is this your final answer?')){
    //     return;
    // }
    // alert(document.getElementById(`option${i}`).innerHTML)
    if (answered) {
        return;
    }
    answered = true;
    if (playing == true) { //yes
        if (document.getElementById(`option${i}`).innerHTML == correctAnswer) {
            //correct answer

            document.getElementById("option" + correctPosition).classList.add('green');

            //increase score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            //hide wrong box and show correct box
            document.getElementById("wrong").style.display = "none"
            document.getElementById("correct").style.display = "block";
            setTimeout(function () {
                document.getElementById("option" + correctPosition).classList.remove('green');
                document.getElementById("correct").style.display = "none";
            }, 1000);

        } else {
            //wrong answer
            document.getElementById("option" + i).className += ' red';
            document.getElementById("option" + correctPosition).className += ' green';
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "block";
            setTimeout(function () {
                document.getElementById("wrong").style.display = "none";
                document.getElementById("option" + correctPosition).classList.remove('green');
                document.getElementById("option" + i).classList.remove('red');
            }, 1000);
        }

        //Generate new Q&A

        setTimeout(function () {
            generateQA();
            // document.getElementById("wrong").style.display = "none";
        }, 1000);
    }

}

// functions

//start counter
function startCountDown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timevalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            //game over
            stopCountDown();
            // show("gameOver");
            document.getElementById("gameOver").style.display = "block";
            // document.getElementById("gameOver").innerHTML = "<p>Quiz Over, " + person +"!<p><p>Your score is   "+ score + ".</p><p>Play again?</p><img src=\"travelbeta-logo.svg\">";
            if (score < 6){
                document.getElementById("gameOver").innerHTML = "<p>You can do better, " + person +"!<p><p>Your score is   "+ score + ".</p><p>Play again?</p><img src=\"travelbeta-logo.svg\">";
            } else {
                document.getElementById("gameOver").innerHTML = "<p>Nice try, " + person +"!<p><p>Your score is   "+ score + ".</p><p>Play again?</p><img src=\"travelbeta-logo.svg\">";
            }
            // hide("timer");
            document.getElementById("timer").style.display = "none";
            document.getElementById("correct").style.display = "none";
            document.getElementById("wrong").style.display = "none";
            playing = false;

            document.getElementById("startreset").innerHTML = "Start Quiz";
        }
    }, 1000);
}

//stop counter
function stopCountDown() {
    clearInterval(action);
}


//hide element
// function hide(Id){
//     document.getElementById(Id).style.display = "none";
// }


//show element
// function show(Id){
//     document.getElementById(Id).style.display = "block";
// }


//generate Q&A
function generateQA() {
    answered = false;
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = "What is the value of " + x + " x " + y + " ?";
    correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById("option" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

    //fill other boxes with wrong answers

    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())); //a wrong answer
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("option" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}