const mailjet = require('node-mailjet').connect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET);

const sendMail = (type, receiver, language, data) => {
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
                TemplateID: getTemplateID(type, language),
                Variables: data
            }]
        }).then(() => {
            // update last mail timestamp
        }).catch((err) => {
            console.error(error);
        });
};

const getTemplateID = (type, language) => {

};

module.exports = {
    sendMail
};