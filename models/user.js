import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String, 
    email: String,
    password: String,
    phone: Number,
    dateCreated: Date,
    isAdmin: Boolean

})

export const User = mongoose.model('User', UserSchema)

export async function CreateNewUser (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const passwordRaw = req.body.password

    const passwordHashed = await bcrypt.hash(passwordRaw, 10)

    const newUser = await User.create({
        name: name,
        email: email,
        password: passwordHashed,
        dateCreated: Date.now(),
        isAdmin: false
    });

    res.status(201).json(newUser)
}


function generateToken(userId) {
    return jwt.sign({
        data: userId
      }, 'secret', { expiresIn: '1h' })
}

export async function VerifyUser (req, res) {
    const name = req.body.name;
    const password = req.body.password;
    
    const user = await User.findOne({ name: name })

    if (user && (await bcrypt.compare(password, user.password))) {
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            dateCreated: user.dateCreated,
            token: generateToken(user._id),
            isAdmin: user.isAdmin
        }
        console.log(data);
        res.status(200).json(data)


    } else {
        res.status(400).json({
            success: false
        })
    }
}
