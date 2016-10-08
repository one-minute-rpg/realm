module.exports = function (app) {
    return function(message, error){
        this.message = message;
        this.error = error;
    }
};