import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'dotenv/config'
import mongoose from 'mongoose';
import { ProductModel, CreateNewProduct } from './models/product.js';
import {  CreateNewUser, VerifyUser} from './models/user.js';
import { CreateNewDrink, GetAllDrinks, RemoveDrink, UpdateDrink } from './models/Drinks.js';
import { User } from './models/user.js';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { CreateNewService, GetAllServices, RemoveService, UpdateService } from './models/Service.js';
import { SendEmail } from './models/order.js';
import { CreateNewSetting, GetSetting, DeleteSetting } from './models/setting.js';

export const api = process.env.API_URL;
// // get config vars
// dotenv.config();
// // access config var
// process.env.TOKEN_SECRET;
const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny')); // log requests
app.use(cors({
    origin: '*'
}));
app.post(`${api}/auth/register`, CreateNewUser);
app.post(`${api}/auth/verify`, VerifyUser);

app.post(`${api}/admin/createService`, CreateNewService);
app.delete(`${api}/admin/removeservice`, RemoveService);
app.put(`${api}/admin/updateservice`, UpdateService);
app.get(`${api}/admin/services`, GetAllServices);

app.post(`${api}/admin/createdrink`, CreateNewDrink);
app.delete(`${api}/admin/removedrink`, RemoveDrink);
app.put(`${api}/admin/updatedrink`, UpdateDrink);
app.get(`${api}/admin/drinks`, GetAllDrinks);

app.post(`${api}/client/order`, SendEmail);
app.post(`${api}/admin/deliverytext`, CreateNewSetting);
app.get(`${api}/admin/managetexts`, GetSetting);
app.delete(`${api}/admin/deletetextuser`, DeleteSetting);

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
    .then(() => {
        console.log('Database connection is ready');
    })
    .catch((err) => {
        console.log(err);
    }
);

app.listen(4000, () => {
    console.log(api);
    console.log('Server started on port 4000!');
    }
);


