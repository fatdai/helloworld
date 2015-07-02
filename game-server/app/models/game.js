/**
 * Created by dai on 15/7/2.
 */

var pomelo = require('pomelo');
var timer = require('./timer');


var exp = module.exports;

var players = {};
var channel = null;


exp.init = function(opts){
    timer.run();
}

var getChannel = exp.getChannel = function(){
    if(!!channel){
        return channel;
    }

    // 一个全局的 channel
    channel = pomelo.app.get('channelService').getChannel('game_id',true);
    return channel;
}
