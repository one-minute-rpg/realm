// app/models/Item.js
// Model para item

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema( {
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            text: {
                type: String
            },
            events: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Event'
            }
        });

    return mongoose.model('Item', schema);
};