const axios = require('axios');
const asyncHandler = require('@evnotify/utils').asyncHandler;
const mailController = require('./mail');

const retrieveData = async(req) => {
    return Promise.all([
        axios.get(`${process.env.SETTINGS_SERVICE}/${req.params.akey}`, {
            headers: {
                'Authorization': req.headers.authorization,
                'Authentication': req.headers.authentication,
                'AKey': req.params.akey
            }
        }).then((response) => {
            return response.data;
        }),
        axios.get(`${process.env.SYNC_SERVICE}/${akey}`, {
            headers: {
                'Authorization': req.headers.authorization,
                'Authentication': req.headers.authentication,
                'AKey': req.params.akey
            }
        }).then((response) => {
            return response.data;
        })
    ]);
};


const getNotificationsQuota = asyncHandler(async (req, res, next) => {

});

const sendNotification = asyncHandler(async (req, res, next) =>  {
    const [settings, sync] = await retrieveData(req);
    const notificationChannel = req.baseUrl.replace('/') || 'broadcast';
    const notificationType = req.body.type;

    // TODO: implement the notifications
    if (notificationChannel === 'mail' || notificationChannel === 'broadcast') mailController.sendMessage();
    if (notificationChannel === 'telegram' || notificationChannel === 'broadcast') telegramController.sendMessage();
    if (notificationChannel === 'push' || notificationChannel === 'broadcast') pushController.sendMessage();
    if (notificationChannel === 'sms' || notificationChannel === 'broadcast') smsController.sendMessage();

    res.sendStatus(200);
});

module.exports = {
    getNotificationsQuota,
    sendNotification
};