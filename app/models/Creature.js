// app/models/Creature.js
// Model para criatura

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            name:{
                type: String,
                required: true
            },
            level: {
                type: Number,
                required: true
            },
            attributes: {
                health: {
                    type: Number,
                    required: true
                },
                strength: {
                    type: Number,
                    required: true
                },
                agility: {
                    type: Number,
                    required: true
                },
                intelligence: {
                    type: Number,
                    required: true
                }
            }
        });

    return mongoose.model('Creature', schema);
};