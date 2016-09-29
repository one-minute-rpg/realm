angular.module('realm')
    .factory('StoryService', function($resource) {

        var Story = $resource('/myStories');

        Story.saveStory = saveStory;

        function saveStory(story) {

            var resume = createResume(story);

        }

        function createResume(story) {

            var resume = {};

            resume.title = { pt_BR: story.title.pt_BR };

            resume.description = story.description;

            resume.cover = story.cover;

            return resume;
        }

        return Story;
    });