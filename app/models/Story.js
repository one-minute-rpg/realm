var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        title: {
            pt_BR: {
                type: String,
                required: true
            },
            en_US: {
                type: String
            }
        },
        description: {
            type: String
        },
        cover: {
            type: String
        },
        character: {
            itens: {
                type: [mongoose.Schema.ObjectID] //Array com ids de itens
            },
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
            }
        },
        itens: [{
            item_id: {
                type: Number
            },
            type: {
                type: String
            },
            name: {
                type: String
            },
            text: {
                type: String
            },
            events: [{
                event_type: {
                    type: String
                },
                text: {
                    pt_BR: {
                        type: String
                    },
                    en_US: {
                        type: String
                    }
                },
                attribute: {
                    type: String
                },
                value: {
                    type: Number
                },
                item_id: {
                    type: mongoose.Schema.ObjectId //Id do item afetado pelo evento
                },
                quantity: {
                    type: Number //Numer oque afetará a quantidade do item
                }
            }]
        }],
        creatures: [{
            name: {
                type: String
            },
            level: {
                type: Number
            },
            attributes: {
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
            }
        }],
        scenes: [{
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
                text: {
                    type: String
                },
                require_item_ids: [{
                    type: [mongoose.Schema.ObjectId], //Array contento os ids dos itens
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
                    event_type: {
                        type: String
                    },
                    text: {
                        pt_BR: {
                            type: String
                        },
                        en_US: {
                            type: String
                        }
                    },
                    attribute: {
                        type: String
                    },
                    value: {
                        type: Number
                    },
                    item_id: {
                        type: mongoose.Schema.ObjectId //Id do item afetado pelo evento
                    },
                    quantity: {
                        type: Number //Numer oque afetará a quantidade do item
                    },
                    scene_id: {
                        type: mongoose.Schema.ObjectId //Id da cena a ser encaminhado
                    }
                }]
            }],
            challenge: {
                type: mongoose.Schema.ObjectId //Id da criatura do desafio
            },
            on_win: {
                type: mongoose.Schema.ObjectId //Id da cena a ser encaminhado após vencer o desafio
            },
            on_lose: {
                type: mongoose.Schema.ObjectId //Id da cena de game over
            }
        }]
    });

    return mongoose.model('Story', schema);
};