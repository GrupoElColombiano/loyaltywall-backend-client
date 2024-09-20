"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => {
    return {
        postgres: {
            dbName: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT),
        },
        mailer: {
            host: process.env.SENDGRID_HOST,
            port: parseInt(process.env.SENDGRID_PORT),
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD,
            secure: process.env.SENDGRID_SECURE,
        },
    };
});
//# sourceMappingURL=config.js.map