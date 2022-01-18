const express = require('express');
const Result = require('../models/Result');
const User = require('../models/User');
const League = require('../models/League');
const bcrypt = require('bcryptjs');
const router = express.Router();
const restrict = require('../middlewares/auth.mdw');

router.get('/history', restrict, async (req, res) => {
    const Leagues = await League.find({}).lean();
    res.render('vwLeague/leagueHistory', { Leagues });
});

router.get('/history/:byID', restrict, async (req, res) => {
    res.render('vwLeague/matchHistory');
});

router.post('/history/:byID', restrict, async (req, res) => {
    const {
        team_1,
        video,
        goal_1,
        yc_1,
        rc_1,
        offside_1,
        corner_1,
        foul_1,
        attemp_1,
        score_1,
        team_2,
        goal_2,
        yc_2,
        rc_2,
        offside_2,
        corner_2,
        foul_2,
        attemp_2,
        score_2,
    } = req.body;
    const id = req.params.byID;
    const Leagues = await League.findOne({ _id: id }).lean();
    const resultID = Leagues._id;
    const result = new Result({
        league: resultID,
        video: video,
        team1: {
            name: team_1,
            goal: goal_1,
            yellowcard: yc_1,
            redcard: rc_1,
            offside: offside_1,
            corner: corner_1,
            foul: foul_1,
            attemp: attemp_1,
            score: score_1,
        },
        team2: {
            name: team_2,
            goal: goal_2,
            yellowcard: yc_2,
            redcard: rc_2,
            offside: offside_2,
            corner: corner_2,
            foul: foul_2,
            attemp: attemp_2,
            score: score_1,
        },
    });
    await result.save();
    const newResult = await Result.findOne({ _id: result._id }).lean();
    res.render('vwLeague/matchHistory2', {
        newResult,
    });
});

router.post('/history/confirm/:byID', restrict, async (req, res) => {
    const {
        player_1,
        player_2,
        player_3,
        rc_1,
        player2_1,
        player2_2,
        player2_3,
        rc_2,
    } = req.body;
    console.log(player_2);
    const resultID = req.params.byID;
    const result = await Result.findOne({ _id: resultID });
    const finalResult = await Result.findOneAndUpdate(
        { _id: resultID },
        {
            team1: {
                name: result.team1.name,
                goal: result.team1.goal,
                yellowcard: result.team1.yellowcard,
                redcard: result.team1.redcard,
                offside: result.team1.offside,
                corner: result.team1.corner,
                foul: result.team1.foul,
                attemp: result.team1.attemp,
                score: result.team1.score,
                nameofgoal: [player_1, player_2, player_3],
                nameofrcard: rc_1,
            },
            team2: {
                name: result.team2.name,
                goal: result.team2.goal,
                yellowcard: result.team2.yellowcard,
                redcard: result.team2.redcard,
                offside: result.team2.offside,
                corner: result.team2.corner,
                foul: result.team2.foul,
                attemp: result.team2.attemp,
                score: result.team2.score,
                nameofgoal: [player2_1, player2_2, player2_3],
                nameofrcard: rc_2,
            },
        },
        { new: true }
    );
    const user1 = await User.findOne({ fullname: result.team1.name });
    const user2 = await User.findOne({ fullname: result.team2.name });
    res.render('vwLeague/matchHistory3', {
        noti: 'Thêm lịch sử đấu thành công',
    });
});

router.get('/clubAccount', restrict, async (req, res) => {
    res.render('vwAdmin/clubRegister');
});
router.post('/clubAccount', restrict, async (req, res) => {
    const {
        username,
        avatar,
        email,
        password,
        fullname,
        phone,
        stadium,
        manager,
        president,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        avatar,
        fullname,
        email,
        phone,
        password: hashedPassword,
        stadium,
        manager,
        president,
        role: 1,
    });
    await user.save();
    res.render('vwAdmin/clubRegister', { noti: 'Thêm câu lạc bộ thành công' });
});

router.get('/score', restrict, async (req, res) => {
    const Leagues = await League.find({}).lean();
    res.render('vwAdmin/scoreLeague', { Leagues });
});

router.get('/score/:byID', restrict, async (req, res) => {
    const id = req.params.byID;
    const Leagues = await League.findOne({ _id: id }).lean();
    const users = [];
    for (const item of Leagues.list) {
        const user = await User.findOne({ _id: item.id }).lean();
        user.score = item.score;
        users.push(user);
    }
    res.render('vwAdmin/score', { users });
});

router.post('/score/:byID', restrict, async (req, res) => {
    const id = req.params.byID;
    const score = req.body;
    // const user = await User.findOne({ _id: id }).lean();
    const Leagues = await League.findOne({ _id: id }).lean();
    for (const item of Leagues.list) {
        const user = await User.findOne({ _id: item.id }).lean();
        const L = await League.updateOne(
            {},
            {
                $addToSet: {
                    list: { id: item.id, score: score[user.fullname] },
                },
            },
            { new: true }
        );
    }
    for (const item of Leagues.list) {
        const remove = await League.updateOne(
            {},
            {
                $pull: {
                    list: { id: item.id, score: 0 },
                },
            },
            { safe: true }
        );
    }
});

module.exports = router;
