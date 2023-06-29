import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String, 
    email: String,
    password: String,
    street: String,
    apartment: String,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    isAdmin: Boolean

})

export const User = mongoose.model('User', UserSchema)

export async function CreateNewUser (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password
    console.log(username, email, passwordRaw)

    const passwordHashed = await bcrypt.hash(passwordRaw, 10)

    const newUser = await User.create({
        username: username,
        email: email,
        password: passwordHashed
    });

    res.status(201).json(newUser)
}

function generateToken(userId) {
    return jwt.sign({
        data: userId
      }, 'secret', { expiresIn: '1h' })
}

export async function VerifyUser (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    console.log("email: " + email, "password: " + password);
    
    const user = await User.findOne({ email: email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        }
        console.log(data);
        res.status(200).json(data)


    } else {
        res.status(400).json({
            success: false
        })
    }
}

// export async function LoginUser (req, res) {
//     const content = req.body;
//     console.log(content)

//     const email = content.email;
//     const passwordRaw = content.password;
//     const passwordHashed = await bcrypt.hash(passwordRaw, 10)
//     const checkEmail = User.findOne({ email: email })
//     const user = User.findOne({ email: email })

//     if (user && passwordHashed) {
//         res.status(200).json({
//             success: true
//         })
//     }
// }

