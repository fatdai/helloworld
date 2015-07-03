/**
 * Created by mac on 15/7/3.
 */


var id = 1;

// used to execute the action in server
var Action = function(opts){

    //this.data = opts.data;

    this.id = opts.id || id++;
    this.type = opts.type || 'defaultAction';

    this.finished = false;
    this.aborted = false;
    this.singleton = false || opts.singleton;
};

/**
 * Update interface, default update will do nothing, every tick the update will be invoked
 * @api public
 */
Action.prototype.update = function() {
};

module.exports = Action;

