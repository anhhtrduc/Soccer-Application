const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SoccerApplication');
const resultSchema = new mongoose.Schema(
    {
        league: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'League',
            required: true,
            // unique: true,
        },
        video: {
            type: String,
        },
        team1: {
            name: {
                type: String,
                ref: 'Account',
            },
            goal: {
                type: Number,
            },
            nameofgoal: [
                {
                    type: String,
                },
            ],
            yellowcard: {
                type: Number,
            },
            redcard: {
                type: Number,
            },
            nameofrcard: [
                {
                    type: String,
                },
            ],
            offside: {
                type: Number,
            },
            corner: {
                type: Number,
            },
            foul: {
                type: Number,
            },
            attemp: {
                type: Number,
            },
            score: {
                type: Number,
            },
        },
        team2: {
            name: {
                type: String,
                ref: 'Account',
            },
            goal: {
                type: Number,
            },
            nameofgoal: [
                {
                    type: String,
                },
            ],
            yellowcard: {
                type: Number,
            },
            redcard: {
                type: Number,
            },
            nameofrcard: [
                {
                    type: String,
                },
            ],
            offside: {
                type: Number,
            },
            corner: {
                type: Number,
            },
            foul: {
                type: Number,
            },
            attemp: {
                type: Number,
            },
            score: {
                type: Number,
            },
        },
    },
    {
        collection: 'Result',
    }
);
module.exports = mongoose.model('Result', resultSchema);
