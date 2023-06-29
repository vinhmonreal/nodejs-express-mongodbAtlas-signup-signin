

import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const DrinkSchema = new Schema({
    name: String,
    image: String,
    ingredients: String,
    instruction: String,
});

export const DrinkModel = mongoose.model('Drink', DrinkSchema);



export function CreateNewDrink(req, res) {
    const newDrink = new DrinkModel({
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients,
        instruction: req.body.instruction
    })
    newDrink.save()
        .then((createdDrink) => {
            res.status(201).json(createdDrink);
        }
        )
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        }
        )
}
