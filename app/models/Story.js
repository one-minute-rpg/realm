// app/models/Story.js
// Model para história

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            title:{
                type: string,
                required: true
            },
            character: {
                itens: {
                    type: [mongoose.schema.ObjectID],
                    ref: 'Item'
                },
                attributes: {
                    health: {
                        current: {
                            type: number,
                            required: true
                        },
                        max: {
                            type: number,
                            required: true
                        }
                    },
                    strength: {
                        current: {
                            type: number,
                            required: true
                        },
                        max: {
                            type: number,
                            required: true
                        }
                    },
                    agility: {
                        current: {
                            type: number,
                            required: true
                        },
                        max: {
                            type: number,
                            required: true
                        }
                    },
                    intelligence: {
                        current: {
                            type: number,
                            required: true
                        },
                        max: {
                            type: number,
                            required: true
                        }
                    }
                }
            },
            itens: {
                type: [mongoose.schema.ObjectId],
                ref: 'Scene'
            },
            creatures: {
                type: [mongoose.schema.ObjectId],
                ref: 'Creature'
            },
            scenes: {
                type: [mongoose.schema.ObjectId],
                ref: 'Scene'
            }
        });

    return mongoose.model('Story', schema);
};