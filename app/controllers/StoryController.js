var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var controller = {};

    var Story = app.models.Story;
    var StoryResume = app.models.StoryResume;
    var InternalServerError = app.models.error.InternalServerErrorModel;

    controller.find = function(req, res) {
        var _id = req.params.id;

        if (_id) {
            var promise = Story.find({ '_id': _id }).exec()
                .then(function(story) {
                    if(!story.length){
                        throw new InternalServerError('História inexistente.');
                    }
                    res.json(story);
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
                    return console.error(error);
                });
        }
    };

    controller.save = function(req, res) {
        var story = req.body;

        if (story.id) {
            Story.findByIdAndUpdate(story.id, story).exec()
                .then(function(story) {
                    res.json(contato);
                })
                .catch(function(error) {
                    //TODO: Implementar log? Tratar erro
                    return console.error(error);
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

    return controller;
}