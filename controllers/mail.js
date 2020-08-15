const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

const sendMail = (dataObj) => {
    const receiver = dataObj.notifications.mail;
    const templateId = getTemplateID(dataObj.type, dataObj.settings.language);

    // TODO: validate email
    if (!receiver) return;
    if (!templateId) return;

    mailjet
        .post('send', {
            version: 'v3.1'
        })
        .request({
            Messages: [{
                From: {
                    Email: process.env.MAILJET_MAIL_ADDRESS,
                    Name: process.env.MAILJET_MAIL_NAME
                },
                To: [{
                    Email: receiver
                }],
                TemplateLanguage: true,
                TemplateID: templateID,
                Variables: extractDataForTemplate(dataObj)
            }]
        }).then(() => {
            // update last mail timestamp
        }).catch((err) => {
            console.error(error);
        });
};

const getTemplateID = (type, language) => {
    const templateName = (type + '_' + language).toUpperCase();

    return process.env['MAILJET_TEMPLATE_' + templateName];
};

const extractDataForTemplate = (dataObj) => {
    const type = dataObj.type;
    let extractedObj = {};

    if (type === 'soc_reached') {
        extractedObj = {
            soc_value: dataObj.sync.soc_display || dataObj.sync.soc_bms,
            soc_text: dataObj.sync.soc_display ? 'Display' : 'BMS',
            range_value: 0, // TODO: implement range calculation
            range_unit: dataObj.settings.range_unit,
            consumption_value: dataObj.settings.consumption,
            consumption_unit: dataObj.settings.consumption_unit,
            consumption_text: (dataObj.settings.consumption_unit === 'km' ? '/100' : '/') + dataObj.settings.range_unit
        };
    }

    return extractedObj;
};

module.exports = {
    sendMail
};