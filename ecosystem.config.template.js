module.exports = {
    apps : [{
      name: 'NotificationService',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      env: {
        DB_USER: 'evnotify',
        DB_PASSWORD: 'evnotify',
        DB_HOST: 'localhost',
        DB_PORT: '27017',
        DB_NAME: 'evnotify',
        AUTHORIZATION_SERVICE: 'http://localhost:3001/authorization',
        AUTHENTICATION_SERVICE: 'http://localhost:3002/authentication',
        SETTINGS_SERVICE: 'http://localhost:3003/settings',
        SYNC_SERVICE: 'http://localhost:3004/sync',
        MAILJET_API_KEY: 'MAILJET_API_KEY',
        MAILJET_API_SECRET: 'MAILJET_API_SECRET',
        MAILJET_MAIL_ADDRESS: 'mail@example.com',
        MAILJET_MAIL_NAME: 'Jon Doe',
        MAILJET_TEMPLATE_SOC_REACHED_EN: 123456,
        MAILJET_TEMPLATE_SOC_REACHED_DE: 123456,
        MAILJET_TEMPLATE_CHARGE_ABORTED_EN: 123456,
        MAILJET_TEMPLATE_CHARGE_ABORTED_DE: 123456,
        MAILJET_TEMPLATE_LOG_SUMMARY_EN: 123456,
        MAILJET_TEMPLATE_LOG_SUMMARY_DE: 123456,
      }
    }]
  };
  
