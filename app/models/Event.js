// app/models/Event.js
// Model para evento

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema( {
            event_type: {
                type: String,
                required: true
            },
            text: {
                type: String
            },
            attribute: {
                type: String
            },
            value: {
                type: Number
            },
            scene_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Scene'
            }
        });

    return mongoose.model('Event', schema);
};