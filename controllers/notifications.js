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
    const [settings, sync, notifications] = await retrieveData(req);
    const channel = req.baseUrl.replace('/') || 'broadcast';
    const type = req.body.type;
    const socToUse = sync.soc_display || sync.soc_bms;

    if (type === 'soc_reached') {
        if (settings.soc_threshold < socToUse) return;
    }

    const dataObj = {
        akey: req.params.akey,
        channel,
        type,
        settings,
        sync,
        notifications
    };

    // TODO: implement the notifications
    if (channel === 'mail' || channel === 'broadcast') mailController.sendMessage(dataObj);
    if (channel === 'telegram' || channel === 'broadcast') telegramController.sendMessage(dataObj);
    if (channel === 'push' || channel === 'broadcast') pushController.sendMessage(dataObj);
    if (channel === 'sms' || channel === 'broadcast') smsController.sendMessage(dataObj);

    res.sendStatus(200);
});

module.exports = {
    getNotificationsQuota,
    sendNotification
};