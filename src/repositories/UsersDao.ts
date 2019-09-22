import crypto from 'crypto';
import Users from '../models/Users';

export const findLoginUser = async (email: string, password: string): Promise<Users | null> => {
    password = generateHash(password);
    const data: Users | null = await Users.findOne<Users>({
        where: {
            email,
            password,
            deleted_at: null,
        },
    });
    return data;
};

const generateHash = (data: string): string => {
    const shasum = crypto.createHash('sha1');
    shasum.update(data);
    return shasum.digest('hex');
};
