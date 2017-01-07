var sanitize = require('mongo-sanitize');
var axios = require('axios');


module.exports = function(app) {
    var controller = {};

    var Story = app.models.Story;
    var StoryResume = app.models.StoryResume;
    var InternalServerError = app.models.error.InternalServerErrorModel;


    function find(id) {
        return Story.find({ '_id': id }).exec()
            .then(function(story) {
                if(!story.length){
                    throw new InternalServerError('História inexistente.');
                }
                
                return story;
            });
    }

    controller.find = function(req, res) {
        var _id = req.params.id;

        if (_id) {
            var promise = find(_id)
                .then(function(story) {
                    res.json(story)
                })
                .catch(function(error) {
                    delete error.error;
                    res.status(error.httpStatus).send(error);
                    console.log(error);
                });
        } else {
            var promise = Story.find().exec()
                .then(function(stories) {
                    res.json(stories);
                })
                .catch(function(error) {
                    //TODO: Implementar log? Tratar erro
                    console.error(error);
                });
        }
    };

    controller.save = function(req, res) {
        var story = req.body;

        if (!!story._id) {
            Story.findByIdAndUpdate(story._id, story).exec()
                .then(function(response) {
                    res.status(204).end();
                })
                .catch(function(error) {
                    //TODO: Implementar log? Tratar erro
                    console.error(error);
                });
        } else {
            Story.create(story)
                .then(function(story) {
                    res.status(201).json(story);
                })
                .catch(function(error) {
                    //TODO: Implementar log? Tratar erro
                    console.error(error);
                });
        }

    };

    controller.delete = function(req, res) {
        var _id = sanitize(req.params.id);

        Story.remove({ "_id": _id }).exec()
            .then(
                function() {
                    res.status(204).end();
                },
                function(error) {
                    //TODO: Implementar log? Tratar erro
                    return console.error(error);
                }
            );
    };

    controller.publish = function(req, res){
        var config = {
            header: { appkey: 'da8945882d90d542d4519cfa7a14a5bf' }
        };

        var story;
        var story_id = req.body.params.story_id;

        find(story_id)
            .then(function(data){
                story = data[0]._doc;
                story.quest_id = story.story_id;
            })
            .then(function(){
                axios.post('http://localhost:3001/quest/publish', story, config);
            });

        
    };

    return controller;
}