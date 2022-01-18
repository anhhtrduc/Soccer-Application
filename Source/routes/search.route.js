const express = require('express');
const Result = require('../models/Result');
const League = require('../models/League');
const User = require('../models/User');
const router = express.Router();

router.get('/search', async (req, res) => {
    const search = req.query.search;
    const searchResult = await Result.find(
        {},
        {
            name: search,
        }
    );
    const searchArray = [];
    for (const item of searchResult) {
        const newsearchResult = await Result.findOne({
            _id: item._id,
        }).lean();
        searchArray.push(newsearchResult);
    }
    // console.log(searchArray);
    res.render('vwSearch/listResult', {
        searchArray,
    });
});
router.get('/search/:byName', async (req, res) => {
    const search = req.params.byName;
    const team1 = search.split(/[&]/)[0];
    const team2 = search.split(/[&]/)[1];
    const searchResult = await Result.find({
        name: team1,
        name: team2,
    });
    for (const item of searchResult) {
        if (item.team1.name === team1) {
            var newsearchResult = await Result.findOne({
                _id: item._id,
            }).lean();
            var league = await League.findOne({
                _id: newsearchResult.league,
            }).lean();
            var user1 = await User.findOne({
                fullname: newsearchResult.team1.name,
            }).lean();
            var user2 = await User.findOne({
                fullname: newsearchResult.team2.name,
            }).lean();
        }
        if (item.team1.name === team2) {
            const newsearchResult = await Result.findOne({
                _id: item._id,
            }).lean();
            const league = await League.findOne({
                _id: newsearchResult.league,
            }).lean();
            const user1 = await User.findOne({
                fullname: newsearchResult.team1.name,
            }).lean();
            const user2 = await User.findOne({
                fullname: newsearchResult.team2.name,
            }).lean();
        }
    }
    res.render('vwSearch/result', {
        newsearchResult,
        league,
        user1,
        user2,
    });
});
module.exports = router;
