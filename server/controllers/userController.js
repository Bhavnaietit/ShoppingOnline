import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// route for user login
const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({success:false,message:"User doesn't exists!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({
                success: true,
                token
            });
        }
        else {
            return res.json({success:false,message:"Invalid credentials!"})
        }
    } catch (error) {
        return res.json({ success: false, message: error });
    }
}

// route for user login
const registerUser = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name,email,password)
        const userExists = await userModel.findOne({ email });
        if (userExists) {
					return res.send({
						success: false,
						message: "User Already Registered!",
					});
				}

        // validating email & password
        if (!validator.isEmail(email)) {
            return res.send({
                success: false,
                message: "Please enter a valid email!"
            })
        }
        if (name==="" ) {
					return res.send({
						success: false,
						message: "Please enter a name!",
					});
				}
        if (password.length < 8) {
            return res.send({
							success: false,
							message: "Please enter a strong password!",
						});
        }
        //hashing passwod
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

       return res.send({ success: true, token });

    } catch (error) {
       return res.send({ success: false, message: error });
    }
}


// route for admin login
const adminLogin= async(req,res) => {
    try {
    
        const { email, password } = req.body;
        console.log(email, password);
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            return res.json({ success: true, token })
        } else {
                return res.json({success:false,message:"Invalid credentials!"})
            }
        } catch (error) {
            return res.json({ success: false, message: "wrong"});
        }
}

export  {loginUser,registerUser,adminLogin}