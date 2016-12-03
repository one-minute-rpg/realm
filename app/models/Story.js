var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        title: {
            type: String
        },
        description: {
            type: String
        },
        cover: {
            type: String
        },
        hero: {
            attributes: {
                health: {
                    current: {
                        type: Number
                    },
                    max: {
                        type: Number
                    }
                },
                strength: {
                    current: {
                        type: Number
                    },
                    max: {
                        type: Number
                    }
                },
                agility: {
                    current: {
                        type: Number
                    },
                    max: {
                        type: Number
                    }
                },
                intelligence: {
                    current: {
                        type: Number
                    },
                    max: {
                        type: Number
                    }
                }
            },
            items: [
                {
                    item_id: {
                        type: String
                    },
                    quantity:{
                        type: Number
                    }
                }
            ]
        },
        items: [{
            item_id: {
                type: String
            },
            type: {
                type: String
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            events: [{
                event_id: {
                    type: String
                },
                type: {
                    type: String
                },
                text: {
                    type: String
                },
                attribute: {
                    type: String
                },
                value: {
                    type: Number
                },
                item_id: {
                    type: String //Id do item afetado pelo evento
                },
                quantity: {
                    type: Number //Numer oque afetará a quantidade do item
                },
                scene_id: {
                    type: String
                }
            }]
        }],
        scenes: [{
            scene_id: {
                type: String
            },
            type: {
                type: String
            },
            title: {
                type: String
            },
            text: {
                type: String
            },
            actions: [{
                action_id:{
                    type: String
                },
                text: {
                    type: String
                },
                require_items: [{
                    item_id: {
                        type: String
                    }, //Array contento os ids dos itens
                    quantity: {
                        type: Number
                    }
                }],
                require_attribute_value: {
                    health: {
                        type: Number
                    },
                    strength: {
                        type: Number
                    },
                    agility: {
                        type: Number
                    },
                    intelligence: {
                        type: Number
                    }
                },
                events: [{
                    event_id:{
                        type: String
                    },
                    type: {
                        type: String
                    },
                    text: {
                        type: String
                    },
                    attribute: {
                        type: String
                    },
                    value: {
                        type: Number
                    },
                    item_id: {
                        type: String //Id do item afetado pelo evento
                    },
                    quantity: {
                        type: Number //Numer oque afetará a quantidade do item
                    },
                    scene_id: {
                        type: String //Id da cena a ser encaminhado
                    }
                }]
            }]
        }]
    });

    return mongoose.model('Story', schema);
};