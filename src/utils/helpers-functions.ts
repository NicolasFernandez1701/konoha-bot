import { Request } from 'express';

export const parseIp = (req: Request) => {
    try {
        return ((req.headers['x-forwarded-for'] as any) || '').split(',').pop().trim() || req.socket.remoteAddress;
    } catch (error) {
        return null;
    }
}

export const createCustomError = (err: any, code: number, message?: string) => {
    const error: any = new Error(message || err.message);
    if (err.stack) error.stack = err.stack;        
    error.status = err.status;
    error.code = err.code || code;
    error.data = err.data;
    return error;
}