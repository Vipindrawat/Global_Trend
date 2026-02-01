import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddTask = () => {
    const navigate = useNavigate();
    const [taskdata, setTaskdata] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        setTaskdata({ ...taskdata, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/task/addTask`, { title: taskdata.title, description: taskdata.description }, {
            headers: {
                token,
            },
        });
        if (res.data.success) {
            alert("Task added successfully");
            navigate('/');

        } else {
            alert(res.data.error || "Task failed");
        }
    }

    const cancelclick = () => {
        navigate('/');
    }

    return (
        <div className=" flex items-center justify-center px-4 xl:mt-28 mt-10">
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Task
                </h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Title
                    </label>
                    <input type="text" name="title" required value={taskdata.title} onChange={handleChange} placeholder="Enter task title" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">
                        Description
                    </label>
                    <textarea rows="4" name="description" value={taskdata.description} onChange={handleChange} placeholder="Enter task description" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div className="flex gap-3">
                    <button type="submit" onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Add Task
                    </button>
                    <button type="button" onClick={cancelclick} className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
