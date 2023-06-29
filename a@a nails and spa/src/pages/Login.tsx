import axios from "axios";
import { useState } from "react";
import { json } from "react-router-dom";

const base_url = "http://localhost:4000/api";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");


    async function login(e: { preventDefault: () => void; }) {
        e.preventDefault();


        const res = await fetch(`${base_url}/auth/verify`,{
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })
          .then (res => res.json())
            .then ((json) => {
                console.log(json)
                return json
            })
            .catch((err) => {
                console.log(err)
            })
            if (res.token) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                window.location.href = "/";
            }
        }

    return (
        <div className="page">
            <h1>Login</h1>
            <form onSubmit={login}>
                <label htmlFor="login-email">Email:</label>
                <input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

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
                    value={username}
                />


             
                <button type="submit">Login</button>
            </form>
        </div>
    );
}