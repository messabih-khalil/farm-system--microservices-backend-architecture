import express from 'express';
import { ProxyService } from '../services/proxy.service';
import { CONFIG } from '../config/config';
import { authMiddleware } from '../middleware/auth.middleware';
import { AuthService } from '../services/auth.service';

const router = express.Router();

// Authentication Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await AuthService.authenticate(email, password);

        if (!token) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
});

// Protected Service Routes with Proxy
router.use('/cattles', authMiddleware, async (req, res) => {
    await ProxyService.forwardRequest(
        req,
        res,
        CONFIG.SERVICES.CATTLES_SERVICE!
    );
});
router.use('/birth', authMiddleware, async (req, res) => {
    await ProxyService.forwardRequest(
        req,
        res,
        CONFIG.SERVICES.BIRTHS_SERVICE!
    );
});
router.use('/milk', authMiddleware, async (req, res) => {
    await ProxyService.forwardRequest(
        req,
        res,
        CONFIG.SERVICES.MILK_PRODUCTION_SERVICE!
    );
});
router.use('/medical', authMiddleware, async (req, res) => {
    await ProxyService.forwardRequest(
        req,
        res,
        CONFIG.SERVICES.MEDICAL_SERVICE!
    );
});

export default router;
