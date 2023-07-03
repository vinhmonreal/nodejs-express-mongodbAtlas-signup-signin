
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL

export const GetDrinks= async () =>  {
    const res = await axios.get(`${base_url}/admin/drinks`)

    if (res.status === 200) {
        const data = await res.data;
        return data;
    }
    else {
        console.log("no")
        alert("Get drinks failed");
    }
}