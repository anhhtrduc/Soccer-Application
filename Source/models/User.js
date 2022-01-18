const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SoccerApplication');
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        avatar: {
            type: String,
        },
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            required: true,
        },
        stadium: {
            type: String,
        },
        manager: {
            type: String,
        },
        president: {
            type: String,
        },
    },
    {
        collection: 'Account',
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
// module.exports = mongoose.model('User', userSchema);
