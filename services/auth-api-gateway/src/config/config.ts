import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'your_secret_key',
    SERVICES: {
        MEDICAL_SERVICE:
            process.env.MEDICAL_SERVICE_URL ||
            'http://medical-examination-service:3002',
        CATTLES_SERVICE:
            process.env.CATTLES_SERVICE_URL || 'http://cattle-service:3001',
        BIRTHS_SERVICE:
            process.env.BIRTHS_SERVICE_URL ||
            'http://birth-registration-service:3003',

        MILK_PRODUCTION_SERVICE:
            process.env.MILK_PRODUCTION_SERVICE_URL ||
            'http://milk-production-service:3004',
    },
    AUTH: {
        TOKEN_EXPIRY: '12h',
    },
};
