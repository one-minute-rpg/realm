 // app/models/Action.js
// Model para ação

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            text: {
                type: string,
                required: true
            },
            require_item_ids: {
                type: [mongoose.schema.ObjectId],
                ref: 'Item'
            },
            require_attribute_value: {
                health: {
                    type: number
                },
                strength: {
                    type: number
                },
                agility: {
                    type: number
                },
                intelligence: {
                    type: number
                }
            },
            events: {
                type: [mongoose.schema.ObjectId],
                ref: 'Event'
            }
        });

    return mongoose.model('Action', schema);
};