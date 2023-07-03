

import mongoose from 'mongoose';
// import { deliveryTextNumber } from './setting.js';
const extentsions = ['@tmomail.net', '@txt.att.net', '@vtext.com', '@messaging.sprintpcs.com', '@myboostmobile.com'];

import {Setting} from './setting.js';
export const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    clientName: String,
    clientStation: String,
    drinkName: String
});


export const Order = mongoose.model('Order', OrderSchema);

import nodemailer from 'nodemailer';

export function SendEmail(req, res) {
    const clientName = req.body.clientName;
    const clientStation = req.body.clientStation;
    const drinkName = req.body.drinkName;
    const time = new Date();
    let extension =''
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vinhtran759@gmail.com',
            pass: 'qcmnaoyqwvgeqvxh'
        }
    });
    Setting.find({})
    .then((setting) => {
    let data =[]
    for (let i = 0; i < setting.length; i++) {
        data.push([setting[i].deliveryText, setting[i].provider])
        }
        console.log(data)
        for (let i = 0 ; i < data.length; i++) {
            if (data[i][1] === 'T-Mobile') {
                extension = '@tmomail.net'
                console.log(extension)
            }
            else if (data[i][1] === 'AT&T') {
                extension = '@txt.att.net'
                console.log(extension)
            }
            else if (data[i][1] === 'Verizon') {
                extension = '@vtext.com'
                console.log(extension)
            }
            else if (data[i][1] === 'Sprint') {
                extension = '@messaging.sprintpcs.com'
                console.log(extension)
            }
            else if (data[i][1] === 'Boost Mobile') {
                extension = '@myboostmobile.com'
                console.log(extension)
            }
            else {
                console.log('no provider')
            }

            const mailOptions = {
                from: 'vinhtran759@gmail.com',
                to: data[i][0]+extension,
                subject: 'Majestic Nail Lounge on Culebra',
                text: `${time}\nCLIENT: ${clientName}\n${clientStation}\n ${drinkName}\n`
            };
            console.log(mailOptions)

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({
                        success: true
                    });
                    console.log('Email sent: ' + info.response);
                }
            }
            )
        }
        

    })
  
    .catch((err) => {
        console.log(err)
    })

}

// export function CreateNewOrder(req, res) {
//     const clientName = req.body.clientName;
//     const clientStation = req.body.clientStation;
//     const drinkName = req.body.drinkName;

//     SendEmail(clientName, clientStation, drinkName);
  
// }
