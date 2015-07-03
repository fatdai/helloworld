/**
 * Created by dai on 15/7/2.
 */

var pomelo = require('pomelo');
var timer = require('./timer');
var ActionManager = require('./action/actionManager');

var exp = module.exports;
exp.WINDOW_WIDTH = 640;
exp.WINDOW_HEIGHT = 480;


var players = {};
var channel = null;
var actionManager = null;

// 需要存储所有增加的 player
var addedPlayers = [];

// 这个只需存储需要删除的 playerIds
var reducedPlayerIds = [];

exp.init = function(opts){
    actionManager = new ActionManager();
    timer.run();
};

var getChannel = exp.getChannel = function(){
    if(!!channel){
        return channel;
    }

    // 一个全局的 channel
    channel = pomelo.app.get('channelService').getChannel('game_id',true);
    return channel;
};


exp.addPlayer = function(player){
    players[player.id] = player;
    getChannel().add(player.id,player.serverId);

    // 到时候还要广播到其他客户端,有新玩家加入
    // 将这些操作统一到 tick 里面操作
    addedPlayers.push(player);
    return true;
};

exp.playersUpdate = function(){
   // console.log("playersUpdate...........");
    if(reducedPlayerIds.length > 0){
        getChannel().pushMessage({route:'removePlayers',playerIds:reducedPlayerIds});
        reducedPlayerIds = [];
    }

    if(addedPlayers.length > 0){
        getChannel().pushMessage({route:'addPlayers',players:addedPlayers});
        addedPlayers = [];
    }
};

exp.getGameInfo = function () {
    var allPlayers = players;
    return {
        players : allPlayers
    };
};


exp.getPlayer = function(id){
    return players[id];
};

exp.removePlayer = function(id){
    var playerId = players[id].id;
    delete  players[id];
    reducedPlayerIds.push(playerId);
};

exp.timer = function(){
    return timer;
}

exp.actionManager = function(){
    return actionManager;
}

