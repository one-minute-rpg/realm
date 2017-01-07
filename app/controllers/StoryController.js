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

        var story = req.body;

        story.quest_id = story.story_id;

        removeAllIds(story);

        axios.post('http://localhost:3001/quest/publish', story, config);
    };

function removeAllIds(obj) {
    if(obj && obj._id) {
        delete obj._id;
        Object.keys(obj).forEach(function(key) {
            removeAllIds(obj[key]); 
        });
    }
    else if(obj && Array.isArray(obj)) {
        obj.forEach(function(item) {
            removeAllIds(item);
        });
    }
}

    return controller;
}