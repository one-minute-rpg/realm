var sanitize = require('mongo-sanitize');

module.exports = function(app) {
    var controller = {};

    var StoryResume = app.models.StoryResume;

    controller.find = function(req, res) {
        var promise = StoryResume.find().exec()
            .then(function(resumes) {
                res.json(resumes);
            })
            .catch(function(error) {
                //TODO: Implementar log? Tratar erro
                return console.error(error);
            });
    };

    return controller;
}