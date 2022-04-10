const bcrypt = require("bcrypt");
const client = require("../../config/db");
const jwt = require("jsonwebtoken");

exports.loginController = async(req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try{
            const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email])
            const arr = data.rows;
            if (arr.length != 0) {
                bcrypt.compare(password, arr[0].password, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            msg: "Error comparing password"
                        });
                    }
                    else if (result) {
                        const token = jwt.sign({
                            email: arr[0].email,
                            id: arr[0].id
                        }, process.env.JWT_SECRET, { expiresIn: "1h" });
                        return res.status(200).json({
                            success: true,
                            msg: "User logged in",
                            token: token,
                            name: arr[0].name
                        });
                    }
                    else {
                        return res.status(400).json({
                            success: false,
                            msg: "Incorrect password"
                        });
                    }
                });
            }
            else{
                return res.status(400).json({
                    success: false,
                    msg: "User does not exist"
                });
            }
        }
        catch{
            return res.status(500).json({
                success: false,
                msg: "Error logging in user"
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields"
        });
    }
};