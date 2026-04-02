import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import pfp from "../assets/defaultpfp.jpg"
import { useEffect, useState } from "react"
import api from "../services/api";


export function Header() {

    const [userName, setUserName] = useState("USER");
    const [isUsernameClicked, setIsUsernameClicked] = useState(false);

    const linkClass = ({ isActive }) => {
        return isActive 
        ? "text-black bg-gray-200 border-none rounded-lg p-3 transition-colors"
        : "hover:text-black hover:bg-gray-200 border-none rounded-lg p-2 transition-colors"
    }

    useEffect(() => {
        async function fetchUserData(){
            
            const response = await api.get('api/user/me');

            setUserName(response.data.name.split(' ')[0]);
        }
        fetchUserData();
    }, [])
    
    return (
        <>
            <header
                className="min-h-16 bg-white grid grid-cols-[auto_1fr_auto] items-center border-b-2 border-gray-200 shadow-sm px-6">
                <div className="flex items-center gap-2 ml-10">
                    <img src={logo} className="w-12 h-12" />
                    <h1 className="text-3xl font-semibold">Finance Manager</h1>
                </div>
                <div className="flex justify-center items-center gap-5 text-gray-500 text-lg">
                        <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
                        <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
                        <NavLink to="/categories" className={linkClass }>Categories</NavLink>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <img src={pfp} className="w-10 h-10 rounded-full" />
                    <button className="hover:bg-gray-200 p-2 rounded-lg ">Hello, {userName}</button>
                </div>
            </header>
        </>
    )
}