const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('@evnotify/middlewares').authenticationHandler;
const authorizationMiddleware = require('@evnotify/middlewares').authorizationHandler;
const notificationsController = require('../controllers/notifications');

router.get('/', authorizationMiddleware, authenticationMiddleware, notificationsController.getNotificationsQuota);

router.post('/', authorizationMiddleware, authenticationMiddleware, notificationsController.sendNotifications);
router.post('/mail', authorizationMiddleware, authenticationMiddleware, notificationsController.sendMailNotification);
router.post('/push', authorizationMiddleware, authenticationMiddleware, notificationsController.sendPushNotification);
router.post('/telegram', authorizationMiddleware, authenticationMiddleware, notificationsController.sendTelegramNotification);
router.post('/sms', authorizationMiddleware, authenticationMiddleware, notificationsController.sendSMSNotification);

module.exports = router;