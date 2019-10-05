import sequelize from '../../src/sequelize';
import Users from '../../src/models/Users';
import { findById, findLoginUser } from '../../src/repositories/UsersDao';

describe('UsersDao', () => {
    beforeAll(async (done: jest.DoneCallback) => {
        // connect database
        await sequelize.authenticate().catch((err: any) => {
            done.fail(err);
        });
        // truncate table
        await Users.truncate();
        // insert test data
        await Users.create({
            id: 1,
            email: 'hoge@fuga.co.jp',
            password: '97bbc79679fe1cfd9afb52fd6f01d033b479555d',
        });
        done();
    });

    afterAll(async () => {
        // disconnect database
        await sequelize.close();
    });

    describe('findById', () => {
        it('存在するIDでユーザー情報を取得できること', async () => {
            const id: number = 1;
            const users = await findById(id);
            expect(users).not.toBeNull();
            if (users != null) {
                expect(users.email).toBe('hoge@fuga.co.jp');
            }
        });
        it('存在しないIDでユーザー情報を取得出来ないこと', async () => {
            const id: number = 2;
            const users = await findById(id);
            expect(users).toBeNull();
        });
    });

    describe('findLoginUser', () => {
        it('正しいemailとpasswordでユーザー情報を取得できること', async () => {
            const email: string = 'hoge@fuga.co.jp';
            const password: string = '1qazxsw2';
            const users = await findLoginUser(email, password);
            expect(users).not.toBeNull();
            if (users != null) {
                expect(users.id).toBe(1);
            }
        });
        it('誤ったemailでユーザー情報を取得出来ないこと', async () => {
            const email: string = 'piyo@piyo.co.jp';
            const password: string = '1qazxsw2';
            const users = await findLoginUser(email, password);
            expect(users).toBeNull();
        });
        it('誤ったpasswordでユーザー情報を取得出来ないこと', async () => {
            const email: string = 'hoge@fuga.co.jp';
            const password: string = 'test';
            const users = await findLoginUser(email, password);
            expect(users).toBeNull();
        });
    });
});
