const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('vwAccount/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user === null) {
        return res.render('vwAccount/login', {
            // layout: false,
            error: 'Invalid username or password.',
        });
    }
    const rs = bcrypt.compareSync(password, user.password);
    if (rs === false) {
        return res.render('vwAccount/login', {
            // layout: false,
            error: 'Invalid username or password.',
        });
    }
    delete user.password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    const url = req.query.retUrl || '/';
    res.redirect(url);
});

router.get('/register', (req, res) => {
    res.render('vwAccount/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, fullname, phone } = req.body;
    if (!res.locals.fail) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                username,
                fullname,
                email,
                phone,
                password: hashedPassword,
                role: 0,
            });
            await user.save();
            res.redirect('/account/login');
        } catch (err) {
            console.log(err);
            res.render('vwAccount/register', {
                username,
                fullname,
                email,
                phone,
            });
        }
    } else {
        res.render('vwAccount/register', {
            username,
            fullname,
            email,
            phone,
        });
    }
});

const restrict = require('../middlewares/auth.mdw');
router.get('/profile', restrict, (req, res) => {
    // console.log(req.session.authUser);
    res.render('vwAccount/profile');
});

router.get('/logout', restrict, (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
    // res.redirect('/');
});

module.exports = router;
