/**
 * Created by mac on 15/7/3.
 */

(function(){
    var win = window;

    var Game = function(){
        this.players = {}
        this.playerId = -1;
    }

    Game.prototype.addPlayer = function(player){
        this.players[player.id] = player;
    };

    Game.prototype.getPlayer = function(id){
        return this.players[id];
    }

    Game.prototype.getCurPlayer = function(){
        return this.players[this.playerId];
    }

    Game.prototype.removePlayer = function(id){
        if(!this.players[id]){
            return true;
        }

        delete this.players[id];
    }

    var singleGame = new Game();
    win.game = singleGame;
})();

