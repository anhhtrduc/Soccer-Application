const express = require('express');
const User = require('../models/User');
const League = require('../models/League');
const Result = require('../models/Result');
const router = express.Router();
const restrict = require('../middlewares/auth.mdw');

router.get('/leagues', async (req, res) => {
    const Leagues = await League.find({}).lean();
    res.render('vwStatistic/leaguesStatistic', { Leagues });
});

router.get('/leagueStatistic/:byName', async (req, res) => {
    const name = req.params.byName;
    const users = [];
    const Leagues = await League.findOne({ name: name });
    for (const item of Leagues.list) {
        const user = await User.findOne({ _id: item.id }).lean();
        user.score = item.score;
        users.push(user);
    }
    res.render('vwStatistic/statistic', {
        users,
    });
});

module.exports = router;
