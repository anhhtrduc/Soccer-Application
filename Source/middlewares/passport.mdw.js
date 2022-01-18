const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            let user = await User.findOne(
                { username: username },
                (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect username.',
                        });
                    }
                    const rs = bcrypt.compareSync(password, user.password);
                    if (!rs) {
                        return done(null, false, {
                            message: 'Incorrect password.',
                        });
                    }
                    return done(null, user);
                }
            );
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user, done) => {
        try {
            const user = await User.findOne({ username: user.username });
        } catch (err) {
            done(Error('error'), null);
        }
    });
    app.use(passport.initialize());
    app.use(passport.session());
};
