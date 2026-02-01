
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        console.log(formData);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { name: formData.name, email: formData.email, password: formData.password });
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);

                navigate("/");
            } else {
                alert(res.data.error || "Registration failed");
            }
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Register
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Name
                    </label>
                    <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
