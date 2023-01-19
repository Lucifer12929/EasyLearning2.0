const express = require("express");
const auth = require('../middleware/auth')
const QuestionCtrl = require('../controllers/Questions')
const router = require('express').Router()

router.post('/Ask', auth, QuestionCtrl.AskQuestion)
router.get('/get', QuestionCtrl.getAllQuestions)
router.delete('/delete/:id', auth, QuestionCtrl.deleteQuestion);
router.patch('/vote/:id', auth, QuestionCtrl.voteQuestion);

module.exports = router