const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SoccerApplication');
const Schema = mongoose.Schema;
const AccountSchema = new Schema(
    {
        username: String,
        password: String,
    },
    {
        collection: 'Account',
    }
);
const AccountModel = mongoose.model('Account', AccountSchema);

module.exports = AccountModel;
