import axios, { Axios } from "axios";
import { useState } from "react";


const base_url = "http://localhost:4000/api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");

    async function register(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const registerData = {
            email,
            password,
            username,
        };

        try {            
            await axios.post(`${base_url}/auth/register`, registerData);
            if (registerData) {
                alert("Register success");
                window.location.href = "/login";
            }            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="page">
            <h1>Register a new account</h1>
            <form onSubmit={register}>
                <label htmlFor="register-email">Email:</label>
                <input
                    type="email"
                    id="register-email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label htmlFor="register-password">Password:</label>
                <input
                    type="password"
                    id="register-password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

             

                <label htmlFor="register-name">Name:</label>
                <input
                    type="text"
                    id="register-name"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    value={username}
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}