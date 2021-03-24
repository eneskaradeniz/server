const User = require('../models/UserModel');

const Error = require('./ErrorController');

const InstantListeners = require('./InstantListenersController');
const SpotifyController = require('./SpotifyController');

class HomeController {

    async home(req, res) {
        try {
            const logged_id = req._id;
            const logged_user = await User.findById(logged_id).select('spotify_fav_artists').lean();
  
            const { _trend_artist, _all_tracks, _all_podcasts } = InstantListeners.getHome();

            const promises = await Promise.all([
                SpotifyController.getArtist(_trend_artist.id),
                SpotifyController.getTracksWithCount(Object.keys(_all_tracks), _all_tracks),
                SpotifyController.getPodcastsWithCount(Object.keys(_all_podcasts), _all_podcasts),
            ]);

            var trend_artist = {
                artist: promises[0],
                tracks: []
            };

            var recommended_tracks = [];
            var all_tracks = promises[1];
            var all_podcasts = promises[2];

            tracks.forEach((track) => {
                if(track.artist === trend_artist.artist.id) trend_artist.tracks.push(track);
                if(logged_user.spotify_fav_artists.includes(track.artist)) recommended_tracks.push(track);
            });

            trend_artist.tracks.sort((a,b) => b.count - a.count);
            trend_artist.tracks.slice(9);

            return res.status(200).json({
                success: true,
                trend_artist,
                recommended_tracks,
                all_tracks,
                all_podcasts
            });

        } catch(err) {
            console.log(err);
            Error({
                file: 'HomeController.js',
                method: 'home',
                title: err.toString(),
                info: err,
                type: 'critical',
            });

            return res.status(400).json({
                success: false
            });
        }
    }

    async live_count(req, res) {
        try {
            let count = InstantListeners.getTotalCount() || 0;

            return res.status(200).json({
                success: true,
                count: count
            });

        } catch(err) {
            Error({
                file: 'HomeController.js',
                method: 'live_count',
                title: err.toString(),
                info: err,
                type: 'critical',
            });

            return res.status(400).json({
                success: false
            });
        }
    }
}

module.exports = new HomeController();