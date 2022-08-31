const grid=document.querySelector('.grid')
const blockWidth=100
const blockHeight=20
const userStart=  [230,10]
let currentPosition = userStart
const boardWidth=560
const boardHeight=300
const ballStart=[270,30]
let ballPosition = ballStart
let timerId
const ballDiameter = 20
let xDirection = 2
let yDirection = 2
const scoreDisplay = document.querySelector('#score')
let score=0

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

//draw user
function drawUser() {
    user.style.left=currentPosition[0] + 'px'
    user.style.bottom=currentPosition[1] + 'px'
}

//draw ball
function drawBall() {    
    ball.style.left=ballPosition[0] + 'px'
    ball.style.bottom=ballPosition[1] + 'px'
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

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()


//move ball
function moveBall() {
    ballPosition[0]+=xDirection
    ballPosition[1]+=yDirection
    drawBall()
    checkCollisions()
} 
 

timerId = setInterval(moveBall,30)

//check for collisions
function checkCollisions() {
    //check for block collisions
    for (let i=0; i< blocks.length; i++){
        if (
            (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0]) && 
            (ballPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].bottomRight[1])
        )
        {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++
            scoreDisplay.innerHTML='Score: ' + score

            //check for win
            if (blocks.length === 0)
            {
                scoreDisplay.innerHTML = 'You Won!'
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    //check for wall collisions
    if (ballPosition[0] >= (boardWidth - ballDiameter) || 
    ballPosition[1] >= (boardHeight - ballDiameter) ||
    ballPosition[0] <=0){
        changeDirection()
    }

    //check for user collisions
    if (ballPosition[0] > currentPosition[0] && ballPosition[0] < currentPosition[0] + blockWidth &&
        ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + blockHeight
        ){
            changeDirection()
        }


    //check for game over
    if ( ballPosition[1] <=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML= 'You Lost'
        document.removeEventListener('keydown', moveUser)
    }    
}

function changeDirection() {
    if (xDirection ===2 && yDirection ===2){
        yDirection =-2
        return
    }

    if (xDirection === 2 && yDirection === -2){
        xDirection= -2
        return
    }

    if (xDirection === -2 && yDirection === -2){
        yDirection=2
        return
    }

    if (xDirection === -2 && yDirection === 2){
        xDirection=2
        return
    }
}