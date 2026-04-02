
import { useState } from "react";
import logo from '../assets/Logo.png'
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export function Register() {


    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const Maps = useNavigate();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const response = await api.post("/auth/register", {
                email, name, password
            })
            localStorage.setItem("token", response.data.token);
            console.log(localStorage.getItem("token"))
            Maps("/");

        } catch {
            alert("Something went wrong during the registration process.");
        } finally {
            setIsLoading(false);
            setEmail("");
            setName("");
            setPassword("");
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <form onSubmit={handleRegister}>
                    <div className="flex items-center justify-center h-screen flex-col">
                        <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full max-w-md gap-5">
                            <div className="flex flex-col justify-center items-center gap-1">
                                <h1 className="text-3xl font-bold mb-5">Welcome to</h1>
                                <img src={logo} className="w-12 h-12" />
                                <h1 className="text-3xl font-bold mb-5">Finance Manager</h1>
                                <span className="text-gray-500">Simple finance, powerful decisions.</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">Email</span>
                                <input type="email"
                                    value={email}
                                    required
                                    placeholder="example@email.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    className="border border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">Name</span>
                                <input type="text"
                                    required
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    className="border border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500" />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <span className="font-semibold">Password</span>
                                <input type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    className="border border-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-500" />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={"bg-green-600 hover:bg-green-700 transition-colors shadow-lg text-white rounded-lg w-full p-3 disabled:cursor-default disabled:bg-green-300"}>Register</button>
                                <span>Already a member? <button type="button" className="font-bold hover:text-gray-500 transition-colors" onClick={() => { Maps("/login") }}>Sign In!</button></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )

}