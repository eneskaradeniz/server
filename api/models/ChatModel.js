const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    lower_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    higher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    last_message: {
        author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        type: { type: String, enum: ['text','track','artist','podcast','album','gif','voice','like'] },
        created_at: { type: Number }
    },

    lower_read: {
        type: Boolean,
        default: false
    },
    higher_read: {
        type: Boolean,
        default: false
    },

    is_mega_like: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Number,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', ChatSchema);