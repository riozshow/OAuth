const express = require('express');
const router = express.Router();

const requireUser = (req, res, next) => {
  req.user ? next() : res.redirect('/user/no-permission');
};

router.get('/logged', (req, res) => {
  const { displayName, photos } = req.user;
  res.render('logged', { displayName, image: photos[0].value });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', requireUser, (req, res) => {
  res.render('logged');
});

router.get('/profile/settings', requireUser, (req, res) => {
  res.render('logged');
});

module.exports = router;
