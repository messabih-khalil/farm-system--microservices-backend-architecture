import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const token = req.headers.authorization?.split(' ')[1];

    // if (!token) {
    //     return res.status(401).json({ message: 'No token provided' });
    // }

    // const decoded = AuthService.verifyToken(token);

    // if (!decoded) {
    //     return res.status(401).json({ message: 'Invalid or expired token' });
    // }

    // // Attach user info to request for further use
    // // @ts-ignore
    // req.user = decoded;
    next();
};
