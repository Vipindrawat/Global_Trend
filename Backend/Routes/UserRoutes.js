import express from 'express'
const router = express.Router();
import { body, validationResult } from 'express-validator'
import User from '../Models/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

router.post('/register',
    [
        body('name').notEmpty(),
        body('email').notEmpty().isEmail(),
        body('password').notEmpty()
    ], async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ success: false, error: result.array() })
            }
            else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                })
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                res.status(200).json({ success: true, token })
            }
        }
        catch (error) {
            res.status(500).json({ success: false, error: "internal server error", message: error.message });
        }
    })

router.post('/signin',
    [
        body('email').notEmpty().isEmail(),
        body('password').notEmpty()
    ], async (req, res) => {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ success: false, error: result.array() })
            }
            else {
                const user = await User.findOne({ email: req.body.email });
                if (!user) {
                    return res.status(404).json({ success: false, error: "User not found" });
                }
                const verify = await bcrypt.compare(req.body.password, user.password);
                if (!verify) {
                    return res.status(404).json({ success: false, error: "Invalid Credentials" });
                }

                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                res.status(200).json({ success: true, token })
            }
        }
        catch (error) {
            res.status(500).json({ success: false, error: "internal server error", message: error.message });
        }
    })

export default router;