/**
 * Created by dai on 15/7/2.
 */

var canvas = null,
    context = null;

window.onload = function(){

    canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");

    window.addEventListener('keydown',onKeyDown,false);

    var loginbtn = document.getElementById("loginbtn");
    loginbtn.onclick = function(){
        connect();
    }

    render();
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
        });
    });

}

function render(){
    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);

        context.fillStyle = "#000000";
        context.fillRect(0,0,canvas.width,canvas.height);

    })();
}

function onKeyDown(event){

}