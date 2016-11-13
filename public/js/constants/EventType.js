angular.module('realm')
    .constant('EventType', {
        GO_TO_SCENE: 'GO_TO_SCENE',
        CHANGE_ATTRIBUTE: 'CHANGE_ATTRIBUTE',
        ADD_ITEM: 'ADD_ITEM',
        REMOVE_ITEM: 'REMOVE_ITEM',
        USE_ITEM: 'USE_ITEM',
        GAME_OVER: 'GAME_OVER',
        VICTORY: 'VICTORY',
        SAVE_GAME: 'SAVE_GAME'
    });