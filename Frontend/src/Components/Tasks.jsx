import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [triggerUseeffect, setTriggerusereffect] = useState(false);
    const token = localStorage.getItem('token');
    const ref = useRef(token);
    const [editingTaskId, seteditingTaskId] = useState(null);
    const [updateData, setUpdateData] = useState({});

    useEffect(() => {
        const getdata = async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/task/myTasks`, {
                headers: {
                    token: ref.current,
                },
            });
            if (res.data.success) {
                setTasks(res.data.tasks);
            } else {
                alert(res.data.error || "Some Error occured");
            }
        }
        getdata();
    }, [triggerUseeffect])

    const toggleStatus = async (task) => {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/task/updateTask/${task._id}`, { completed: !task.completed }, {
            headers: {
                token: ref.current,
            },
        });
        if (res.data.success) {
            setTriggerusereffect(!triggerUseeffect);
        } else {
            alert(res.data.error || "updation failed");
        };
    }

    const updateClick = async (task) => {
        setUpdateData(task);
        seteditingTaskId(task._id);
    }

    const handleChange = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }

    const updateChanges = async () => {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/task/updateTask/${updateData._id}`, { title: updateData.title, description: updateData.description }, {
            headers: {
                token: ref.current,
            },
        });
        if (res.data.success) {
            setTriggerusereffect(!triggerUseeffect);
            seteditingTaskId(null);
            setUpdateData({})

        } else {
            alert(res.data.error || "updation failed");
        };
    }

    const deleteClick = async (task) => {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/task/deleteTask/${task._id}`, {
            headers: {
                token: ref.current,
            },
        });
        if (res.data.success) {
            setTriggerusereffect(!triggerUseeffect);
        } else {
            alert(res.data.error || "Deletation failed");
        };
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                My Tasks
            </h2>

            {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found.</p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    {tasks.map((task) => (

                        <div key={task._id} className="bg-white shadow-md rounded-xl p-5 border">
                            <div className="flex items-start gap-3">

                                <input type="checkbox" checked={task.completed} onChange={() => toggleStatus(task)}
                                    className="mt-1 w-5 h-5 accent-blue-600 cursor-pointer" />

                                <div className="flex-1">

                                    <div className="flex justify-between items-start">
                                        {editingTaskId == task._id ? (
                                            <input type="text" name="title" onChange={handleChange} className="w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" value={updateData.title} />
                                        ) :

                                            (<h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>

                                                {task.title}
                                            </h3>)}
                                    </div>

                                    {editingTaskId == task._id ? (
                                        <textarea name="description" onChange={handleChange} value={updateData.description} className="w-full mt-1 border rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    ) :
                                        (<p className={`text-sm mt-1 ${task.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                                            {task.description}
                                        </p>)}

                                    {editingTaskId != task._id ? <span className={`text-sm font-medium mt-2 inline-block${task.completed ? "text-green-600" : "text-orange-500"}`}>{task.completed ? "Completed" : "Pending"}
                                    </span> : ""}

                                    {
                                        editingTaskId == task._id ? (
                                            <div className="flex justify-center">

                                                <button onClick={updateChanges} className=" bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                                                    Save changes
                                                </button>
                                            </div>
                                        ) :
                                            (<div className="flex justify-between mt-2">
                                                <button onClick={() => updateClick(task)} className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition">
                                                    Update
                                                </button>
                                                <button onClick={() => deleteClick(task)} className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition">
                                                    Delete
                                                </button>
                                            </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tasks;
