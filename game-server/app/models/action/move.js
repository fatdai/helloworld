/**
 * Created by mac on 15/7/3.
 */

var Action = require('./action');
var util = require('util');


//  应该继承于 Action
var Move = function(opts){

     opts.type = 'move';
     opts.id = opts.player.id;
     opts.singleton = true;

     Action.call(this,opts);

     this.time = Date.now();
     this.player = opts.player;
     this.endPos = opts.endPos;
};

util.inherits(Move,Action);

//************************************************

Move.prototype.update = function(){
    var time = Date.now() - this.time;
    var speed = 200 ; // this.player.speed;
    var moveLength = speed * time /1000;
    var dis = getDis(this.player.getPos(),this.endPos);
    if(dis <= moveLength){
        this.finished = true;
        this.player.setPos(this.endPos.x,this.endPos.y);
        return;
    }

    var curPos = getPos(this.player.getPos(),this.endPos,moveLength,dis);
    this.player.setPos(curPos.x,curPos.y);
    this.time = Date.now();
}


function getDis(pos1,pos2){
    return Math.sqrt(Math.pow((pos1.x - pos2.x),2) + Math.pow((pos1.y - pos2.y),2));
}

// 线性插值计算位置
function getPos(start,end,moveLength,dis){
    if(!dis){
        dis = getDis(start,end);
    }
    var pos = {};
    pos.x = start.x + (end.x - start.x) * (moveLength / dis);
    pos.y = start.y + (end.y - start.y) * (moveLength / dis);
    return pos;
}

module.exports = Move;

