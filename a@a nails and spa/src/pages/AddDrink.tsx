import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const base_url = import.meta.env.VITE_BASE_URL 

export default function AddService() {
    const [name, setName] = useState("");
    const [instruction, setInstruction] = useState("");
    const [image, setImage] = useState("");
    const [ingredients, setIngredients] = useState("");
    const navigate = useNavigate();

    async function addDrink(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const addDrinkData = {
            
            name,
            instruction,
            ingredients,
            image
        };

        try {            
            await axios.post(`${base_url}/admin/createdrink`, addDrinkData);
            if (addDrinkData) {
                alert("Add drink success");
                navigate("/admin/drinks");
            }            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="page">
            <h1>Add Drink</h1>
            <form onSubmit={addDrink}>
                <label htmlFor="addservice-name">Name:</label>
                <input
                    type="text"
                    id="addservice-name"
                    placeholder="Enter service name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />


                <label htmlFor="addservice-ingredients">Ingredients:</label>
                <input

                    type="text"
                    id="addservice-ingredients"
                    placeholder="Enter service ingredients"
                    onChange={(e) => setIngredients(e.target.value)}
                    value={ingredients}
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
    