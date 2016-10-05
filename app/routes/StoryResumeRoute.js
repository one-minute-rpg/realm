// /app/routes/StoryRoute
// Configurações de rotas para operações com historias


module.exports = function(app) {
    var controller = app.controllers.StoryResumeController;

    app.route('/myStories')
        .get(controller.find);
}