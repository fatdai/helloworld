/**
 * Created by dai on 15/7/5.
 */


// 作为一个管理全局的东西,可以方便的 get 东西
(function(){

    var app = {};
    app.delayTime = 0;
    app.game = null;
    app.player = null;


    app.lastTime = 0;


    app.init = function(){

    };

    var TIME_OUT = 60 * 1000; // 相当于1分钟计算一次延迟的时间

    //***************************************
    app.getDelayTime = function(){
        var beforeTime = Date.now();
        var route = 'connector.timeHandler.timeSync';
        pomelo.request(route,{clientTime:beforeTime},function(data){
            if(data.code == consts.MESSAGE.RES){
                var afterTime = Date.now();
                var delayTime = (afterTime - beforeTime)/2;
                app.delayTime = delayTime;
            }
        });
    }

    //***************************************
    // 同步时间
    app.timeSync = function(){
        var self = this;
        self.getDelayTime();
        setInterval(function(){
            self.getDelayTime();
        },TIME_OUT);
    };

    window.app = app;

})();