const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SoccerApplication');
const leagueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
        },
        date: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        list: [
            {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Account',
                    unique: true,
                },
                score: {
                    type: Number,
                },
                _id: false,
            },
        ],
    },
    {
        collection: 'League',
    }
);

module.exports = mongoose.model('League', leagueSchema);
