import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const signouthandler = () => {
        localStorage.removeItem('token');
        navigate('/Signin');
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    <h1 className="text-2xl font-bold text-blue-600">
                        MyTasks
                    </h1>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className={`${location.pathname == '/' ? "text-gray-400" : "text-gray-700"} hover:text-blue-600 font-medium`}>
                            Home
                        </Link>
                        <Link to="/addTask" className={`${location.pathname == '/addTask' ? "text-gray-400" : "text-gray-700"} hover:text-blue-600 font-medium`}>
                            Add Task
                        </Link>
                        <button onClick={signouthandler} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                            Sign Out
                        </button>
                    </div>

                    <button className="md:hidden text-2xl text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                        ☰
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Home
                    </Link>
                    <Link to="/addTask"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Add Task
                    </Link>
                    <button onClick={signouthandler} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                        Sign Out
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
