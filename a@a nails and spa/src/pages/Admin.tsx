import { useNavigate } from "react-router-dom";

// add service to database
export default function Admin() {
    const navigate = useNavigate();


    return (
        <div className="page">
            <h1>Admin</h1>
            <button onClick={()=>{navigate("/admin/services")}}>Services</button>


            <button onClick={()=>{navigate("/admin/drinks")}}>Drinks</button>
            <button onClick={()=>{navigate("/admin/deliverytext")}}>Delivery Text</button>
         
        </div>
    );
}