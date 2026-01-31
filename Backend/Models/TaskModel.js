import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
},
    {
        timestamps: true
    }
)

const TaskModel = mongoose.model('Task', TaskSchema);
export default TaskModel;

