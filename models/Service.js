

import mongoose from 'mongoose';

export const Schema = mongoose.Schema;

export const ServiceSchema = new Schema({
    name: String,
    price: String,
    image: String,
    instruction : String,
});

export const Service = mongoose.model('Service', ServiceSchema);



export function CreateNewService(req, res) {
    const newService = new Service({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        instruction: req.body.instruction
    })
    newService.save()
        .then((createdService) => {
            res.status(201).json(createdService);
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

export function RemoveService(req, res) {
    const id = req.body.id;
    Service.findByIdAndDelete(id)
        .then((deletedService) => {
            res.status(200).json(deletedService);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
}



export function UpdateService(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const instruction = req.body.instruction;
    const updatedService = Service.findByIdAndUpdate(id, {
        name: name,
        price: price,
        image: image,
        instruction: instruction
    })
        .then(() => {
            res.status(200).json({
                _id: id,
                name: name,
                price: price,
                image: image,
                instruction: instruction
                
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
}


export function GetAllServices(req, res) {
    Service.find()
        .then((services) => {
            res.status(200).json(services);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
}

