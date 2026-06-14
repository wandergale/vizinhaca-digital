const prisma = require("../config/prisma");

class NotificationsService {
    static async sendNotification(userId, title, message) {
        // Lógica para enviar notificação para um usuário específico
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
            },
        });
        return notification;
    }

    static async getNotificationById(notificationId) {
        const notification = await prisma.notification.findUnique({
            where: { id: notificationId },
        });
        return notification;
    }

    static async listNotifications(userId) {
        // Lógica para listar notificações de um usuário específico
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return notifications;
    }

    static async listAllNotifications() {
        // Lógica para listar todas as notificações (pode ser usado para admin)
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return notifications;
    }

    static async markAsRead(notificationId) {
        // Lógica para marcar uma notificação como lida
        const notification = await prisma.notification.update({
            where: { id: notificationId },
            data: { read: true },
        });
        return notification;
    }
}

module.exports = NotificationsService;