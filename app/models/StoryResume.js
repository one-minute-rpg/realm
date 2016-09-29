// app/models/StoryResume.js
// Model para resumo de historia, armazenando apenas dados para pesquisa rapida

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            title:{
                pt_BR: {
                    type: String,
                    required: true
                },
                en_US: {
                    type: String
                }
            },
            story_id:{
                type: mongoose.Schema.ObjectId,
                ref: 'Story'
            },
            cover: {
                type: String
            },
            scenes: {
                type: Number
            },
            description: {
                type: String
            }
        });

    return mongoose.model('StoryResume', schema);
};