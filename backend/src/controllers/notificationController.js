const NotificationService = require("../services/notificationService");

class NotificationsController {
    static async sendNotification(req, res, next) {
        const { userId, title, message } = req.body;
        try {
            const notification = await NotificationService.sendNotification(userId, title, message);
            return res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    static async getNotificationById(req, res, next) {
        const notificationId = req.params.id;
        try {
            const notification = await NotificationService.getNotificationById(notificationId);
            return res.json(notification);
        } catch (error) {
            next(error);
        }
    }

    static async listNotifications(req, res, next) {
        const userId = req.user.id;
        try {
            const notifications = await NotificationService.listNotifications(userId);
            return res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    static async listAllNotifications(req, res, next) {
        try {
            const notifications = await NotificationService.listAllNotifications();
            return res.json(notifications);
        } catch (error) {
            next(error);
        }
    }

    static async markAsRead(req, res, next) {
        const notificationId = req.params.id;
        try {
            const notification = await NotificationService.markAsRead(notificationId);
            return res.json(notification);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NotificationsController;