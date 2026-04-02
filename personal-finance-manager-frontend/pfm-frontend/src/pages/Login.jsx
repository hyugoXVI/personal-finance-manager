import { useState } from "react";
import logo from '../assets/Logo.png'
import { useNavigate } from "react-router-dom";
import api from "../services/api";


export function Login() {

    

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const Maps = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const response = await api.post("/auth/login", {
                email, password
            })
            localStorage.setItem("token", response.data.token);
            console.log(localStorage.getItem("token"));
            Maps("/");

        } catch {
            alert("Something went wrong in login process.");
        } finally {
            setIsLoading(false);
            setEmail("");
            setPassword("");
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100">
                <form onSubmit={handleLogin}>
                    <div className="flex items-center justify-center h-screen flex-col">
                        <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full max-w-md gap-5">
                            <div className="flex flex-col justify-center items-center gap-1">
                                <img src={logo} className="w-12 h-12" />
                                <h1 className="text-3xl font-semibold mb-5">Finance Manager</h1>
                                <h1 className="text-2xl font-bold">Welcome back!</h1>
                                <span className="text-gray-500">Insert your login's information.</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="font-semibold">Email</span>
                            
                                <input type="email"
                                    required
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
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
                                    className={"bg-green-600 hover:bg-green-700 transition-colors shadow-lg text-white rounded-lg w-full p-3 disabled:cursor-default disabled:bg-green-300"}>Log In</button>
                                <span>Doesn't have an account? <button type="button" className="font-bold hover:text-gray-500 transition-colors" onClick={() => { Maps("/register") }}>Register here!</button></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div >
        </>
    )

}