const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { MessageController } = require("../controllers");

const router = Router();

router.get("/", authMiddleware, MessageController.listMessages);
router.get("/:id", authMiddleware, MessageController.getMessage);
router.get("/action/:actionId", authMiddleware, MessageController.getMessagesByAction);

router.post("/", authMiddleware, MessageController.sendMessage);

module.exports = router;