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
    };

    Player.prototype.draw = function(context){
        //context.save();
        context.fillText(this.name,this.x,this.y);
        context.fillRect(this.x,this.y,50,50);
        //context.restore();
    }

    win.Player = Player;
})();