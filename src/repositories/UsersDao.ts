import crypto from 'crypto';
import Users from '../models/Users';

export const findById = async (id: number): Promise<Users | null> => {
    const user: Users | null = await Users.findOne<Users>({
        where: {
            id,
            deleted_at: null,
        },
    });
    return user;
};

export const findLoginUser = async (email: string, password: string): Promise<Users | null> => {
    password = generateHash(password);
    const user: Users | null = await Users.findOne<Users>({
        where: {
            email,
            password,
            deleted_at: null,
        },
    });
    return user;
};

const generateHash = (data: string): string => {
    const shasum = crypto.createHash('sha1');
    shasum.update(data);
    return shasum.digest('hex');
};
