const mongoose = require('mongoose');
const connection = require('@evnotify/utils').db.getDB();

const options = {
    id: false,
    collection: 'notifications',
    timestamps: true,
    toObject: {
        getters: true
    },
    versionKey: false
};

const NotificationsSchema = new mongoose.Schema({
    akey: {
        type: String,
        required: true,
        unique: true
    },
    mail: {
        type: String,
        required: false
    },
    telegram: {
        type: Number,
        required: false
    },
    push: {
        type: Boolean,
        required: false
    },
    sms: {
        type: Number,
        required: false
    }
}, options);

module.exports = connection.model('Settings', NotificationsSchema);