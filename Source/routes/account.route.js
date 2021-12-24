const express = require('express');
const AccountModel = require('../models/account');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('vwAccount/login');
});
router.get('/register', (req, res) => {
    res.render('vwAccount/register');
});
router.get('/profile', (req, res) => {
    res.render('vwAccount/profile');
});

// router.post('/register', (req, res, next) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     AccountModel.findOne({
//         username: username,
//     })
//         .then((data) => {
//             if (data) {
//                 res.json('user da ton tai');
//             } else {
//                 return AccountModel.create({
//                     username: username,
//                     password: password,
//                 });
//             }
//         })
//         .then((data) => {
//             res.json('Tao tai khoan thanh cong');
//         })
//         .catch((err) => {
//             res.status(500).json('Tao tai khoan that bai');
//         });
// });
// router.post('/login', (req, res, next) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     AccountModel.findOne({
//         username: username,
//         password: password,
//     })
//         .then((data) => {
//             if (data) {
//                 res.json('dang nhap thanh cong');
//             } else {
//                 res.status(300).json('dang nhap that bai');
//             }
//         })
//         .catch((err) => {
//             res.status(500).json('co loi ben server');
//         });
// });

module.exports = router;
