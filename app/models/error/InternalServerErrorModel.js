module.exports = function (app) {
    return function(message, error){
        this.message = message;
        this.httpStatus = 500;
        this.error = error;
    }
};