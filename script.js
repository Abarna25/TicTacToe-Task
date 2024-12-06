const cells=document.querySelectorAll('.cell')
const titleHeader=document.querySelector('#titleHeader')
const xPlayerDisplay=document.querySelector('#xPlayer')
const oPlayerDisplay=document.querySelector('#oPlayer')
const resetButton=document.querySelector('#reset')

let player='X'
let isPauseGame=false
let isGamestart=false

const inputCells=['','','',
                  '','','',
                  '','','']

const winConditions= [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

cells.forEach((cell, index)=>{
    cell.addEventListener('click',()=>tapCell(cell, index))
})

function tapCell(cell, index){
    if(cell.textContent==''&& !isPauseGame){
        isGamestart=true
        updateCell(cell, index)
        if(!checkWinner()){
             changePlayer()
        }
    }
}

function updateCell(cell, index){
    cell.textContent=player
    inputCells[index]=player
    cell.style.color=(player=='X')? '#1892EA' :  '#A737FF'
}

function choosePlayer(selectedPlayer){
    if(!isGamestart){
        player=selectedPlayer
        if(player=='X'){
            xPlayerDisplay.classList.add('player-active')
            oPlayerDisplay.classList.remove('player-active')
        }else{
            xPlayerDisplay.classList.remove('player-active')
            oPlayerDisplay.classList.add('player-active')
        }
    }
}

function changePlayer(){
    player=(player=='X') ? 'O' : 'X'
}

function checkWinner(){
    for(const [a,b,c] of winConditions){
        if(inputCells[a]==player&&inputCells[b]==player&&inputCells[c]==player){
            player=inputCells[a];
            declareWinner([a,b,c])
            return true
        }
    }
    if(inputCells.every(cell=> cell!='')){
        declareDraw()
        return true
    }
}

function declareWinner(winningIndices){
    titleHeader.textContent=player+' Wins'
    isPauseGame=true
    winningIndices.forEach((index)=>
        cells[index].style.background='#2A2343'
    )
    resetButton.style.visibility='visible'
}

function declareDraw(){
    titleHeader.textContent='Draw!'
    isPauseGame=true
    resetButton.style.visibility='visible'
}

resetButton.addEventListener('click',()=>{
    resetButton.style.visibility='hidden'
    inputCells.fill('')
    cells.forEach(cell=>{
        cell.textContent=''
        cell.style.background=''
    })
    isPauseGame=false
    isGamestart=false
    titleHeader.textContent='Choose'
})