/**
 * Created by mac on 15/7/3.
 */


(function(){

    var win = window;

    var Player = function(opts){
        this.id = opts.id;
        this.name = opts.name;
        this.x = opts.x;
        this.y = opts.y;
        this.finished = true;
        this.endPos = null;
    };

    Player.prototype.draw = function(context){
        //context.save();
        context.fillText(this.name,this.x,this.y);
        context.fillRect(this.x,this.y,50,50);
        //context.restore();
    }

    Player.prototype.setPos = function(pos){
        this.x = pos.x;
        this.y = pos.y;
    };

    Player.prototype.getPos = function(){
        return {x:this.x,y:this.y};
    };


    Player.prototype.update = function(){

        if(this.finished){
            return;
        }

        var dt = Date.now() - app.lastTime;
     //   console.log("dt : " + dt);
        var speed = 200;

        var dx = this.endPos.x - this.x;
        var dy = this.endPos.y - this.y;
        var dis = utils.getDis(this.getPos(),this.endPos);
        var moveLenght = speed * dt / 1000;

        if(moveLenght >= dis){
            this.setPos(this.endPos);
            this.finished = true;
            return;
        }

        var rad = Math.atan2(dy,dx);
        var vx = Math.cos(rad) * speed * dt/1000;
        var vy = Math.sin(rad) * speed * dt/1000;

        this.x += vx;
        this.y += vy;
    }

    win.Player = Player;
})();