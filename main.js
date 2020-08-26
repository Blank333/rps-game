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
    
    let score = document.querySelectorAll('.score');
    if (playerSelection.toUpperCase() == compSelection.toUpperCase()){
        draw++;
        score[2].textContent = `Draws: ${draw}`;
        return `Draw! ${playerSelection} and ${compSelection}`;
    } 

    //Rock - Paper/Scissor
    //Paper - Rock/Scissor
    //Scissor - Rock/Paper
    
    switch(true){
        case ((rock.test(playerSelection)) && (scissor.test(compSelection))): 
        case((paper.test(playerSelection)) && (rock.test(compSelection))): 
        case((scissor.test(playerSelection)) && (paper.test(compSelection))):
        wins++;
        score[0].textContent = `Wins: ${wins}`;
        return `You win! ${playerSelection} beats ${compSelection}`;
        break;
        
        case ((rock.test(playerSelection)) && (paper.test(compSelection))): 
        case((paper.test(playerSelection)) && (scissor.test(compSelection))): 
        case((scissor.test(playerSelection)) && (rock.test(compSelection))): 
        loses++;
        score[1].textContent = `Loses: ${loses}`;
        return `You lose! ${compSelection} beats ${playerSelection}`;
        break;

        default: 
        return `${playerSelection} is Invalid`;
    }

    
    


};

let output = (playerSelection, compSelection= compPlay()) => {
    const para = document.querySelector('#info');
    para.innerHTML= `You: ${playerSelection} <br>Computer: ${compSelection}<br>${play(playerSelection, compSelection)}`;
};
let game = (rounds, playerSelection) => {
    for(let i=1; i <= rounds; ++i) {
        //let playerSelection = prompt("Enter your choice:\nRock, Paper, Scissor?");
        console.log(play(playerSelection));
    }
};

let start = () => {
    let rounds = prompt("How many rounds do you want to play?", 0);
    game(rounds);
};


const buttons = document.querySelectorAll('.button');

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        output(btn.id);
    });
}); 
