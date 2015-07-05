/**
 * Created by dai on 15/7/2.
 */

var canvas = null,
    startTick = false,
    context = null;

window.onload = function(){

    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");

    window.addEventListener('keydown',onKeyDown,false);

    var loginbtn = document.getElementById("loginbtn");
    loginbtn.onclick = function(){
        connect();
    }

    //render();
};

function connect(){
    var username = $("#name").val();
    var address = {
        host : "127.0.0.1",
        port : 3010,
        log : true
    };

    pomelo.init(address,function(){
        console.log(username+"  connect to connector!");

        var route = "connector.entryHandler.login";
        var msg = {
            username:username
        };
        pomelo.request(route,msg,function(data){
            if(!!data.err){
                console.log(route+" request error!!!");
                return;
            }
            console.log("playerId:" + data.playerId);
            window.game.playerId = data.playerId;
            console.log("ready enter Scene");

            var newroute = 'game.gameHandler.enterScene';
            var newmsg = {
                playerId:data.playerId,
                name:username
            }
            pomelo.request(newroute,newmsg,function(data){
                initMsgHandler();
                appStart(data.data.game);
            });
        });
    });
}

function initMsgHandler(){
    //*************************************************
    // 主要进行监听一些事件

    // Handle addPlayers
    pomelo.on('addPlayers',function(data){
        console.log("add a new player");
        var players = data.players;
        var game = window.game;
        if(!game){
            console.log("window.game is null or undefined!!!");
            return;
        }

        for(var i = 0; i < players.length; ++i){
            var player = game.getPlayer(players[i].id);
            if(!player){
                var p = new window.Player(players[i]);
                game.addPlayer(p);
            }
        }
    });


    // Handle removePlayers
    pomelo.on('removePlayers',function(data){
        var playerIds = data.playerIds;
        var game = window.game;
        var player = game.getPlayer(game.playerId);

        for(var i = 0; i < playerIds.length; ++i){
            if(playerIds[i] != player.id){
                game.removePlayer(playerIds[i]);
            }else{
                // remove current player
                console.error("remove current player!!");
            }
        }

    });

    // Handle move message
    pomelo.on('onMove',function(data){
        console.log("receive move action.....");

        console.log("playerId:"+data.playerId);
        var player = window.game.getPlayer(data.playerId);
        player.finished = false;
        player.endPos = data.endPos;

    });

    // Handle kick out messge, occours when the current player is kicked out
    pomelo.on('onKick',function(){
        console.log("receive onKick action.....");
    });

    // Handle disconect message, occours when the client is disconnect with servers
    pomelo.on('disconnect', function(reason) {
        console.log("receive disconnect action.....");
    });

    // Handle user leave message, occours when players leave the area
    pomelo.on('onUserLeave', function(data) {
        var game = window.game;
        var playerId = data.playerId;
        console.log('onUserLeave invoke!');
        game.removePlayer(playerId);
    });
}

function appStart(data){

    console.log("appStart.......");

    // 开始准备同步时间
    app.timeSync();

    for(var i  in data.players){
        var p = new window.Player(data.players[i]);
        window.game.addPlayer(p);
    }
    console.log(data.players);

    var time = Date.now();

    var tickCount = 0;
    var allCount = 0;
    var frameRate = 0;
    var startTime = time;
    var time2 = time;
    app.lastTime = time;
    var avgFrame = 0;

    //  准备监听事件
    startTick = true;
    var mousePos = utils.captureMouse(canvas);
    canvas.addEventListener('mousedown',function(){
        //console.log("mouse position    x:"+mousePos.x + "; y : " + mousePos.y);
        // move to mousePos
        move({x:mousePos.x,y:mousePos.y});
    });


    var tick = function(){
        var next = Date.now();

        // 应该更新游戏逻辑
        // TODO

        ++tickCount;
        ++allCount;

        var passedTime = next - time2;
        if(passedTime >= 2000){
            frameRate = Math.round(tickCount * 1000/passedTime);
            avgFrame = allCount * 1000/(next - startTime);
            tickCount = 0;
            time2 = next;
           // console.log("frameRate:"+avgFrame);
        }

        time = next;


        //***************************************
        // render
        window.requestAnimationFrame(tick);
        context.clearRect(0,0,canvas.width,canvas.height);

        context.fillStyle = "#ff0000";

        // for test
        // client update

        // 绘制 player
        var game = window.game;
        for(var i  in game.players){
            game.players[i].update();
            game.players[i].draw(context);
        }

        // 绘制 fps
        context.fillStyle = "#000000";
        context.fillText("fps:"+avgFrame,0,canvas.height - 30);

        app.lastTime = Date.now();
    };

    tick();
}


function move(targetPos){

    // 客户端正常的移动   speed = 200
    var player = game.getCurPlayer();
    player.endPos = targetPos;
    player.finished = false;


    //var route = 'game.gameHandler.move';
    //var msg = {
    //    targetPos : targetPos
    //};
    //console.log("m.x:"+targetPos.x+";m.y:"+targetPos.y);
    //pomelo.request(route,msg, function(result){
    //    if(result.code == consts.MESSAGE.RES){
    //        //console.log("move responsed>>  x:" + result.sPos.x + "; y : " + result.sPos.y);
    //        //window.game.getCurPlayer().setPos(result.sPos);
    //    }else{
    //        console.log("move action has problem!!");
    //    }
    //});

    //*************************************
    // 告诉服务端  我的目标位置
    var route = 'game.gameHandler.mymove';
    var msg = {
        targetPos:targetPos,
        delayTime:app.delayTime
    };
    pomelo.request(route,msg,function(data){
        if(data.code == consts.MESSAGE.RES){}
    });
}

function onKeyDown(event){

}