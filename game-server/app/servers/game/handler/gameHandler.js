/**
 * Created by dai on 15/7/2.
 */
var Player = require('../../../models/player');
var game = require('../../../models/game');
var consts = require('../../../models/consts');
var Move = require('../../../models/action/move');

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

Handler.prototype.move = function(msg,session,next){
    console.log("receive move command");

    var endPos = msg.targetPos;
    var playerId = session.get('playerId');
    var player = game.getPlayer(playerId);
    if(!player){
        console.log("Move without a valid player!");
        next(new Error('invalid player:'+playerId),{
            code : consts.MESSAGE.ERR
        });
        return;
    }

    if(endPos.x > game.WINDOW_WIDTH || endPos.x < 0 ||
    endPos.y > game.WINDOW_HEIGHT || endPos.y < 0){
        console.log("illegal endPos.x : " + endPos.x + ";endPos.y:"+endPos.y);
        next(new Error("illegal endPos!!!"),{
           code : consts.MESSAGE.ERR
        });
    }

    var action = new Move({
        player : player,
        endPos : endPos
    });

    if(game.timer().addAction(action)){
        console.log("add move action success!!");
        next(null,{
            code: consts.MESSAGE.RES,
            sPos : player.getPos()
        });

        console.log("push move command....");
        game.getChannel().pushMessage({
            route : 'onMove',
            playerId:player.playerId,
            endPos : endPos
        });
    }
}
