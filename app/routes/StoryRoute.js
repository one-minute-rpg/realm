// /app/routes/StoryRoute
// Configurações de rotas para operações com historias


module.exports = function(app) {
    var controller = app.controllers.StoryController;

    app.route('/myStories/add')
        .post(controller.save);

    app.route('/myStories')
        .get(controller.findAll);

    app.route('/myStories/:id')
        .get(controller.findById)
        .delete(controller.delete);
}