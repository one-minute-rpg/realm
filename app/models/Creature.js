// app/models/Creature.js
// Model para criatura

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            name:{
                type: string,
                required: true
            },
            level: {
                type: number,
                required: true
            },
            attributes: {
                health: {
                    type: number,
                    required: true
                },
                strength: {
                    type: number,
                    required: true
                },
                agility: {
                    type: number,
                    required: true
                },
                intelligence: {
                    type: number,
                    required: true
                }
            }
        });

    return mongoose.model('Creature', schema);
};