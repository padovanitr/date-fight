//Turn-based game created on Javascript and jQuery for Project 6 
/* ------------------------ 
------  VARIABLES ---------
---------------------------*/

const mapSize = 99;
const obstacles = 20;
let spaces = [];
let tile = [];
let possibleMoves = 3;
let playerActive;
let activePlayer = 1;
let currentWeapon = 1;
let turn = 0;
let playerDefend = null;
let player1Active = true;
let player2Active = false;
let move = true;
let attacked = false;
const attackBtn1 = $('.btn-attack-1');
const attackBtn2 = $('.btn-attack-2');
const defendBtn1 = $('.btn-defend-1');
const defendBtn2 = $('.btn-defend-2');
const startButton = $('#start');
const mapContainer = $('#board-game');
const startContainer = $('#intro');
const gameOverContainer =$('#gameOver');
const playerContainerDiv = $('.player-container');
const powerDiv1 = $('.powers-1');
const powerDiv2 = $('.powers-2');
const body = $('body');
const turnMessage = [
"Let's move, there is your turn! Good Luck!",
"Be careful, don't start your fight if you aren't strong enough!",
"Do you have enough powers?",
"Your enemy is behind your back!",
"Your move! Don't wait to long!",
]
const noTurnMessage = 'Wait for your turn!';



/* ------------------------------------ 
-------  GAME FUNCTIONALITY  ----------
--------------------------------------*/

// map constructor function to create map space board with obstacles
const Map = function(mapSize) {
    this.mapSize = mapSize;

    this.create  = function() {
        for (let i = 0; i <= mapSize; i += 1) {
            mapContainer.append('<li class="box" data-index="' + i + '"></li>');
            let numSpaces = $('.box').length;
            spaces.push(numSpaces);
        }
    }
    this.obstacles = function(itemClass) {
        addComponents(itemClass)
    }
}

// create game map object
let game = new Map(mapSize);


// player construction function
const Player = function(name, lifeScore, itemClass, player, weapon, power, activePath) {
    this.name = name;
    this.lifeScore = lifeScore;
    this.itemClass = itemClass;
    this.player = player;
    this.weapon = weapon;
    this.power = power;
    this.activePath = activePath;

    //add players to the map
    this.add = function () {
        addComponents(this.itemClass, this.player);
    }
    // set information about player on the boards;
    this.setData = function() {
        $('.name-'+this.player).text(this.name);
        $('#life-'+ this.player).text(this.lifeScore);
        $('<img src="image/wp-1.png">').appendTo(".weapons-" + this.player);
        $('.powers-' + this.player).text(this.power);
    }
    //players fight logic
    this.attack = function(whichPlayer) {
        if(playerDefend == 1) {
            whichPlayer.lifeScore -= (this.power/2);
            playerDefend = 0;

            } else {
                whichPlayer.lifeScore -= this.power;
            }
                $('#life-' + whichPlayer.player).text(whichPlayer.lifeScore);
                if(whichPlayer.lifeScore <= 0) {
                    gameOverBoard();
            }
    }
    // check who is the winner and who lost the game and display the information on the Game Over Board 
    this.winner = function(whichPlayer) {
        if(whichPlayer.lifeScore <= 0) {
            $('#winner').text(this.name);
            $('#looser').text(whichPlayer.name);
        } else if (this.lifeScore <= 0) {
            $('#winner').text(whichPlayer.name);
            $('#looser').text(this.name);

        }
    }    
};


// create the Players
let player1 = new Player('Jão', 100, 'player1', 1, 'wp-1', 10, 'image/path.png');
let player2 = new Player('Zé', 100, 'player2', 2, 'wp-1', 10, 'image/path.png');


// this part initialize the movement of the players:


