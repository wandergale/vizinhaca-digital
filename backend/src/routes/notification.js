const { router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/validateMiddleware');
const NotificationsController = require('../controllers/notifications');

const router = router();

// GET /notifications - listar notificações do usuário autenticado
router.get('/', [authMiddleware, roleMiddleware('LEADER')], NotificationsController.listAllNotifications);
router.get('/my', authMiddleware, NotificationsController.listNotifications);

// POST /notifications - enviar notificação para um usuário específico (pode ser usado por admin ou líderes)
router.post('/', [authMiddleware, roleMiddleware('LEADER')], NotificationsController.sendNotification);
router.post('/:id/read', authMiddleware, NotificationsController.markAsRead);

module.exports = router;