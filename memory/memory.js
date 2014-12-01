
// window.onload = function(){

//Pair variable
var cardArr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 0, 0];



// check if all cards are open
var cardsOpen = 0;

// turn counter
var turn = 0;

// combo check variables 
var openPairArr = [];
var cardIdArr = [];


//Fisher Yates Shuffle http://sedition.com/perl/javascript-fy.html
Array.prototype.cardShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}


// new game (or after reset)
function newGame() {
	cardsOpen = 0;
	var divInner = '';
	cardArr.cardShuffle();
	for (var i = 0; i < cardArr.length; i++) {
		divInner += '<div id="card'+i+'" onclick="cardFlip(this,\''+cardArr[i]+'\')"></div>';
		console.log(divInner);
	}
	document.getElementById("game").innerHTML = divInner; 
}

	
//when card flips
function cardFlip(card,value){
	if(card.innerHTML == "" && openPairArr.length < 2){
		card.style.background = '#18c1fd';
		card.innerHTML = value;
		if(openPairArr.length == 0){
			openPairArr.push(value);
			cardIdArr.push(card.id);
			turn++;
		//Card 2 open 
		} else if(openPairArr.length == 1){
			openPairArr.push(value);
			cardIdArr.push(card.id);
			turn++;
			// If pair is found
			if(openPairArr[0] == openPairArr[1]){
				cardsOpen += 2;
				openPairArr = [];
            	cardIdArr = [];
				
				// Game over
				if(cardsOpen == cardArr.length){
					alert("GOOD JOB! It took you " + turn + " turns to get it. Let's Play Again!");
					document.getElementById('game').innerHTML = "";
					newGame();
				}
			// when no pair is found
			} else {
				function flipBack(){
				    // Flip the 2 tiles back over
				    var card1 = document.getElementById(cardIdArr[0]);
				    var card2 = document.getElementById(cardIdArr[1]);
				    card1.style.background = "repeating-linear-gradient(-45deg, #13315c, #13315c 5px, white 5px, white 10px)";
            	    card1.innerHTML = "";
				    card2.style.background = "repeating-linear-gradient(-45deg, #13315c, #13315c 5px, white 5px, white 10px)";
            	    card2.innerHTML = "";
				    openPairArr = [];
            		cardIdArr = [];
				}
				// timer for flip
				setTimeout(flipBack, 500);
			}
		}
	}
}