function movePlayer() {
    let gameBox = $('.box');

    showPossMovements();

    // show the possible movements of the player avoiding obstacles and the other player.
    function showPossMovements() {

        //POSSIBLE MOVEMENTS PLAYER 1
        if (player1Active) {

            gameBox.ready( function () {

                let playerP = boxPosition('.player1');
                let coordPlayer = getCoordinates(playerP);
                //console.log(coordPlayer);

                 
                //check the possible move vertically SOUTH P1
                for (let i = (playerP + 10); i <= (playerP + 30); i = i + 10) {
                        
                        let tile = $('.box[data-index="' + i + '"]');
                       
                        if (tile.hasClass('obstacle')) {
                            break;

                        } else if (tile.hasClass('player2')) {
                            break;

                        } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                        } else {
                            tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                            }
                        }


                //check the possible move vertically NORTH P1
                for (let i = (playerP - 10); i >= (playerP - 30); i = i - 10) {
                        
                        let tile = $('.box[data-index="' + i + '"]');
                        
                        if (tile.hasClass('obstacle')) {
                            break;

                        } else if (tile.hasClass('player2')) {
                            break;

                        } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                        } else {
                            tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                            }
                        }
                
                
                //check the possible move hosrizontally EAST P1
                for (let i = (playerP + 1); i <= (playerP + 3); i++) {

                    let tile = $('.box[data-index="' + i + '"]');
                    let boxTile = boxPosition(tile);
                    //console.log(boxTile);
                    let coordTile = getCoordinates(boxTile);
                    //console.log(coordTile);

                    if (coordPlayer.x === 9) {
                        break;

                    } else if (coordPlayer.x === 8) {
                        for (let i = (playerP + 1); i <= (playerP + 1); i++) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                            }
                        }

                    } else if (coordPlayer.x === 7) {
                        for (let i = (playerP + 1); i <= (playerP + 2); i++) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                            }
                        }


                    } else if (tile.hasClass('obstacle')) {
                        break;

                    } else if (tile.hasClass('player2')) {
                            break;

                    } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                    } else {

                        tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                    }

                }
                
                
                //check the possible move hotizontally WEST P1
                for (let i = (playerP - 1); i >= (playerP - 3); i--) {

                    let tile = $('.box[data-index="' + i + '"]');
                    let boxTile = boxPosition(tile);
                    //console.log(boxTile);
                    let coordTile = getCoordinates(boxTile);
                    //console.log(coordTile);

                    if (coordPlayer.x === 0) {
                        break;

                    } else if (coordPlayer.x === 1) {
                        for (let i = (playerP - 1); i >= (playerP - 1); i--) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                            }
                        }

                    } else if (coordPlayer.x === 2) {
                        for (let i = (playerP - 1); i >= (playerP - 2); i--) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                            }
                        }


                    } else if (tile.hasClass('obstacle')) {
                        break;

                    } else if (tile.hasClass('player2')) {
                            break;

                    } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                    } else {

                        tile.css('backgroundImage', 'url(' + player1.activePath + ')');

                    }

                }

                    
            });




        //POSSIBLE MOVIMENTS PLAYER 2
        } else {

            gameBox.ready( function () {

                let playerP2 = boxPosition('.player2');
                let coordPlayer2 = getCoordinates(playerP2);
                 
                //check the possible move vertically SOUTH P2
                for (let i = (playerP2 + 10); i <= (playerP2 + 30); i = i + 10) {
                    
                    let tile = $('.box[data-index="' + i + '"]');
                   
                    if (tile.hasClass('obstacle')) {
                        break;

                    } else if (tile.hasClass('player1')) {
                        break;
                        
                    } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                    } else {
                        tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                    }
                }


                //check the possible move vertically NORTH P2
                for (let i = playerP2 - 10; i >= (playerP2 - 30); i = i - 10) {
                    
                    let tile = $('.box[data-index="' + i + '"]');
                    
                    if (tile.hasClass('obstacle')) {
                        break;

                    } else if (tile.hasClass('player1')) {
                        break;

                    } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                    } else {
                        tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                    }
                }



                //check the possible move horizontally WEST P2
                for (let i = (playerP2 - 1); i >= (playerP2 - 3); i--) {

                    let tile = $('.box[data-index="' + i + '"]');
                    let boxTile = boxPosition(tile);
                    coordTile = getCoordinates(boxTile);

                    if (coordPlayer2.x === 0) {
                        break;

                    } else if (coordPlayer2.x === 1) {
                        for (let i = (playerP2 - 1); i >= (playerP2 - 1); i--) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                            }
                        }

                    } else if (coordPlayer2.x === 2) {
                        for (let i = (playerP2 - 1); i >= (playerP2 - 2); i--) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                            }
                        }


                    } else if (tile.hasClass('obstacle')) {
                        break;

                    } else if (tile.hasClass('player2')) {
                            break;

                    } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                    } else {
                        tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                    }

                }
                


                //check the possible move horizontally EAST P2
                for (let i = (playerP2 + 1); i <= (playerP2 + 3); i++) {

                    let tile = $('.box[data-index="' + i + '"]');
                    let boxTile = boxPosition(tile);
                    let coordTile = getCoordinates(boxTile);

                    //verify if the player is not at the aedge of the board in order not to show the path on the other side of the board
                    if (coordPlayer2.x === 9) {
                        break;

                    } else if (coordPlayer2.x === 8) {
                        for (let i = (playerP2 + 1); i <= (playerP2 + 1); i++) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                            }
                        }

                    } else if (coordPlayer2.x === 7) {
                        for (let i = (playerP2 + 1); i <= (playerP2 + 2); i++) {

                            let tile = $('.box[data-index="' + i + '"]');

                            if (tile.hasClass('obstacle')) {
                                break;

                            } else if (tile.hasClass('player2')) {
                                    break;

                            } else {
                                tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                            }
                        }


                    } else if (tile.hasClass('obstacle')) {
                        break;

                    } else if (tile.hasClass('player2')) {
                            break;

                    } else if (tile.hasClass('wp-1') || tile.hasClass('wp-2') ||
                            tile.hasClass('wp-3') || tile.hasClass('wp-4') ||
                            tile.hasClass('wp-5'))  {
                            continue;

                    } else {
                        tile.css('backgroundImage', 'url(' + player2.activePath + ')');

                    }

                }

            });

        } 

        return;

    }

    //close function to show possible movements


    
    // by the click method choose the next position of the player 
    gameBox.on('click', function () {

        let sqClicked = $(this).data('index');
        posNew = getCoordinates(sqClicked);
        //By clicking on vertically position the user can choose the new possition - coordinate X
        for (let i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
            let num = getSpaceIndex(i, posOld.y);
            let space = $('.box[data-index="' + num + '"]');
            if (space.hasClass('obstacle')) {
                $(this).css('cursor', 'not-allowed');
                return;
            }
            if (player1Active) {
                if (space.hasClass('player2')) {
                    return;
                }
            } else {
                if (space.hasClass('player1')) {
                    return;
                }
            }
        }
        //check possible new position of the player choosen by mouse click vertically
        for (let i = Math.min(posOld.y, posNew.y); i <= Math.max(posOld.y, posNew.y); i++) {
            let num = getSpaceIndex(posOld.x, i);
            let space = $('.box[data-index="' + num + '"]');
            // if new space includes obstacle - don't move
            if (space.hasClass('obstacle')) {
                $(this).css('cursor', 'not-allowed');
                return;
            }
            // if new space includes players - don't move
            if (player1Active) {
                if (space.hasClass('player2')) {
                    return;
                }
            } else {
                if (space.hasClass('player1')) {
                    return;
                }
            }
        }
        if (player1Active) {
            if ($(this).hasClass('player1')){
                return;
            }
        }else{
            if ($(this).hasClass('player2')){
                return;
            }
        }

        if (move) {
            // verify when the player can move maximum 3 spaces (possibleMoves) horizontally or vertically
            if (posNew.y === posOld.y && posNew.x <= posOld.x + possibleMoves && posNew.x >= posOld.x - possibleMoves
                || posNew.x === posOld.x && posNew.y <= posOld.y + possibleMoves && posNew.y >= posOld.y - possibleMoves) {
                // verify the x position
                for (let i = Math.min(posOld.x, posNew.x); i <= Math.max(posOld.x, posNew.x); i++) {
                    let num = getSpaceIndex(i, posOld.y);
                    checkWeapon(num);
                }
                // verify the y position
                for (let i = Math.min(posOld.y, posNew.y); i <= Math.max(posOld.y, posNew.y); i++) {
                    let num = getSpaceIndex(posOld.x, i);
                    checkWeapon(num);
                }


                whoIsActive();
                // if the player moved, his space lose a class 'active', which is set to opposite player
                if (player1Active) {
                    playerPosition = boxPosition('.player2');
                    posOld = getCoordinates(playerPosition);
                    $('.player1').removeClass('player1').removeClass('active');
                    $(this).addClass('player1');
                    $('.player2').addClass('active');
                    fight(posNew, posOld);
                    player1Active = false;
                    

                
                } else {
                    playerPosition = boxPosition('.player1');
                    posOld = getCoordinates(playerPosition);
                    $('.player2').removeClass('player2').removeClass('active');
                    $(this).addClass('player2');
                    $('.player1').addClass('active');
                    fight(posNew, posOld);
                    player1Active = true;
                    
                }
            }

            
        }

        // clear the possible movements before take turns and show the new ones for the active player
        for (let i = 0; i <= 100; i++){
        let space = $('.box[data-index="' + i + '"]');

        space.css('backgroundImage', '');

        }

        showPossMovements();
        
    });

    
}

