angular.module('realm')
    .factory('StoryForEditService',['$q', function($q) {
        var service = {};

var story = 
{
    "_id": 1,
    "title": {
        "pt_BR": "É Verão o ano Todo",
        "en_US": "Summer All Year"
    },
    "character": {
        "character_id": 1,
        "itens": [
            {
                "item_id": "...",
                "quantity": 0
            }
        ],
        "attributes": {
            "health": {
                "max": 10,
                "current": 10
            },
            "strength": {
                "max": 10,
                "current": 6
            },
            "agility": {
                "max": 10,
                "current": 7
            },
            "intelligence": {
                "max": 10,
                "current": 7
            }
        }
    },
    "itens": [
        {
            "item_id": 1,
            "type": "QUEST",
            "name": {
                "pt_BR": "Comida pra Caralho",
                "en_US": "Food as Hell"
            },
            "text": {
                "pt_BR": "Saí de casa comi pra caralho!",
                "en_US": "Eaten too much!"
            },
            "events": []
        },
        {
            "item_id": 2,
            "type": "INVENTORY",
            "name": {
                "pt_BR": "Whey",
                "en_US": "Whey"
            },
            "text": {
                "pt_BR": "Proteina pura caraio!",
                "en_US": "Pure protein!"
            },
            "events": [
                {
                    "event_type": "CHANGE_ATTRIBUTE",
                    "text": {
                        "pt_BR": "...",
                        "en_US": "..."
                    },
                    "attribute": "health",
                    "value": 5 //positive to add, negative to remove.
                },
                {
                    "event_type": "REMOVE_ITEM", // or ADD_ITEM
                    "text": {
                        "pt_BR": "...",
                        "en_US": "..."
                    },
                    "item_id": 1,
                    "quantity": 1 // zero for all itens
                }
            ]
        }
    ],
    "creatures": [
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Bóribiuder",
                "en_US": "BodyBuilder"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Mutante",
                "en_US": "Mutant"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Bóribiuder",
                "en_US": "BodyBuilder"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Mutante",
                "en_US": "Mutant"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Bóribiuder",
                "en_US": "BodyBuilder"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Mutante",
                "en_US": "Mutant"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Bóribiuder",
                "en_US": "BodyBuilder"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        },
        {
            "creature_id": 1,
            "name": {
                "pt_BR": "Mutante",
                "en_US": "Mutant"
            },
            "level": 13,
            "attributes": {
                "health": {
                    "current": 10
                },
                "strength": {
                    "current": 6
                },
                "agility": {
                    "current": 7
                },
                "intelligence": {
                    "current": 7
                }
            }
        }
    ],
    "scenes": [
        {
            "scene_id": 1,
            "type": "DECISION",
            "title": {
                "pt_BR": "Não vai dar não",
                "en_US": "Not gonna be"
            },
            "text": {
                "pt_BR": "Que não vai dar essa porra!",
                "en_US": "Not gonna be my ass!"
            },
            "actions": [
                {
                    "action_id": 1,
                    "text": {
                        "pt_BR": "...",
                        "en_US": "..."
                    },
                    "require_item_ids": [],
                    "require_attribute_value": {
                        "intelligence": 4,
                        "agility": 2
                    },
                    "events": [
                        {
                            "event_type": "GO_TO_SCENE",
                            "text": {
                                "pt_BR": "...",
                                "en_US": "..."
                            },
                            "scene_id": 2
                        }
                    ]
                }
            ]
        },
        {
            "scene_id": 4,
            "type": "CHALLENGE",
            "title": {
                "pt_BR": "Mutante",
                "en_US": "Mutant"
            },
            "text": {
                "pt_BR": "Vive na academia e é 13 memo porra!",
                "en_US": "Live in the gym and is 13, yeah!"
            },
            "challenge": {
                "creature_id": 14,
                "puzzle": {}
            },
            "on_win": [], //events
            "on_loose": [] //events
    }]
};

        service.edit = edit;

        function edit(id){
            return $q.when(createStoryProjection(story));
        }

        function createStoryProjection(story){
            debugger;

            var projection = {
                _id: '',
                title: {},
                description: {},
                cover: '',
                creatures: [],
                itens: [],
                scenes: []
            };

            projection._id = story._id;
            projection.cover = story.cover;
            projection.title = fillLanguages(story.title);
            projection.description = fillLanguages(story.description);

            projection.scenes = createScenesProjection(story.scenes);
            projection.itens = createItensProjection(story.itens);
            projection.creatures = createCreaturesProjection(story.creatures);

            return projection;
        }

        function createScenesProjection(scenes){
            var projections = [];

            angular.forEach(scenes, function(scene, key) {
                debugger;
                var projection = {
                    scene_id: '',
                    type: '',
                    title: {},
                    text: {}
                };
                projection.scene_id = scene.scene_id;
                projection.type = scene.type;
                projection.title = fillLanguages(scene.title);
                projection.text = fillLanguages(scene.text);

                projections.push(projection);
            });

            return projections;
        }

        function createItensProjection(itens){
            var projections = [];

            angular.forEach(itens, function(item, key){
                var projection = {
                    item_id: '',
                    type: '',
                    name: {},
                    text: {}
                };

                projection.item_id = item.item_id;
                projection.type = item.type;
                projection.name = fillLanguages(item.name);
                projection.text = fillLanguages(item.text);

                projections.push(projection);
            });

            return projections;
        }

        function createCreaturesProjection(creatures){
            var projections = [];

            angular.forEach(creatures, function(creature, key){
                var projection = {
                    creature_id: '',
                    name: {},
                    level: ''
                };

                projection.creature_id = creature.creature_id;
                projection.name = fillLanguages(creature.name);
                projection.level = creature.level;

                projections.push(projection);
            });

            return projections;
        }

        function fillLanguages(obj){
            var newObject = {};

            for(prop in obj){
                newObject[prop] = obj[prop];
            }
    
            return newObject;
        }

        return service;

    }]);