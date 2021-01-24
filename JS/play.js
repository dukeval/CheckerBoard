// let board = [null,'x',null,'x',null,'x',null,'x',
//              'x',null,'x',null,'x',null,'x',null
//              ,null,'x',null,'x',null,'x',null,'x',
//              '',null,'',null,'',null,'',null,
//              null,'',null,'',null,'',null,'',
//              'o',null,'o',null,'o',null,'o',null,
//              null,'o',null,'o',null,'o',null,'o',
//              'o',null,'o',null,'o',null,'o',null];

let highlighted = false;

// function newPlayinBoard(){
//     const playableSquare = document.querySelectorAll(".Black");
    
// }

function isMoveValid(fromCell, toCell)
{
    
    const fromCellPositon = fromCell.dataset.position;
    const toCellPositon = toCell.dataset.position;
    
    if((toCellPositon[0]== parseInt(fromCellPositon[0]) + 1) && 
       (toCellPositon[2]== parseInt(fromCellPositon[2]) - 1 || (toCellPositon[2]== parseInt(fromCellPositon[2]) + 1)) &&
       !toCell.classList.contains("player1ChessPieces")
       ){
        return true;
       }
    return false;    
}

function highLightPlayablePiece(cell){
    if(!highlighted && cell.classList.contains("player1ChessPieces")){
        cell.classList.add("highLight");
        highlighted = true;
        return true;
    }

    return false;
}

function movePieces(cell,playerScoreCardElement,fromCell,clickedCell){
    cell.classList.add("player1ChessPieces");
    highlighted = false;
    let move = document.createElement("li");
    move.innerHTML= (`You moved from cell ${fromCell.dataset.position} to cell ${clickedCell.dataset.position}`);
    
    playerScoreCardElement.appendChild(move);

    //hideMovedPiece();
    fromCell.classList.remove("player1ChessPieces");
    clearHighlightedSquares();
}

function clearHighlightedSquares(){
    const highLightedSquare = document.querySelectorAll(".playableSquare");
    
    highLightedSquare.forEach(square=>{
        if(square.classList.contains("highLight"))
        {                         
            square.classList.remove("highLight");
        }
    });
}

window.addEventListener("DOMContentLoaded", (event) =>{
    const playableSquare = document.querySelectorAll(".playableSquare");
    let fromCell;
    playableSquare.forEach(square=>{ 
        square.addEventListener('dblclick',(event)=>{
            //square.classList.remove("highLight");
            clearHighlightedSquares();
            highlighted=false;
        }),

        square.addEventListener('click',(event)=>{      
                if(highLightPlayablePiece(square)){
                    fromCell = event.srcElement;
                }
                else{
                    if(highlighted){
                        let playerScoreCardElement = document.querySelector(".player1ScoreCard");
                        const clickedCell= event.srcElement;

                        if(playerScoreCardElement != null && isMoveValid(fromCell, clickedCell))
                        {
                            movePieces(square,playerScoreCardElement,fromCell, clickedCell);                            
                        }
                }
            }
        });
    });
});