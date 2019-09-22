import app from './configs/express';
import sequelize from './sequelize';

(async () => {
    await sequelize.authenticate().catch((err: any) => {
        console.log('database connect error !!');
        console.log(err);
        process.exit(1);
    });

    app.listen(3000, () => console.log('Express server listening on port 3000!'));
})();
