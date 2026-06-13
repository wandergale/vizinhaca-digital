const NotificationsService = require("../services/notifications");

class NotificationsController {
    static async sendNotification(req, res, next) {
        const { userId, title, message } = req.body;
        try {
            const notification = await NotificationsService.sendNotification(userId, title, message);
            return res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    static async listNotifications(req, res, next) {
        const userId = req.user.id;
        try {
            const notifications = await NotificationsService.listNotifications(userId);
            return res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    static async listAllNotifications(req, res, next) {
        try {
            const notifications = await NotificationsService.listAllNotifications();
            return res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    static async markAsRead(req, res, next) {
        const notificationId = req.params.id;
        try {
            const notification = await NotificationsService.markAsRead(notificationId);
            return res.json(notification);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NotificationsController;