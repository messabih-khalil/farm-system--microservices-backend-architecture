import jwt from 'jsonwebtoken';

import { CONFIG } from '../config/config';
import { AuthPayload, User } from '../types';

export class AuthService {
    private static users: User[] = [
        {
            id: '1',
            email: 'admin@example.com',
            role: 'admin',
        },
    ];

    static async authenticate(
        email: string,
        password: string
    ): Promise<string | null> {
        const user = this.users.find((u) => u.email === email);

        if (!user) return null;

        const isValid = password === 'admin123';

        if (!isValid) return null;

        return this.generateToken(user);
    }

    static generateToken(user: User): string {
        const payload: AuthPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        return jwt.sign(payload, CONFIG.JWT_SECRET, {
            expiresIn: CONFIG.AUTH.TOKEN_EXPIRY,
        });
    }

    static verifyToken(token: string): AuthPayload | null {
        try {
            return jwt.verify(token, CONFIG.JWT_SECRET) as AuthPayload;
        } catch (error) {
            return null;
        }
    }
}
