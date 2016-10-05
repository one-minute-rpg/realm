module.exports = function(app) {
    var controller = app.controllers.StoryController;

    app.route('/myStories/add')
        .post(controller.save);

    app.route('/myStories')
        .get(controller.find);

    app.route('/myStories/:id')
        .get(controller.find)
        .delete(controller.delete);
}