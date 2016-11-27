var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        title: {
            pt_br: {
                type: String,
                required: true
            },
            en_us: {
                type: String
            }
        },
        description: {
            pt_br: {
                type: String
            },
            en_us: {
                type: String
            }
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
                pt_br: {
                    type: String,
                    required: true
                },
                en_us: {
                    type: String
                }
            },
            description: {
                pt_br: {
                    type: String,
                    required: true
                },
                en_us: {
                    type: String
                }
            },
            events: [{
                event_id: {
                    type: String
                },
                type: {
                    type: String
                },
                text: {
                    pt_br: {
                        type: String
                    },
                    en_us: {
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
                    type: String //Id do item afetado pelo evento
                },
                quantity: {
                    type: Number //Numer oque afetará a quantidade do item
                }
            }]
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
                        pt_br: {
                            type: String
                        },
                        en_us: {
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
            }]
        }]
    });

    return mongoose.model('Story', schema);
};