// weapon function constructor:
function Weapon(type, value, itemClass) {
    this.type = type;
    this.value = value;
    this.itemClass = itemClass;

    // add weapons to the map
    this.add = function () {
    addComponents(this.itemClass);
    }

};



// create weapons with their attributes
let defaultWeapon = new Weapon('DefaultWeapon', 10, 'wp-1 weapon');
let stone = new Weapon('stone', 30, 'wp-2 weapon');
let stick = new Weapon('stick', 40, 'wp-3 weapon');
let bottle = new Weapon('bottle', 50, 'wp-4 weapon');
let poo = new Weapon('poo', 60, 'wp-5 weapon');



// replace the weapon on the map:
function replaceWeaponOnMap(value, weapon, num) {
    let space = $('.box[data-index="' + num + '"]');
    whoIsActive();
    space.removeClass(weapon).addClass(playerActive.weapon);
    playerActive.weapon = weapon;    
    playerNotActive.power = value;        
}



// check weapon on the space and call replace functions (for the player's and for the map):
function checkWeapon(num) {
    let space = $('.box[data-index="' + num + '"]');
    if (space.hasClass('weapon')) {
        if (space.hasClass('wp-1')) {
            currentWeapon = 1;
            replaceWeaponOnMap(defaultWeapon.value, 'wp-1', num);
            replaceWeaponOnBoard(defaultWeapon.value);
            return;
        }
        if (space.hasClass('wp-2')) {
            currentWeapon = 2;
            replaceWeaponOnMap(stone.value, 'wp-2', num);
            replaceWeaponOnBoard(stone.value);
            return;
        }
        if (space.hasClass('wp-3')) {
            currentWeapon = 3;
            replaceWeaponOnMap(stick.value,'wp-3',num);
            replaceWeaponOnBoard(stick.value); 
            return;
        }
        if (space.hasClass('wp-4')) {
            currentWeapon = 4;
            replaceWeaponOnMap(bottle.value, 'wp-4', num);
            replaceWeaponOnBoard(bottle.value);
            return;
        }
            if (space.hasClass('wp-5')) {
            currentWeapon = 5;
            replaceWeaponOnMap(poo.value,'wp-5', num);
            replaceWeaponOnBoard(poo.value);
            return;
            }
        
        }

}




