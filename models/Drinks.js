

import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const DrinkSchema = new Schema({
    name: String,
    image: String,
    ingredients: String,
    instruction: String,
});

export const Drink= mongoose.model('Drink', DrinkSchema);



export function CreateNewDrink(req, res) {
    const newDrink = new Drink({
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

export function RemoveDrink(req, res) {
    const id = req.body.id;
    Drink.findByIdAndDelete(id)

        .then((deletedDrink) => {
            res.status(200).json(deletedDrink);
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

export function UpdateDrink(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const image = req.body.image;
    const ingredients = req.body.ingredients;
    const instruction = req.body.instruction;
    const updatedDrink = Drink.findByIdAndUpdate(id, {
        name: name,
        image: image,
        ingredients: ingredients,
        instruction: instruction
    }, { new: true })
        .then((updatedDrink) => {
            res.status(200).json(updatedDrink);
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


export function GetAllDrinks(req, res) {
    Drink.find()
        .then((drinks) => {
            res.status(200).json(drinks);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
}

