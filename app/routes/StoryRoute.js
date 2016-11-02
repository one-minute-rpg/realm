module.exports = function(app) {
    var controller = app.controllers.StoryController;

    app.route('/myStories/add')
        .post(controller.save);

    app.route('/myStories/update')
        .put(controller.save);

    app.route('/myStories/:id')
        .get(controller.find)
        .delete(controller.delete);

    app.route('/myStories')
        .get(controller.find);
}