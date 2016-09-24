// /app/routes/StoryRoute
// Configurações de rotas para operações com historias


module.exports = function(app){
    var controller = app.controllers.StoryController;

    app.route('/stories')
        .get(controller.findAll)
        .post(controller.save);
    
    app.route('/story/:id')
        .get(controller.findById)
        .delete(controller.delete);
}