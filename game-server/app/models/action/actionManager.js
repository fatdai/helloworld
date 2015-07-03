/**
 * Created by mac on 15/7/3.
 */

var Queue = require('./queue');

var ActionManager = function(opts){
    opts = opts || {};

    this.limit = opts.limit || 1000;

    // used to abort or cancel action
    // 相当于二级对象,第一级 key 第二级表示 id
    this.actionMap = {};

    // action queue,default size is 1000
    // all action in the action queue will excute in the FIFO order
    this.actionQueue = new Queue(this.limit);
};

ActionManager.prototype.addAction = function(action){
    if(action.singleton){
        this.abortAction(action.type,action.id);
    }

    this.actionMap[action.type] = this.actionMap[action.type] || {};
    this.actionMap[action.type][action.id] = action;
    return this.actionQueue.push(action);
};

ActionManager.prototype.abortAction = function(type,id){
    if(!this.actionMap[type] || !this.actionMap[type][id]){
        return;
    }

    this.actionMap[type][id].aborted = true;
    delete this.actionMap[type][id];
};

/**
 * Abort all action by given id, it will find all action type
 */
//ActionManager.prototype.abortAllAction = function (id) {
//    for (var type in this.actionMap) {
//        if (!!this.actionMap[type][id])
//            this.actionMap[type][id].aborted = true;
//    }
//};

ActionManager.prototype.update = function(){
    var length = this.actionQueue.length;

    for(var i = 0; i < length; ++i){
        var action = this.actionQueue.pop();
        if(action.aborted){
            continue;
        }

        action.update();
        if(!action.finished){
            this.actionQueue.push(action);
        }else{
            delete  this.actionMap[action.type][action.id];
        }
    }
}

module.exports = ActionManager;