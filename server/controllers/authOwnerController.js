import Owner from "../models/owner.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const OwnerSignup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Fields are missing" });
    }

    if (password !== confirmPassword) {
        return res.status(401).json({ success: false, message: "Passwords are not same" });
    }

    const existingIser = await Owner.findOne({ email })

    if (existingIser) {
        return res.status(404).json({ success: false, message: "Owner already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newOwner = new Owner({
        name,
        email,
        password: hashedPassword,
    });

    await newOwner.save();

    res.status(201).json({
        success: true,
        message: "Owner created successfully",
        owner: { _id: newOwner._id, name: newOwner.name, email: newOwner.email },
    });

};

export const OwnerLogin = async (req, res) => {

        const { email, password } = req.body;
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(401).json({ message: "Owner not found" });
        }

        const passwordValid = await bcrypt.compare(password, owner.password);

        if (!passwordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { ownerId: owner._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            message: "Login successful!",
            token,
            owner
        });
    
};  