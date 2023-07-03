import axios from "axios";
import { get } from "mongoose";
import { useState } from "react";
import { GetServices } from "../components/GetServices";
import { GetDrinks } from "../components/GetDrinks";


const base_url = import.meta.env.VITE_BASE_URL 




export default function RemoveDrink() {
    
    return (
        <>
        {GetDrinks().then((data) => {
            return (
                <div className="page">
                    <h1>Remove Drink</h1>
                    <div className="service-list">
                        {data.map((drink: { _id: any; name: any; price: any; instruction: any; image: any; }) => {
                            return (
                                <div className="service" key={drink._id}>
                                    <div className="service-info">
                                        <h3>{drink.name}</h3>
                                        <p>Price: {drink.price}</p>
                                        <p>Instruction: {drink.instruction}</p>
                                    </div>
                                    <div className="service-image">
                                        <img src={drink.image} alt={drink.name} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
        )}
        </>
    )
}

