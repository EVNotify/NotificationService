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
                Variables: getDataForTemplateID(templateID, dataObj)
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

const getDataForTemplateID = (templateID, dataObj) => {

};

module.exports = {
    sendMail
};