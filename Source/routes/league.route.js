const express = require('express');
const User = require('../models/User');
const League = require('../models/League');
const router = express.Router();
const restrict = require('../middlewares/auth.mdw');

router.get('/create', restrict, async (req, res) => {
    const Leagues = await League.find({}).lean();
    res.render('vwLeague/leagues', { Leagues });
});

router.post('/create', restrict, async (req, res) => {
    const { name, location, avatar, date, NoC } = req.body;
    const league = new League({
        name,
        avatar,
        location,
        date,
        NoC,
    });
    await league.save();
    res.render('vwLeague/leagues', {
        noti: 'Create League Successful',
    });
});

router.get('/register', restrict, async (req, res) => {
    const Leagues = await League.find({}).lean();
    res.render('vwLeague/leaguesRegister', { Leagues });
});

router.get('/register/:byName', restrict, async (req, res) => {
    const Leagues = await League.findOne({ name: req.params.byName }).lean();
    res.render('vwLeague/leagueRegisterConfirm', { Leagues });
});

router.post('/register/:byName', restrict, async (req, res) => {
    // const Leagues = await League.findOne({ name: req.params.by }).lean();
    // if (typeof Leagues.list === 'undefined') {

    // } else {
    //     for (const item of Leagues.list) {
    //         if (item.id === req.session.authUser.id) {
    //             const err = 'Câu lạc bộ này đã đăng kí rồi';
    //             console.log(Leagues);
    //             res.render('vwLeague/leagueRegisterConfirm', {
    //                 Leagues,
    //                 err,
    //             });
    //         }
    //     }
    // }
    const Leagues = await League.findOneAndUpdate(
        { name: req.params.byName },
        {
            $addToSet: {
                list: {
                    id: req.session.authUser,
                    score: 0,
                },
            },
        }
    ).lean();
    res.render('vwLeague/leagueRegisterConfirm', {
        Leagues,
        noti: 'Xác nhận tham gia thành công',
    });
});

router.get('/notification', restrict, (req, res, next) => {
    res.render('vwLeague/Notifications');
});
module.exports = router;
