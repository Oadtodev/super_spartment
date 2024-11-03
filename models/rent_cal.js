const mongoose = require('mongoose');

const rentCalSchema = new mongoose.Schema({
    room: {
        type: Number,
        required: true
    },
    price_room: {
        type: Number,
        required: true
    },
  
    fire_unitbefore: {
        type: Number,
        required: true
    },
    fire_unitafter: {
        type: Number,
        required: true
    },
    water_unitbefore: {
        type: Number,
        required: true
    },water_unitafter: {
        type: Number,
        required: true
    },
    price_per_unit_fire: {
        type: Number,
        required: true
    },
    price_per_unit_water: {
        type: Number,
        required: true
    },
    total_fire: {
        type: Number,
        required: true
    },
    total_water: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ren_cals', rentCalSchema);
