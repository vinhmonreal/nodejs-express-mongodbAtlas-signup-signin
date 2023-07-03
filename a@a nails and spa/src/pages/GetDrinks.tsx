

import axios from "axios";
import { useEffect, useState } from "react";
import UpdateService from "./UpdateService";
import { useNavigate } from "react-router-dom";
import { Stuff_idContext } from "../contexts/UserProvider";
import { useContext } from "react";
import { set } from "mongoose";
const base_url = import.meta.env.VITE_BASE_URL
console.log(base_url);
export default function GetDrinks() {

    const user = localStorage.getItem('user');

    const [drinks, setDrinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    
    const fetchDrinks = async () => {
        const res = await fetch (`${base_url}/admin/drinks`)
        const data = await res.json();
        console.log(data);
        setDrinks(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchDrinks();
    }, []);

    async function handleRemove(id:string) {
        // create a promt to confirm the delete
        if (window.confirm('Are you sure you want to delete this drink?')) {
        
        setLoading(true);
        const res = await fetch (`${base_url}/admin/removedrink`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        })
        if (res.status === 200) {
            const newDrinks = drinks.filter((drink: any) => drink._id !== id);
            setDrinks(newDrinks);
        }
        setLoading(false);
        } else {
            return;
        }
    }




       
    return (
        <div>
            <h1>Drinks</h1>
            <button onClick={()=>{navigate("/admin/adddrink")}}>Add Drink</button>
            {loading ? <h1>Loading...</h1> : (drinks.map((drink: any) => (
                <div key={drink._id}>
                    <h1>{drink.name}</h1>
                    <p>{drink.instruction}</p>
                    <p>{drink.price}</p>
                    <p>{drink.image}</p>
                    <button onClick={()=>{handleRemove(drink._id)}}>Remove</button>
                    <button onClick={()=>{
                        localStorage.setItem('stuff_id', JSON.stringify(drink._id))
                        navigate("/admin/updatedrink")
                        }}>Update</button>
                </div>
            )))}
        </div>
    )
}

