const firstBox = document.getElementById('firstBox');
const secondBox = document.getElementById('secondBox');
const thirdBox = document.getElementById('thirdBox');
const fourthBox = document.getElementById('fourthBox');
const fifthBox = document.getElementById('fifthBox');
const sixthBox = document.getElementById('sixthBox');
const seventhBox = document.getElementById('seventhBox');
const eighthBox = document.getElementById('eighthBox');
const ninthBox = document.getElementById('ninthBox');
const xButton = document.getElementById('xButton');
const oButton = document.getElementById('oButton');
const won = document.getElementById('winner');

const boxArray = [firstBox, secondBox, thirdBox, fourthBox, fifthBox, sixthBox, seventhBox, eighthBox, ninthBox];

const winningCombo = {
    firstCombo: [firstBox, secondBox, thirdBox], 
    secondCombo: [fourthBox, fifthBox, sixthBox], 
    thirdCombo: [seventhBox, eighthBox, ninthBox], 
    fourthCombo: [firstBox, fourthBox, seventhBox], 
    fifthCombo: [secondBox, fifthBox, eighthBox], 
    sixthCombo: [thirdBox, sixthBox, ninthBox], 
    seventhCombo: [firstBox, fifthBox, ninthBox], 
    eighthCombo: [thirdBox, fifthBox, seventhBox] 
}


let turn = '';

function startGame() {
    if (!xButton.disabled && !oButton.disabled) {
        for (let i = 0; i < boxArray.length; i++) {
            boxArray[i].style.pointerEvents = 'none';
        }
    } else {
        for (let i = 0; i < boxArray.length; i++) {
            boxArray[i].style.pointerEvents = 'auto'; 
        }
    }
    
}

function currentTurn() {
    xButton.addEventListener('click', () => {
        turn = 'X';
        xButton.style.backgroundColor = 'whitesmoke'
        xButton.disabled = true;
        oButton.disabled = false;    
        startGame();
    })

    oButton.addEventListener('click', () => {
        turn = 'O';
        oButton.style.backgroundColor = 'whitesmoke'
        oButton.disabled = true;
        xButton.disabled = false;  
        startGame();
    })
}

function boxes(event) {
    const box = event.target; 

    if(box.children.length === 0){
        const marker = document.createElement('p');
        marker.innerText = turn;
        box.appendChild(marker);
    }

    if(turn === 'X'){
        turn = 'O'
        oButton.disabled = true;
        xButton.disabled = false;
    }else{
        turn = 'X'
        xButton.disabled = true;
        oButton.disabled = false;
    };

    winner();
}


function boxClick() {

    for(let i = 0; i < boxArray.length; i++){
        boxArray[i].addEventListener('click', boxes);
        }

    }

    function winner() {
        for (const key of Object.keys(winningCombo)) {
            let X = 0;
            let O = 0;
            console.log('Checking combination:', key); // Debugging line
            for (let i = 0; i < winningCombo[key].length; i++) {
                console.log('Current box:', winningCombo[key][i].innerText); // Debugging line
                if (winningCombo[key][i].innerText === 'X') {
                    X++;
                } else if (winningCombo[key][i].innerText === 'O') {
                    O++;
                }
                console.log('X count:', X, 'O count:', O); // Debugging line
                if (X === 3) {
                    won.innerText = 'X wins!';
                    won.style.visibility = 'visible';
                    restartGame() 
                    return;
                } else if (O === 3) {
                    won.innerText = 'O wins!';
                    won.style.visibility = 'visible'
                    restartGame() 
                    return;
                }else{
                    tieGame();
                }
           
            }
        
        }
    }

    function restartGame() {
        for(let i = 0; i < boxArray.length; i++){
            boxArray[i].style.pointerEvents = 'none';
        }

        xButton.disabled = true;
        oButton.disabled = true;
    }

    function tieGame() {
        let boxCounter = 9;

        for(let i = 0; i < boxArray.length; i++){
            if(boxArray[i].innerText === 'X' || boxArray[i].innerText === 'O'){
                boxCounter--;
            }
        }

        if(boxCounter === 0){
            won.innerText = 'Tie Game'
            won.style.visibility = 'visible'
            restartGame();
        }
    }


    

currentTurn();
boxClick();
startGame();
winner();
