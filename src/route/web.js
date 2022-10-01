import express, { application } from "express";
import homeController from '../controller/homeController';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:id', homeController.getDetailPage);   // Dấu : đùng query params
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser)
    app.get('/home', (req, res) => {
        res.send('HELLO');
    });

    return app.use('/', router);
};

module.exports = initWebRoute;
