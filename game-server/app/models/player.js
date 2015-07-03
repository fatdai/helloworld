/**
 * Created by mac on 15/7/3.
 */


var game = require('./game');

function Player(opts){

    this.id = opts.id;
    this.name = opts.name;

    if(opts.x === undefined || opts.y === undefined){
        this.x = Math.random() * game.WINDOW_WIDTH;
        this.y = Math.random() * game.WINDOW_HEIGHT;
    }else{
        this.x = opts.x;
        this.y = opts.y;
    }
}

module.exports = Player;


//*******************************************
Player.prototype.getPos = function(){
    return {x:this.x,y:this.y};
};

Player.prototype.setPos = function(x,y){
    this.x = x;
    this.y = y;
};