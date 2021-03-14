const mongoose = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = mongoose.Schema({

    current_play: {
        track: { type: String, ref: 'Track', default: null },
        artist: { type: String, ref: 'Artist', default: null },

        is_playing: { type: Boolean, default: false },
        timestamp: { type: Number, default: null },
    },

    fcm_token: {
        token: { type: String },
        platform: { type: String },
        created_at: { type: Number },
    },

    spotify_id: {
        type: String,
        unique: true,
        required: true,
    },
    spotify_refresh_token: {
        type: String,
        required: true,
    },

    verified: {
        type: Boolean,
        required: true,
        default: false
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: isEmail,
    },

    display_name: {
        type: String,
        required: true
    },
    avatars: [{type: String}],
    birthday: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
        default: null
    },
    gender: {
        type : String,
        enum : ['male','female'],
        required: true,
    },
    city: {
        type: String,
        default: null
    },

    social_accounts: {
        instagram: { type: String, default: null },
        facebook: { type: String, default: null },
        twitter: { type: String, default: null },
        spotify: { type: String, default: null },
    },

    last_tracks: [{ type: String, ref: 'Track' }],
    fav_tracks: [{ type: String, ref: 'Track' }],
    fav_artists: [{ type: String, ref: 'Artist' }],

    spotify_fav_tracks: [{ type: String, ref: 'Track' }],
    spotify_fav_artists: [{ type: String, ref: 'Artist' }],

    filtering: {
        artist: { type: Boolean, default: false },
        min_age: { type: Number, default: 18 },
        max_age: { type: Number, default: 100 },
        gender_preference: { type : String, enum: ['all','male','female'], default: 'all' },
    },

    permissions: {
        show_live: { type: Boolean, default: true },
        show_explore: { type: Boolean, default: true },
        show_age: { type: Boolean, default: true },
        show_action: { type: Boolean, default: true },
        show_last_tracks: { type: Boolean, default: true },
        show_online_status: { type: Boolean, default: true },
    },

    notifications: {
        renew_likes: { type: Boolean, default: true },
        new_matches: { type: Boolean, default: true },
        likes: { type: Boolean, default: true },
        mega_likes: { type: Boolean, default: true },

        text_messages: { type: Boolean, default: true },
        like_messages: { type: Boolean, default: true },
        music_messages: { type: Boolean, default: true },
        voice_messages: { type: Boolean, default: true },
        gif_messages: { type: Boolean, default: true },

        team: { type: Boolean, default: true },
    },

    counts: {
        like: { type: Number, default: 30 },
        mega_like: { type: Number, default: 1 },
        ad: { type: Number, default: 5 },
    },

    product: {
        type : String,
        enum : ['free','premium_lite','premium_plus'],
        default: 'free',
        required: true,
    },

    language: {
        type: String,
        enum : ['tr','en'],
        default: 'tr',
        required: true
    },

    registration_date: {
        type: Number,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);