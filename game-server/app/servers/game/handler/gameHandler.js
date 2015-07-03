/**
 * Created by dai on 15/7/2.
 */
var Player = require('../../../models/player');
var game = require('../../../models/game');
var consts = require('../../../models/consts');

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};


//*********************************************
//*********************************************
Handler.prototype.enterScene = function(msg,session,next){
    console.log("player enterScene");

    var player = new Player({id:msg.playerId,name:msg.name});
    player.serverId = session.frontendId;

    // 将 player 添加到游戏里
    game.addPlayer(player);

    next(null,{
        code:consts.MESSAGE.RES,
        data : {
            playerId:player.id,
            game:game.getGameInfo()
        }
    });
};