// If players cross over adjacent squares (horizontally or vertically) a battle begins
function fight(posNew, posOld) {

    if (posNew.x === posOld.x 
        && posNew.y <= posOld.y + 1 && posNew.y >= posOld.y - 1 ||posNew.y === posOld.y 
        && posNew.x <= posOld.x + 1 && posNew.x >= posOld.x - 1) {
        move = false;
        fightingArea();
        scores = 0;
        fightPlayerOne();
        fightPlayerTwo();
    }
}


// check which player is active:
function whoIsActive() {
    if (player1Active) {
        activePlayer = 2;
        notActivePlayer = 1;
        setActivePlayer(player2, player1, powerDiv2);
        setActiveBoard(notActivePlayer, activePlayer);
        displayMessageOnBoard(activePlayer);  
    } else {
        activePlayer = 1; 
        notActivePlayer = 2;
        setActivePlayer(player1, player2, powerDiv1);
        setActiveBoard(notActivePlayer, activePlayer,);
        displayMessageOnBoard(activePlayer);
    }

}




//initialize the Game
function initGame() {
    game.create();
    for (let i = 0; i < obstacles; i += 1) {
        game.obstacles('obstacle');
    }
    stone.add();
    stick.add();
    bottle.add();
    poo.add();
    player1.add();
    player2.add();
    player1.setData();
    player2.setData();
    $('.player1').addClass('active');

}



initGame();
movePlayer();




// to find position x and y on the map 
function getCoordinates(space) {
    return {
        x: (space) % 10
        ,
        y: Math.floor((space) / 10)
    }
}
// to find the position of the box with player class
const boxPosition = (itemClass) => {
    return $(itemClass).data('index');
};



let playerPosition = boxPosition('.player1');
//console.log(playerPosition);







// old position is the position of not active player in the moment
let posOld = getCoordinates(playerPosition);

// index of the space on the map (from 1 to 100);
function getSpaceIndex(x, y) {
    return y * 10 + x;
}



