 // app/models/Scene.js
// Model para cena

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            type: {
                type: String,
                required: true
            },
            title:{
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            actions: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Action'
            }
        });

    return mongoose.model('Scene', schema);
};