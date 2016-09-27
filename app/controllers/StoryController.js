// /app/controllers/StoryController
// Controller para gerenciar operações de manutenção e pesquisa de historias

var sanitize = require('mongo-sanitize');

module.exports = function(app){

    var controller = {};
    var Story = app.models.Story;
    var StoryResume = app.models.StoryResume;

    controller.findAll = function(req, res){
        var promise = StoryResume.find().exec()
            .then(function(resumes){
                res.json(resumes);
            })
            .catch(function(error){
                //TODO: Implementar log? Tratar erro
                return console.error(error);
            });
    };

    controller.findById = function(req, res){
        var _id = req.params.id;

        var promise = Story.find({'_id': _id}).exec()
            .then(function(story){
                res.json(story);
            })
            .catch(function(error){
                //TODO: Implementar log? Tratar erro
                return console.error(error);
            });
    };

    controller.save = function(req, res){
        var story = req.body;

        if(story.id){
            update(story)
                .then(function(story){
                    res.json(contato);
                })
                .catch(function(error){
                    //TODO: Implementar log? Tratar erro
                    return console.error(error);
                });
        }else{
            insert(story)
                .then(function(story){
                    res.status(201).json(story);
                })
                .catch(function(error){
                    //TODO: Implementar log? Tratar erro
                    return console.error(error);
                });
        }

    };

    controller.delete = function(req, res){
        var _id = sanitize(req.params.id);

        Story.remove({"_id" : _id}).exec()
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

    function insert(story){
        return Story.create(story).exec();
    };

    function update(story){
        return Story.findByIdAndUpdate(story.id, story).exec();
    };


    return controller;
}