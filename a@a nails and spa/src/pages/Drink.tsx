

import { useContext, useEffect, useState } from "react";
import {GetDrinks} from "../components/GetDrinks";
import { AuthContext } from "../contexts/UserProvider";


const base_url = import.meta.env.VITE_BASE_URL

export async function handleOrder() {        

    const res = await fetch (`${base_url}/client/order`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            clientName: "test",
            drinkName: "test",
            clientStation: "test"
        })
    }
    )
    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
        alert("Your drink is on the way!");
    }
    else {
        alert("Order failed");
    }

}

export default  function Drinks () {
    const [drinks, setDrinks] = useState([])
    const [loading, setLoading] = useState(true)

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

    
    return (
        <>
        <h1>Drinks</h1>
        {loading ? <h2>Loading...</h2> : (
            <div className="service-list">
                {drinks.map((drink: { _id: any; name: any; ingredients: any; instruction: any; image: any; }) => {
                    return (
                        <div className="service" key={drink._id}>
                            <div className="service-info"  >
                                <h3>{drink.name}</h3>
                                <p>Ingredients: {drink.ingredients}</p>
                                <p>Instruction: {drink.instruction}</p>
                            </div>
                            <div className="service-image">
                                <img src={drink.image}  />
                            </div>
                            <button onClick={handleOrder}>Order</button>
                        </div>
                    )
                })}
            </div>
        )}
        </>
    )
}

