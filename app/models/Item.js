// app/models/Item.js
// Model para item

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema( {
            type: {
                type: string,
                required: true
            },
            name: {
                type: string,
                required: true
            },
            text: {
                type: string
            },
            events: {
                type: [mongoose.schema.ObjectId],
                ref: 'Event'
            }
        });

    return mongoose.model('Item', schema);
};