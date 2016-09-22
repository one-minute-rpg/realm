// app/models/Story.js
// Model para história

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            title:{
                type: String,
                required: true
            },
            character: {
                itens: {
                    type: [mongoose.Schema.ObjectID],
                    ref: 'Item'
                },
                attributes: {
                    health: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    },
                    strength: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    },
                    agility: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    },
                    intelligence: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    }
                }
            },
            itens: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Scene'
            },
            creatures: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Creature'
            },
            scenes: {
                type: [mongoose.Schema.ObjectId],
                ref: 'Scene'
            }
        });

    return mongoose.model('Story', schema);
};