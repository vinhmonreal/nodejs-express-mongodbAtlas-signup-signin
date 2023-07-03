import { set } from "mongoose";
import { useEffect, useState } from "react";
import { FormCheck } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function DeliveryText(){
    const base_url = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate();
    const [numbers, setNumbers] = useState([]);
    
    const [provider, setProvider] = useState("");
    const [deliveryText, setDeliveryText] = useState("");
    async function addDeliveryText(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const res = await fetch (`${base_url}/admin/deliverytext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deliveryText: deliveryText,
                provider: provider
            })
        })
        if (res.status === 200) {
            alert("Add delivery text success");
            navigate("/admin");
        }
        else {
            console.log("no")
            alert("Add delivery text failed");
        }
    }

    const fetchNumbers = async () => {
        const res = await fetch (`${base_url}/admin/managetexts`)
        const data = await res.json();
        console.log(data);
        return data;
    }
    useEffect(() => {
        fetchNumbers()
        .then((data) => {
            setNumbers(data);
        }
        )

    }, []);

    async function handleRemove(id:string) {
        // create a promt to confirm the delete
        if (window.confirm('Are you sure you want to delete this delivery text?')) {
            const res = await fetch (`${base_url}/admin/deletetextuser`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id})
            })
            if (res.status === 200) {
                const newNumbers = numbers.filter((number: any) => number._id !== id);
                setNumbers(newNumbers);
            }
        } else {
            alert("Delete delivery text failed");
        }
    }




    return (
        <div className="page">
            <h1>Numbers on Service</h1>
            {numbers.map((number: any) => (
                <div key={number._id}>
                    <p>{number.deliveryText}</p>
                    <button onClick={() => handleRemove(number._id)}>Remove</button>
                </div>
            ))}
            <h1>Add Number</h1>
            <p>T-Mobile,AT&T,Verizon,Sprint,Boost Mobile</p>
            <form onSubmit={addDeliveryText}>
                <label htmlFor="addservice-name">Provider:</label>
                <input
                    type="text"
                    id="addservice-name"
                    placeholder="Enter provider"
                    onChange={(e) => setProvider(e.target.value)}
                    value={provider}
                />
                <label htmlFor="addservice-name">Number:</label>
                <input
                    type="text"
                    id="addservice-name"
                    placeholder="Enter delivery text"
                    onChange={(e) => setDeliveryText(e.target.value)}
                    value={deliveryText}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
}