const { addMsg, getAllMessage } = require("../controllers/messageControllers");


const router = require("express").Router();

router.post("/addMsg", addMsg);
router.post("/getAllMessage", getAllMessage); 



module.exports = router