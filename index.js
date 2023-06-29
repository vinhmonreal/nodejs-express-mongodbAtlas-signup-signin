import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import dotenv from 'dotenv';
import morgan from 'morgan';
import 'dotenv/config'
import mongoose from 'mongoose';
import { ProductModel, CreateNewProduct } from './models/product.js';
import {  CreateNewUser, VerifyUser} from './models/user.js';
import { User } from './models/user.js';
import bcrypt from 'bcrypt';
import { CreateNewDrink } from './models/Drinks.js';
import cors from 'cors';


export const api = process.env.API_URL;
// // get config vars
// dotenv.config();
// // access config var
// process.env.TOKEN_SECRET;
const app = express();
app.use(bodyParser.json());
app.use(morgan('tiny')); // log requests
app.use(cors());
app.post(`${api}/auth/register`, CreateNewUser);
app.post(`${api}/auth/verify`, VerifyUser);
app.post(`${api}/admin/createDrink`, CreateNewDrink);



app.post(`${api}/createproduct`, CreateNewProduct);


app.get(`${api}/products`, async (req, res) => {
    const productList = await ProductModel.find();
    if (!productList) {
        res.status(500).json({ success: false })
    }
    res.send(productList);
});    





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


