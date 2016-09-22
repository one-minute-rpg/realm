 // app/models/Scene.js
// Model para cena

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            type: {
                type: string,
                required: true
            },
            title:{
                type: string,
                required: true
            },
            text: {
                type: string,
                required: true
            },
            actions: {
                type: [mongoose.schema.ObjectId],
                ref: 'Action'
            }
        });

    return mongoose.model('Scene', schema);
};