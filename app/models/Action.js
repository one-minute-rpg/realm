 // app/models/Action.js
// Model para ação

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            text: {
                type: String,
                required: true
            },
            require_item_ids: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Item'
            },
            require_attribute_value: {
                health: {
                    type: Number
                },
                strength: {
                    type: Number
                },
                agility: {
                    type: Number
                },
                intelligence: {
                    type: Number
                }
            },
            events: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Event'
            }
        });

    return mongoose.model('Action', schema);
};