/**
 * Created by mac on 15/7/3.
 */

var game = require('../../../models/game');
var utils = require('../../../utils/utils');
var consts = require('../../../models/consts');

module.exports = function(app) {
    return new GameRemote(app);
};

var GameRemote = function(app) {
    this.app = app;
};


GameRemote.prototype.playerLeave = function(args,cb){
    var playerId = args.playerId;

    var player = game.getPlayer(playerId);
    if(!player){
        utils.invokeCallback(cb);
        return;
    }

    game.removePlayer(playerId);
    game.getChannel().pushMessage({
        route:'onUserLeave',
        code:consts.MESSAGE.RES,
        playerId:playerId
    });
    utils.invokeCallback(cb);
}

