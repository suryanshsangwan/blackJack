var suits = ["S", "H", "D", "C"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();
var userTotal = 0;
var dealerTotal = 0;
userCards = new Array();
dealerCards = new Array();

function start() {
    document.getElementById("startPage").style.display = "none";
    document.getElementById("playPage").style.display = "block";
    createDeck();
}

function newGame() {
    deck = [];
    userTotal = 0;
    dealerTotal = 0;
    userCards = [];
    dealerCards = [];
    document.getElementById("userCardsContainer").innerHTML = "";
    document.getElementById("dealerCardsContainer").innerHTML = "";
    document.getElementById("userTotal").innerHTML = "";
    document.getElementById("dealerTotal").innerHTML = "";
    document.getElementById("controls").style.display = "flex";
    document.getElementById("resultPage").style.display = "none";
    start();
}

function createDeck() {
    deck = new Array();
    for (var i = 0; i < values.length; i++) {
        for (var x = 0; x < suits.length; x++) {
            var weight = 0;
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            else if (values[i] == "A")
                weight = 11;
            else
                weight = parseInt(values[i]);
            var card = { Value: values[i], Suit: suits[x], Weight: weight, Path: "./Res/" + values[i] + suits[x] + ".png" };
            deck.push(card);
        }
    }
    shuffle();
    deal();
}

function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function userHit() {
    let tempCard = deck.pop();
    userCards.push(tempCard);
    document.getElementById("userCardsContainer").innerHTML += "<img src=" + userCards[userCards.length - 1].Path + ">";
    if (tempCard.Weight == 11) {
        if (userTotal + tempCard.Weight > 21) {
            userTotal += 1;
        }
        else
        {
            userTotal += 11;
        }
    }
    else{
        userTotal+=tempCard.Weight;
    }
    document.getElementById("userTotal").innerText = "Total: " + userTotal;
    if (userTotal >= 21) {
        result();
    }
}

function dealerHit() {
    let tempCard = deck.pop();
    dealerCards.push(tempCard);
    if (tempCard.Weight == 11) {
        if (dealerTotal + tempCard.Weight > 21) {
            dealerTotal += 1;
        }
        else
        {
            dealerTotal += 11;
        }
    }
    else{
        dealerTotal+=tempCard.Weight;
    }
}

function deal() {
    dealerHit();
    dealerHit();
    userHit();
    userHit();
    let innerHTMLDealerContainer = "<img src=./Res/gray_back.png>";
    document.getElementById("dealerCardsContainer").innerHTML = innerHTMLDealerContainer + "<img src=" + dealerCards[0].Path + ">";
    if (userTotal >= 21) {
        result();
    }
}

function result() {
    let innerHTMLDealerContainer = "";
    for (let i = 0; i < dealerCards.length; i++) {
        innerHTMLDealerContainer += "<img src=" + dealerCards[i].Path + ">";
    }
    document.getElementById("dealerCardsContainer").innerHTML = innerHTMLDealerContainer;
    document.getElementById("dealerTotal").innerText = "Total: " + dealerTotal;
    document.getElementById("controls").style.display = "none";
    document.getElementById("resultPage").style.display = "flex";
    if (dealerTotal == userTotal) {
        tie();
    }
    else if(dealerTotal>21)
    {
        win();
    }
    else if (userTotal < dealerTotal || userTotal > 21) {
        lose();
    }
    else {
        win();
    }
}

function tie() {
    document.getElementById("result").innerHTML = "Match resulted in a tie";
}

function win() {
    document.getElementById("result").innerText = "You Win";
}

function lose() {
    document.getElementById("result").innerHTML = "You Lost";
}

function hit() {
    userHit();
}

function stand()
{
    while(dealerTotal<17)
    {
        dealerHit();
    }
    result();
}