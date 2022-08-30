const grid=document.querySelector('.grid')
const blockWidth=100
const blockHeight=20
const userStart=  [230,10]
let currentPosition = userStart
const boardWidth=560

//create Block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft=[xAxis, yAxis]
        this.bottomRight=[xAxis + blockWidth, yAxis]
        this.topLeft=[xAxis, yAxis+blockHeight]
        this.topRight=[xAxis + blockWidth, yAxis+blockHeight]
    }
}

//all my block
const blocks= [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
    new Block(10,150),
    new Block(120,150),
    new Block(230,150),
    new Block(340,150),
    new Block(450,150),]

//draw all my blocks
function addBlocks() {
    for (let i=0; i< blocks.length; i++) {
        const block=document.createElement('div')
        block.classList.add('block')
        block.style.left=blocks[i].bottomLeft[0] + 'px'
        block.style.bottom=blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

//add user
function drawUser() {
    user.style.left=currentPosition[0] + 'px'
    user.style.bottom=currentPosition[1] + 'px'

}


const user=document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)
addBlocks()

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if (currentPosition[0] > 0){
                currentPosition[0]-=10
                user.style.left=currentPosition[0] + 'px'
                user.style.bottom=currentPosition[1] + 'px'
            }
            break;
        
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth ){
                currentPosition[0]+=10
                user.style.left=currentPosition[0] + 'px'
                user.style.bottom=currentPosition[1] + 'px'
            }
            break;
    }
}


document.addEventListener('keydown', moveUser)