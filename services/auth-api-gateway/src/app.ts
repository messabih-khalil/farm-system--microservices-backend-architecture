import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import gatewayRoutes from './routes/gateway.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', gatewayRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;
