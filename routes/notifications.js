const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('@evnotify/middlewares').authenticationHandler;
const authorizationMiddleware = require('@evnotify/middlewares').authorizationHandler;
const notificationsController = require('../controllers/notifications');

router.get('/', authorizationMiddleware, authenticationMiddleware, notificationsController.getNotificationsQuota);

router.post('/', authorizationMiddleware, authenticationMiddleware, notificationsController.sendNotification);
router.post('/mail', authorizationMiddleware, authenticationMiddleware, notificationsController.sendNotification);
router.post('/push', authorizationMiddleware, authenticationMiddleware, notificationsController.sendNotification);
router.post('/telegram', authorizationMiddleware, authenticationMiddleware, notificationsController.sendNotification);
router.post('/sms', authorizationMiddleware, authenticationMiddleware, notificationsController.sendNotification);

module.exports = router;