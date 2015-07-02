/**
 * Created by dai on 15/7/2.
 */


module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};

