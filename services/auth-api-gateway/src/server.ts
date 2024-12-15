import app from './app';
import { CONFIG } from './config/config';
import { logger } from './utils/logger';

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
    });
});

const startServer = () => {
    const server = app.listen(
        // @ts-ignore
        CONFIG.PORT,
        '0.0.0.0',
        () => {
            logger.info(`🚀 Server running on port ${CONFIG.PORT}`);
        }
    );

    process.on('SIGTERM', () => {
        logger.info('SIGTERM signal received. Closing HTTP server.');
        server.close(() => {
            logger.info('HTTP server closed.');
            process.exit(0);
        });
    });
};

startServer();
