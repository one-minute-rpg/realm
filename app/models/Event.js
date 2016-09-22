// app/models/Event.js
// Model para evento

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema( {
            event_type: {
                type: string,
                required: true
            },
            text: {
                type: string
            },
            attribute: {
                type: string
            },
            value: {
                type: number
            },
            scene_id: {
                type: mongoose.schema.ObjectId,
                ref: 'Scene'
            }
        });

    return mongoose.model('Event', schema);
};