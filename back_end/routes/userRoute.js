import express from "express";
import { userLogin, userRegister } from "../controller/userController.js";
const router = express.Router();


router.route('/usersignup').post(userRegister)
router.route('/usersignin').post(userLogin)


export default router;