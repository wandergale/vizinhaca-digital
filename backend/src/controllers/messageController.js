const MessageServices = require("../services/messageServices");

class MessageController {
    static async sendMessage(req, res, next) {
        const { actionId, subject, content, link, attachment } = req.body;
        try {
            const message = await MessageServices.sendMessage(actionId, subject, content, link, attachment);
            res.status(201).json(message);
        } catch (error) {
            next(error);
        }
    }

    static async listMessages(req, res, next) {
        try {
            const messages = await MessageServices.listMessages();
            res.json(messages);
        } catch (error) {
            next(error);
        }
    }

    static async getMessage(req, res, next) {
        const { id } = req.params;
        try {
            const message = await MessageServices.getMessage(id);
            res.json(message);
        } catch (error) {
            next(error);
        }
    }

    static async getMessagesByAction(req, res, next) {
        const { actionId } = req.params;
        try {
            const messages = await MessageServices.getMessagesByAction(actionId);
            res.json(messages);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MessageController;