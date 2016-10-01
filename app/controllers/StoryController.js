// /app/controllers/StoryController
// Controller para gerenciar operações de manutenção e pesquisa de historias

var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var controller = {};

    var Story = app.models.Story;
    var StoryResume = app.models.StoryResume;

    controller.find = function(req, res) {
        var _id = req.params.id;

        if(_id){
            var promise = Story.find({ '_id': _id }).exec()
                .then(function(story) {
                    res.json(story);
                })
                .catch(function(error) {
                    //TODO: Implementar log? Tratar erro
                    return console.error(error);
                });
        }else{
            var promise = StoryResume.find().exec()
                .then(function(resumes) {
                    res.json(resumes);
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
                    StoryResume.create(createResume(story));
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

    function createResume(story) {

        var resume = {};

        resume.title = { pt_BR: story.title.pt_BR };
        resume.description = story.description;
        resume.cover = story.cover;
        resume.story_id = story._id;
        resume.scenesCount = story.scenes.length;

        return resume;
    };

    return controller;
}