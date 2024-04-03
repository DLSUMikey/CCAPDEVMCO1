const mongoose = require("mongoose")

const storeSchema = new mongoose.Schema({
    itemName: {
        type: Array,
        required: true,
        default: []
    },
    itemDesc: {
        type: Array,
        required: true,
        default: []
    },
    itemPrice: {
        type: Array,
        required: true,
        default: []
    },
    itemCount: {
        type: Array,
        required: true,
        default: []
    },
    itemIMG: {
        type: Array,
        required: true,
        default: []
    },
    itemRarity: {
        type: Array,
        required: true,
        default: []
    },
    itemIndex: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = mongoose.model("stores", storeSchema)