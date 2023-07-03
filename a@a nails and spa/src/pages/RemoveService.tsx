import axios from "axios";
import { get } from "mongoose";
import { useState } from "react";
import { GetServices } from "../components/GetServices";


const base_url = import.meta.env.VITE_BASE_URL 




export default function RemoveService() {
    
    return (
        <>
        {GetServices().then((data) => {
            return (
                <div className="page">
                    <h1>Remove Service</h1>
                    <div className="service-list">
                        {data.map((service: { _id: any; name: any; price: any; instruction: any; image: any; }) => {
                            return (
                                <div className="service" key={service._id}>
                                    <div className="service-info">
                                        <h3>{service.name}</h3>
                                        <p>Price: {service.price}</p>
                                        <p>Instruction: {service.instruction}</p>
                                    </div>
                                    <div className="service-image">
                                        <img src={service.image} alt={service.name} />
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

