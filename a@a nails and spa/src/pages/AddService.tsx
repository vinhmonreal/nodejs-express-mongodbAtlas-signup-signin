import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const base_url = import.meta.env.VITE_BASE_URL 

export default function AddService() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [instruction, setInstruction] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    async function addService(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const addServiceData = {
          
            name,
            price,
            instruction,
            image
        };

        try {            
            await axios.post(`${base_url}/admin/createservice`, addServiceData);
            if (addServiceData) {
                alert("Add service success");
                navigate("/admin/services");
            }            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="page">
            <h1>Add Service</h1>
            <form onSubmit={addService}>
                <label htmlFor="addservice-name">Name:</label>
                <input
                    type="text"
                    id="addservice-name"
                    placeholder="Enter service name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label htmlFor="addservice-price">Price:</label>
                <input
                    type="text"
                    id="addservice-price"
                    placeholder="Enter service price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />

                <label htmlFor="addservice-instruction">Instruction:</label>
                <input
                    type="text"
                    id="addservice-instruction"
                    placeholder="Enter service instruction"
                    onChange={(e) => setInstruction(e.target.value)}
                    value={instruction}
                />

                <label htmlFor="addservice-image">Image:</label>
                <input
                    type="text"
                    id="addservice-image"
                    placeholder="Enter service image"
                    onChange={(e) => setImage(e.target.value)}
                    value={image}
                />

                <button type="submit">Add Service</button>
            </form>
        </div>
    );
}
//
    