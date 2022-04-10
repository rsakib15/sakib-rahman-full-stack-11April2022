const client = require("../../config/db");
const  bcrypt  =  require("bcrypt");

exports.registerController = async(req, res) => {
    const { name, email, password } =  req.body;
    if(name && email && password){
        try {
            const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [email]);
            const arr = data.rows;
            if (arr.length  !=  0) {
                return  res.status(400).json({
                    success: false,
                    msg: "Email already exists"
                });
            }
            else{
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            msg: "Error hashing password"
                        });
                    }
                    else {
                        client.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hash], (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    msg: "Error inserting data"
                                });
                            }
                            else {
                                return res.status(201).json({
                                    success: true,
                                    msg: "User created"
                                });
                            }
                        });
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: "Error registering user"
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