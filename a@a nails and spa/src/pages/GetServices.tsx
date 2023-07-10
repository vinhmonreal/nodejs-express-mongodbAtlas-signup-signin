

import axios from "axios";
import { useEffect, useState } from "react";
import UpdateService from "./UpdateService";
import { useNavigate } from "react-router-dom";
import { Stuff_idContext } from "../contexts/UserProvider";
import { useContext } from "react";
const base_url = import.meta.env.VITE_BASE_URL
console.log(base_url);
export default function GetServices() {

    const user = localStorage.getItem('user');

    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    
    const fetchServices = async () => {
        const res = await fetch (`${base_url}/admin/services`)
        const data = await res.json();
        console.log(data);
        setServices(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchServices();
    }, []);

    async function handleRemove(id:string) {
        // create a promt to confirm the delete
        if (window.confirm('Are you sure you want to delete this service?')) {
        
        setLoading(true);
        const res = await fetch (`${base_url}/admin/removeservice`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id})
        })
        if (res.status === 200) {
            const newServices = services.filter((service: any) => service._id !== id);
            setServices(newServices);
        }
        setLoading(false);
        } else {
            return;
        }
    }




       
    return (
        <div>
            <h1>Services</h1>
            <button onClick={()=>{navigate("/admin/addservice")}}>Add Service</button>
            {loading ? <h1>Loading...</h1> : (services.map((service: any) => (
                <div key={service._id}>
                    <h1>{service.name}</h1>
                    <p>{service.instruction}</p>
                    <p>{service.price}</p>
                    <p>{service.image}</p>
                    <button onClick={()=>{handleRemove(service._id)}}>Remove</button>
                    <button onClick={()=>{
                        localStorage.setItem('stuff_id', JSON.stringify(service._id))
                        navigate("/admin/updateservice")
                        }}>Update</button>
                </div>
            )))}
        </div>
    )
}

