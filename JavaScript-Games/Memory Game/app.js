const cardArray =[
    {
        name: 'fries',
        img: 'images/fries.png'
    },

    {
        name:'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    
    {
        name:'pizza',
        img: 'images/pizza.png'
    },

    {
        name: 'hotdog',
        img : 'images/hotdog.png'
    },

    {
        name:'milkshake',
        img: 'images/milkshake.png'
    },

    {
        name: 'ice-cream',
        img:'images/ice-cream.png'
    },

    {
        name: 'fries',
        img: 'images/fries.png'
    },

    {
        name:'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    
    {
        name:'pizza',
        img: 'images/pizza.png'
    },

    {
        name: 'hotdog',
        img : 'images/hotdog.png'
    },

    {
        name:'milkshake',
        img: 'images/milkshake.png'
    },

    {
        name: 'ice-cream',
        img:'images/ice-cream.png'
    }
]

cardArray.sort(() => 0.5- Math.random())

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result')
let cardChosen = [] 
let cardChosenId=[]
let cardsWon =[] 

let i=0
function createBoard() {
    cardArray.forEach(cardArray => {
        const card = document.createElement('img')  
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i++)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
    );
}

function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardChosen.push(cardArray[cardId].name)
    cardChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardChosen.length===2)
    {
        setTimeout(checkMatch,500)
    }
}

function checkMatch() {
    const cards= document.querySelectorAll('img')
    let option1 = cardChosenId[0]
    let option2 = cardChosenId[1]
   
    if (option1 == option2)
    {
        cards[option1].setAttribute('src', 'images/blank.png')   
        cards[option2].setAttribute('src', 'images/blank.png')   
        alert('You clicked the same image.')
    }
   
    if (cardChosen[0] == cardChosen[1]) {
        alert('You found a match!')
        cards[option1].setAttribute('src', 'images/white.png')
        cards[option2].setAttribute('src', 'images/white.png')
        cards[option1].remomveEventListener('click', flipCard)
        cards[option2].remomveEventListener('click', flipCard)
        cardsWon.push(cardChosen)
    }
    else {
        cards[option1].setAttribute('src', 'images/blank.png')
        cards[option2].setAttribute('src', 'images/blank.png')
        alert('No match. Try again!')
    }
    resultDisplay.innerHTML = cardsWon.length
    cardChosen = []
    cardChosenId = []

    if (cardsWon.length == cardArray.length/2)
    {
        resultDisplay.textContent = 'Congratulations, you found them all!'
    }

}

createBoard()
