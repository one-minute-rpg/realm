module.exports = function (app) {
    return function(message, error){
        this.message = message;
        this.httpStatus = 404;
        this.error = error;
    }
};