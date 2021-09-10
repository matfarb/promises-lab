const express = require('express');
const router = express.Router();
const performersCtrl = require('../controllers/performers');

router.get('/performers', performersCtrl.index);
router.get('/performers/new', performersCtrl.new);
router.get('/performers/:id', performersCtrl.show);
router.post('/performers', performersCtrl.create);
router.post('/movies/:id/performers', performersCtrl.addToCast);

module.exports = router;