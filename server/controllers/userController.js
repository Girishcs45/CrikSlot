import User from "../models/user.js";

export const FetchUser = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(404).json({ success: false, message: "Id not comming" })
    }

    const user = await User.findOne({ _id: id })

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" })
    }

    return res.status(200).json({ success: true, message: "User found", user })
};

export const EditUser = async (req, res) => {
    const {formData} = req.body;

    console.log(formData)

    if (!formData) {
        return res.status(404).json({ success: false, message: "Fields are missing" })
    }

    const updatedUser = await User.findByIdAndUpdate(formData?.userid,
        {$set : formData},
        {new : true}
    )

    console.log(updatedUser)

    if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found" })
    }

    return res.status(201).json({
        success:true,
        message:"User updated successfully",
        newUser : updatedUser
    });
}