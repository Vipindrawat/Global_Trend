import express from 'express'
const router = express.Router();
import Task from '../Models/TaskModel.js'
import { body, validationResult } from 'express-validator'

router.get('/myTasks', async (req, res) => {
    try {

        const id = req.user.id;
        let obj = { user: id };

        if (req.query.search?.trim()) {
            obj.$or =
                [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { description: { $regex: req.query.search, $options: "i" } }
                ]
        }

        if (req.query.status) {
            obj.status = req.query.status;
        }

        const tasks = await Task.find(obj);
        res.status(200).json({ success: true, tasks });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "internal server error", message: error.message });

    }
})

router.post('/addTask', [
    body('title').notEmpty(),
    body('description').notEmpty()
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, error: result.array() })
        }
        await Task.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        })
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(500).json({ success: false, error: "internal server error", message: error.message });
    }
})

router.put('/updateTask/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, error: "Task not found" });
        }

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, error: "Not allowed" });
        }

        if (req.body.title?.trim()) task.title = req.body.title.trim();
        if (req.body.description?.trim()) task.description = req.body.description.trim();
        if (req.body.status?.trim()) task.status = req.body.status.trim();
        if (req.body.completed) task.completed = req.body.completed;


        await task.save();
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(500).json({ success: false, error: "internal server error", message: error.message });
    }
})


router.delete('/deleteTask/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ success: false, error: "Task not found" });
        }
        if (task.user.toString() != req.user.id) {
            return res.status(401).json({ success: false, error: "Not allowed" });
        }
        await task.deleteOne()
        res.status(200).json({ success: true })
    }
    catch (error) {
        res.status(500).json({ success: false, error: "internal server error", message: error.message });
    }
})


export default router;