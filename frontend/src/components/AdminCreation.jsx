import React, { useState } from "react";
import './AdminCreation.css';  

function AdminCreation() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    role: "admin"
                }),
            });

            if (response.ok) {
                alert("Admin account created!");
            } else {
                alert("Error creating admin account");
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Admin Account</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default AdminCreation;
