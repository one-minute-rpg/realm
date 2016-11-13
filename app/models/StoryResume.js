var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            title:{
                pt_br: {
                    type: String,
                    required: true
                },
                en_us: {
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
            scenesCount: {
                type: Number
            },
            description: {
                type: String
            }
        });

    return mongoose.model('StoryResume', schema);
};