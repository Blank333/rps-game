let rock = /^rock$/i;
let paper = /^paper$/i;
let scissor = /^scissors$/i;
let wins = loses = draw = 0;

let compPlay = () => {
    let choice = Math.random();

    if(choice == 0) {
        return compPlay;
    } else if(choice <= 0.33) {
        return "Rock";
    } else if(choice <= 0.66) {
        return "Paper";
    } else if(choice <= 0.99) {
        return "Scissors";
    } else {
        return compPlay();
    }
};

let count = (times) => {
    let rockT = paperT = scissorT = misc = 0;
    for(let i=0; i<=times; ++i){
        let choice = compPlay();
        if(choice == "Rock"){
            rockT++;
        } else if(choice == "Paper") {
            paperT++;
        } else if(choice == "Scissors") {
            scissorT++;
        } else {
            misc++;
        }
    }
    console.log(`Rock = ${rockT}\nPaper = ${paperT}\nScissors = ${scissorT}\nMisc: ${misc}`);
    
};

let play = (playerSelection, compSelection = compPlay()) => {
    
    if (playerSelection.toUpperCase() == compSelection.toUpperCase()){
        return game("Draw", playerSelection, compSelection);
    } 

    //Rock - Paper/Scissor
    //Paper - Rock/Scissor
    //Scissor - Rock/Paper
    
    switch(true){
        case ((rock.test(playerSelection)) && (scissor.test(compSelection))): 
        case((paper.test(playerSelection)) && (rock.test(compSelection))): 
        case((scissor.test(playerSelection)) && (paper.test(compSelection))):
        return game("Win", playerSelection, compSelection);
        
        
        case ((rock.test(playerSelection)) && (paper.test(compSelection))): 
        case((paper.test(playerSelection)) && (scissor.test(compSelection))): 
        case((scissor.test(playerSelection)) && (rock.test(compSelection))): 
        return game("Lose", playerSelection, compSelection);
        
        default: 
        return `${playerSelection} is Invalid`;
    }

    
    


};

let game = (gameState, playerSelection, compSelection) => {
    let score = document.querySelectorAll('.score');
    
    if(gameState === "Win"){
        wins++;
        score[0].textContent = `Wins: ${wins}`;

        if(wins === 5) {
            alert("You won the game! Congratulations!");
            return reset();
        }
        
        return `You win! ${playerSelection} beats ${compSelection}`;
    }
    else if(gameState === "Lose") {
        loses++;
        score[1].textContent = `Loses: ${loses}`;

        if(loses === 5) {
            alert("You lost the game! Try again!");
            return reset();
        }
        return `You lost! ${compSelection} beats ${playerSelection}`;
    } else if(gameState === "Draw") {
        draw++;
        score[2].textContent = `Draws: ${draw}`;
        return `Draw! ${playerSelection} and ${compSelection}`;
    }
};

let reset = () => {
    const score = document.querySelectorAll('.score');
    const para = document.querySelector('#info');
    wins = loses = draw = 0;
    score[0].textContent = `Wins: ${wins}`;
    score[2].textContent = `Draws: ${draw}`;
    score[1].textContent = `Loses: ${loses}`;
    para.innerHTML = `You: <br>Computer: <br>`;
    return 'Pick your choice to begin.';
}
let output = (playerSelection, compSelection= compPlay()) => {
    const para = document.querySelector('#info');
    para.innerHTML= `You: ${playerSelection} <br>Computer: ${compSelection}<br>${play(playerSelection, compSelection)}`;
};

const buttons = document.querySelectorAll('.button');

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        output(btn.id);
    });
}); 
