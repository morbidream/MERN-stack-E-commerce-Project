const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const chatbotController = require("../controllers/chatbot");

router.get("/", chatbotController.fetchChatbots);
router.get("/fetch-chatbot/:chatbotId", chatbotController.fetchChatbot);
router.get("/fetch-chatbot-byprod/:chatbotId", chatbotController.fetchChatbotByproduct);
router.post("/add-chatbot", chatbotController.addChatbot);
router.post("/edit-chatbot", chatbotController.editChatbot);
router.delete("/delete-chatbot", chatbotController.deleteChatbot);

module.exports = router;
 