// app/models/Story.js
// Model para história

var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
            title:{
                type: String,
                required: true
            },
            character: {
                itens: {
                    type: [mongoose.Schema.ObjectID],
                    ref: 'Item'
                },
                attributes: {
                    health: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    },
                    strength: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    },
                    agility: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    },
                    intelligence: {
                        current: {
                            type: Number,
                            required: true
                        },
                        max: {
                            type: Number,
                            required: true
                        }
                    }
                }
            },
            itens: [{
                type: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                text: {
                    type: String
                },
                events: [{
                    event_type: {
                        type: String,
                        required: true
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
                        type: mongoose.Schema.ObjectId
                    },
                    quantity: {
                        type: Number
                    }
                }]
            }],
            creatures: [{
                name:{
                    type: String,
                    required: true
                },
                level: {
                    type: Number,
                    required: true
                },
                attributes: {
                    health: {
                        type: Number,
                        required: true
                    },
                    strength: {
                        type: Number,
                        required: true
                    },
                    agility: {
                        type: Number,
                        required: true
                    },
                    intelligence: {
                        type: Number,
                        required: true
                    }
                }
            }],
            scenes: [{
                    type: {
                        type: String,
                        required: true
                    },
                    title:{
                        type: String,
                        required: true
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    actions: [{
                        text: {
                            type: String,
                            required: true
                        },
                        require_item_ids: [{
                            type: [mongoose.Schema.ObjectId], //array contento os ids dos itens
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
                                type: String,
                                required: true
                            },
                            text: {
                                pt_BR: {
                                    type: String
                                },
                                en_US: {
                                    type: String
                                }
                            },
                            scene_id: {
                                type: mongoose.Schema.ObjectId
                            }
                        }]
                    }],
                    challenge:{
                        type: mongoose.Schema.ObjectId
                    },
                    on_win: {},
                    on_lose: {}
                }]
        });

    return mongoose.model('Story', schema);
};