let player = document.getElementById("player-hand");
document.getElementById("dealer-hand").innerHTML = getHandValue(dealerHand);
let newGame = document.getElementById("newGameButton");
let hitButton = document.getElementById("hitButton");
let standButton = document.getElementById("standButton");

let playerHand = [];
let dealerHand = [];
let deck = [];
let hasBlackJack = false;
let win = false;
let gameOver = false;
let tie = false;

let suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
let value = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

function deckOfCards()
{
    let deck = new Array();

    for (let i = 0; i < suits.length; i++)
    {
        for (let j = 0; j < value.length; j++)
        {
            deck.push('${value[j]} of ${suits[i]}');
        }
    }
    
    return deck;
}

function shuffle(deck)
{
    for (let i = 0; i < 10000; i++)
    {
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let temp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2 = temp];
    }
}

function renderDeck(deck)
{
    document.getElementById("deck").innerHTML = "";

    for (let i = 0; i < deck.length; i++)
    {
        let card = document.createElement("div");
        let value = document.createElement("div");
        let suit = document.createElement("div");
        card.className = "card";
        value.className = "value";
        suit.className = "suit" + deck[i].Suit;

        value.innerHTML = deck[i].Value;
        card.appendChild(value);
        card.appendChild(suit);

        document.getElementById("deck").appendChild(card);
    }
}

function drawRandomcard(deck)
{
    return deck.pop();
}

function startGame()
{
    shuffle(deck);
    playerHand = [drawRandomcard(deck), drawRandomcard(deck)];
    player.style.display = "playerHand";
    dealerHand = [drawRandomcard(deck), drawRandomcard(deck)];
}

function getHandValue()
{
    var sum = 0;
    for (var i = 0; i < hand.length; i++)
    {
        if (hand[i] == "Jack"|| hand[i] == "Queen" || hand[i] == "King")
        {
            sum += 10;
        }
        else if (hand[i] == "Ace")
        {
            if (sum <= 10)
            {
                sum += 11;
            }

            else
            {
                sum += 1;
            }
        }
        else
        {
            sum += hand[i];
        }
    }
    return sum;
}

newGame.addEventListener('click', function()
{
    gameOver = false;
    win = false;
    hasBlackJack = false;
    tie = false;
    playerHand.clear();
    dealerHand.clear();
    startGame();
})

hitButton.addEventListener('click', function()
{
    playerHand.push(drawRandomcard(deck));
    getHandValue(playerHand);
    checkGameState();
    gameState();
})

standButton.addEventListener('click', function()
{
    getHandValue(dealerHand);
    while (getHandValue(dealerHand) < 15)
    {
        dealerHand.push(drawRandomcard(deck));
        getHandValue(dealerHand);
    }
})

function checkGameState()
{
    if (getHandValue(playerHand) == 21)
    {
        return hasBlackJack = true;
    }

    else if (getHandValue(dealerHand) == 21)
    {
        return gameOver = true;
    }

    else if(getHandValue(playerHand) > 21)
    {
        return gameOver = true;
    }

    else if(getHandValue(dealerHand) > 21)
    {
        return win = true;
    }

    else if(getHandValue(playerHand) == getHandValue(dealerHand))
    {
        return tie = true;
    }
}

function gameState()
{
    if(hasBlackJack == true || win == true)
    {
        win;
    }

    else if(gameOver == true)
    {
        lost;
    }

    else if(tie == true)
    {
        tie;
    }
}