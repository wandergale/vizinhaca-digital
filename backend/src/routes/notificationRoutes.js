const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/validateMiddleware');
const NotificationsController = require('../controllers/notificationController');

const router = Router();

// GET /notifications - listar notificações do usuário autenticado
router.get('/', [authMiddleware, roleMiddleware('LEADER')], NotificationsController.listAllNotifications);
router.get('/my', authMiddleware, NotificationsController.listNotifications);
router.get('/:id', [authMiddleware, roleMiddleware('LEADER')], NotificationsController.getNotificationById);

// POST /notifications - enviar notificação para um usuário específico (pode ser usado por admin ou líderes)
router.post('/', [authMiddleware, roleMiddleware('LEADER')], NotificationsController.sendNotification);

// PUT /notifications/:id/read - marcar notificação como lida
router.put('/:id/read', authMiddleware, NotificationsController.markAsRead);

module.exports = router;