/**
 * Created by dai on 15/7/2.
 */

var game = require('./game');

var exp = module.exports;

exp.run = function(){
    setInterval(tick,100);
}

function tick(){
    game.playersUpdate();
}