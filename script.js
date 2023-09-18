const game = () => {
    let pScore = 0;
    let cScore = 0;

    const startGame = () => {
        const playBtn = document.querySelector(".intro button");
        const intro = document.querySelector(".intro");
        const match = document.querySelector(".match");

        //when clicked on the "Let's Play" button the actual game starts
        playBtn.addEventListener("click", () => {
            intro.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    //play match
    const playMatch = () => {
        const buttons = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".player-hand");
        const computerHand = document.querySelector(".computer-hand");
        const hands = document.querySelectorAll(".hands img");


        //empty animation after every round
        hands.forEach(hand => {
            hand.addEventListener("animationend", function () {
                this.style.animation = '';
            });
        });

        //computerising the game
        const computerOptions = ['rock', 'paper', 'scissors'];

        //bug: didn't show img at start (FIXED)
        playerHand.src = "./assets/rock.png";
        computerHand.src = "./assets/rock.png";

        buttons.forEach(button => {
            button.addEventListener('click', function () {       //not using arrow bcoz 'this' keyword will not be bound to button

                //whenerver I click on a button to choice it should turn img into rock

                playerHand.src = "./assets/rock.png";
                computerHand.src = "./assets/rock.png";

                //computer choices
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];

                setTimeout(() => {
                    //calling compare hands to check who wins
                    compareHands(this.textContent, computerChoice);

                    //updating images
                    playerHand.src = `./assets/${this.textContent}.png`;
                    computerHand.src = `./assets/${computerChoice}.png`;
                }, 2000);

                playerHand.style.animation = "shakePlayer 2s ease";
                computerHand.style.animation = "shakeComputer 2s ease";
            });
        });
    };

    const updateScore = () => {
        const playerScore = document.querySelector(".player-score p");
        const computerScore = document.querySelector(".computer-score p");

        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };
    const compareHands = (playerChoice, computerChoice) => {
        //Update Text
        const winner = document.querySelector(".winner");
        //Checking for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = "It is a tie";
            return;
        }
        //Check for Rock
        if (playerChoice === "rock") {
            if (computerChoice === "scissors") {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            }
        }
        //Check for Paper
        if (playerChoice === "paper") {
            if (computerChoice === "scissors") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
        //Check for Scissors
        if (playerChoice === "scissors") {
            if (computerChoice === "rock") {
                winner.textContent = "Computer Wins";
                cScore++;
                updateScore();
                return;
            } else {
                winner.textContent = "Player Wins";
                pScore++;
                updateScore();
                return;
            }
        }
    };

    startGame();
    playMatch();
};
//starting the game
game();