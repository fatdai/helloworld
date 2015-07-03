/**
 * Created by dai on 15/7/2.
 */

var game = require('./game');
var exp = module.exports;

exp.run = function(){
    setInterval(tick,100);
};

exp.addAction = function(action){
    return game.actionManager().addAction(action);
}

function tick(){

    // run all action
    game.actionManager().update();

    game.playersUpdate();
}

