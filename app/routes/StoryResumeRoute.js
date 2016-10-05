module.exports = function(app) {
    var controller = app.controllers.StoryResumeController;

    app.route('/myStories')
        .get(controller.find);
}