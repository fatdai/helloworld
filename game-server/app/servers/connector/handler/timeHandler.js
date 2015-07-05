/**
 * Created by dai on 15/7/5.
 */

var consts = require('../../../models/consts');

module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};

//*************************************
Handler.prototype.timeSync = function(msg,session,next){
    next(null,{
        code : consts.MESSAGE.RES
    });
}