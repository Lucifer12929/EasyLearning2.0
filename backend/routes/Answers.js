const pkg= require("express");
const AnswerCtrl=require("../controllers/Answers") ;
const auth= require("../middleware/auth");
const Express = pkg; 
const router = Express.Router();

router.patch('/post/:id', AnswerCtrl.postAnswer)
router.patch('/delete/:id', auth,AnswerCtrl.deleteAnswer)

module.exports = router