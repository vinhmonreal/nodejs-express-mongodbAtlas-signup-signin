
import { useEffect, useState } from "react";
import  {GetServices}  from "../components/GetServices";

export default function Service() {
    const base_url = import.meta.env.VITE_BASE_URL;
    const [services, setServices] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchServices = async () => {
        const res = await fetch(`${base_url}/admin/services`);
        const data = await res.json();
        console.log(data);
        setServices(data);
        setLoading(false);
    }
    useEffect(() => {
        fetchServices();
    }
    , []);

    return (
        <>
            <h1>Services</h1>
            {loading ? <h2>Loading...</h2> : (
                <div className="service-list">
                    {services.map((service: { _id: any; name: any; price: any; description: any; image: any; }) => {
                        return (
                            <div className="service" key={service._id}>
                                <div className="service-info">
                                    <h3>{service.name}</h3>
                                    <p>Price: {service.price}</p>
                                    <p>Description: {service.description}</p>
                                </div>
                                <div className="service-image">
                                    <img src={service.image} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}