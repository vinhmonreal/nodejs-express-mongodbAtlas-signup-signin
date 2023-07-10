import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../contexts/UserProvider';
import { useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_BASE_URL 
export default function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const {user, setUser} = useContext(AuthContext);

    useEffect(() => {
        if (user.loggedIn === true) {
            console.log(user, "user")
            navigate("/");
        }
    }, [user.loggedIn]);



    async function login(e:any) {
        e.preventDefault();


        const res = await fetch(`${base_url}/auth/verify`,{
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
              name : name,
              password: password,
            })
          })
            if (res.status === 200) {
                const data = await res.json();
                localStorage.setItem('token',JSON.stringify(data.token))
                localStorage.setItem('name',JSON.stringify(data.name))
                localStorage.setItem('isAdmin',JSON.stringify(data.isAdmin))
                localStorage.setItem('loggedIn',JSON.stringify(data.loggedIn))
                setUser({
                    token: data.token,
                    name: data.name,
                    isAdmin: data.isAdmin,
                    loggedIn: true,
                })
            }
            else {
                console.log("no")
                alert("Login failed");
            }
    }
              



    return (
        <div className="page">
            <h1>Login</h1>
            <form onSubmit={login}>
  

                <label htmlFor="login-password">Password:</label>
                <input
                    type="password"
                    id="login-password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <label htmlFor="login-name">Name:</label>
                <input

                    type="text"
                    id="login-name"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />


             
                <button type="submit">Login</button>
            </form>
        </div>
    );
}