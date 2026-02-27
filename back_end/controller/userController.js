import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userRegister = async (req, res) => {
    try {

        const { name, age, email, password } = req.body;
        if (!name || !age || !email || !password) {
            return res.json({
                status: false,
                message: "Required Field Are Missing"
            })
        }

        const isUserExist = await UserModel.findOne({ email });
        // console.log(isUserExist); /// yahan araha hai emty arry exist email per bhi 
        if (isUserExist) {
            return res.json({
                status: false,
                message: "Email Already Exist" // vaule false par y return hoaraha har bar
            })
        }
        const hash = await bcrypt.hash(password, 10);

        const user = await UserModel.create({ ...req.body, password: hash });
        res.json({
            status: true,
            message: "User Created",
            data: user
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }



}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                status: false,
                message: "Required Field Are Missing"
            })
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json({
                status: false,
                message: "Email Password Invalid"
            })
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({
                status: false,
                message: "Email Password Invalid"
            })
        }
        const PRIVATE_KEY = "ibrar"
        const loginUserId = { _id: user._id }
        const token = jwt.sign(loginUserId, PRIVATE_KEY, { expiresIn: "24h" })
        res.json({
            status: true,
            message: "User Successfully Login",
            data: user,
            token
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }
}