/* add components to the map like obstacles, weapon, players, which is used by 'add' function by their function constructor */
function addComponents(itemClass, player) {
    let restOfSpaces = spaces;
    let boxes = $('.box');
    let empty = true;
    while (empty) {
        let item = random(mapSize);
        if (player === 1) {
            positionRules = (item % 10 === 0);
        } else if (player === 2) {
            positionRules = (item % 10 === 9);
        } else {
            positionRules = (item % 10 !== 0 && item % 10 !== 9);
        }
        if (positionRules && restOfSpaces.includes(item)) {
            boxes.eq(item).addClass(itemClass);
            let index = restOfSpaces.indexOf(item);
            restOfSpaces.splice(index, 1);
            empty = false;
        }
    }
}




// randomize the weapons on the map to randomize position of game's components
function random(num) {
    return Math.floor(Math.random() * num);
}




/* ------------------------------------------------
------  INFORMATION ON THE PLAYER'S BOARDS -------
--------------------------------------------------*/

//set attributes to the acctive player to use them by replacing weapon
function setActivePlayer(Active, notActive, activePowerDiv) {
    playerActive = Active;
    playerNotActive = notActive; 
    activePlayerPowerDiv = activePowerDiv;      
}
// add a class for a board of the active player to display current information about game flow
function setActiveBoard(notActivePlayer, activePlayer) {
    $('#player-' + notActivePlayer).removeClass('active-board');
    $('#player-' + activePlayer).addClass('active-board');
}
// display random message on active player's board
function displayMessageOnBoard(activePlayer) {  
    let text = turnMessage[Math.floor(Math.random()*turnMessage.length)];
    $('.turn-' + activePlayer).text(text);
    $('.turn-' + notActivePlayer).text(noTurnMessage);
}
// replace the information on the player's board:
function replaceWeaponOnBoard(power){
    whoIsActive();
    $('.weapons-' + notActivePlayer).empty();
    $('<img src="image/wp-' + currentWeapon +'.png">').appendTo(".weapons-" + notActivePlayer);
    $(".powers-" + notActivePlayer).text(power);
}


// show and hide buttons during the fight
function combat() {
    if(turn == 0) {
        attackBtn1.hide();
        defendBtn1.hide();
        attackBtn2.hide();
        defendBtn2.hide();
    }else if(turn == 1) {
        attackBtn2.hide();
        defendBtn2.hide();
        attackBtn1.show();
        defendBtn1.show();
    } else if (turn == 2) {
        attackBtn1.hide();
        defendBtn1.hide();
        attackBtn2.show();
        defendBtn2.show();       
    }
}




// when the players fight, the board game is hidden
function fightingArea() {
    mapContainer.hide();
    $('#player-1').css('margin-left', '300px');
    $('#player-2').css('margin-right', '300px');
    $(body).css({
        'backgroundImage' : 'url("image/bg-final.jpg")',
        'backgroundSize'  : 'no-repeat'
    })
    $('div.turn-1').empty();
    $('div.turn-2').empty();
    $('#player-' + activePlayer).removeClass('active-board');
    attackBtn1.show();
    defendBtn1.show();

}




// display Game Over board at the end, when battle is finished
function gameOverBoard() {
    $('.player-container').hide();
    $('header').hide();
    gameOverContainer.show();
    player1.winner(player2);
}



/*--------------------------
 -------  BUTTONS -------- 
 --------------------------*/

function startGame(){
    playerContainerDiv.show();
    mapContainer.show();
    startContainer.hide();
    attackBtn1.hide();
    attackBtn2.hide(); 
    defendBtn1.hide();
    defendBtn2.hide();
    $('#player-1').addClass('active-board');
 };

// attack and defend buttons connected with attack function mentioned in player function constructor
function fightPlayerOne(){
    attackBtn1.click(function() {
        player1.attack(player2);
        pleyerDefend = 0;
        turn = 2;
        activePlayer = 2;
        combat();
    });
    defendBtn1.click(function(){
        playerDefend = 1;
        turn = 2;
        activePlayer = 2;
        combat();
        
    })
}



function fightPlayerTwo() {
        attackBtn2.click(function() {
        player2.attack(player1);
        pleyerDefend = 0;
        turn = 1;
        activePlayer = 1;
        combat();
    });
    defendBtn2.click(function(){       
        turn = 1;
        playerDefend = 1;
        activePlayer = 1;
        combat();
        
    })
}
