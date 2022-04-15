const client = require("../../config/db");
var _ = require('lodash');
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, process.env.JWT_SECRET)
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.id
    next()
}

exports.collectionController = async(req, res) => {
    if(req.method === "GET"){
        const {id} = req.params;
        if(id){
            const data = await client.query(`SELECT * FROM collections WHERE id = $1 ORDER BY id ASC;`, [id]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(200).json({
                    success: true,
                    data: arr
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    msg: "No collection found",
                    data: []
                });
            }
        }
        else{
            verifyToken(req, res, async() => {
                const {userId} = req;
                const data = await client.query(`SELECT * FROM collections WHERE created_by = $1 ORDER BY id ASC;`, [userId]);
                const arr = data.rows;
                if(arr.length != 0){
                    return res.status(200).json({
                        success: true,
                        data: arr
                    });
                }
                else{
                    return res.status(200).json({
                        success: true,
                        msg: "No collection found",
                        data: []
                    });

                }
            });
        }
    }
    else if(req.method === "POST"){
        const {name, description} = req.body;
        if(name && description){
            verifyToken(req, res, async() => {
                const {userId} = req;
                const data = await client.query(`INSERT INTO collections (name, description, created_by) VALUES ($1, $2, $3) RETURNING*`, [name, description, userId]);
                const arr = data.rows;
                if(arr.length != 0){
                    return res.status(200).json({
                        success: true,
                        data: arr
                    });
                }
                else{
                    return res.status(500).json({
                        success: false,
                        msg: "Internal Server Error"
                    });
                }
            });
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "Missing required fields"
            });
        }
    }
    else if(req.method === "PUT"){
        const {id} = req.params;
        const {name, description} = req.body;
        if(id && name && description){
            const data = await client.query(`UPDATE collections SET name = $1, description = $2, modified_on = $3 WHERE id = $4 RETURNING*`, [name, description,new Date().toISOString(), id]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(200).json({
                    success: true,
                    data: arr
                });
            }
            else{
                return res.status(404).json({
                    success: false,
                    msg: "Collection not found"
                });
            }
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "Missing required fields"
            });
        }
    }
    else if(req.method === "DELETE"){
        const {id} = req.params;
        if(id){
            await client.query(`DELETE FROM clrestaurants WHERE collection_id = $1`, [id]);
            const data = await client.query(`DELETE FROM collections WHERE id = $1 RETURNING*`, [id]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(200).json({
                    success: true,
                    data: arr
                });
            }
            else{
                return res.status(404).json({
                    success: false,
                    msg: "Collection not found"
                });
            }
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "Missing required fields"
            });
        }
    }
}


exports.collectionRestaurantController = async(req, res) => {
    if(req.method === "GET"){
        const {id} = req.params;
        if(id){
            const data = await client.query(`SELECT clrestaurants.restaurant_id, restaurants.name, hours.day, hours.opening_time, hours.closing_time
            from clrestaurants, restaurants, hours where 
            clrestaurants.collection_id=$1 and restaurants.id = hours.restaurant_id and clrestaurants.restaurant_id=restaurants.id`,[id]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(200).json({
                    success: true,
                    data: arr
                });
            }
            else{
                return res.status(200).json({
                    success: true,
                    msg: "No Restaurant found in collection",
                    data: []
                });
            }
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "Missing required fields"
            });
        }
    }
    else if(req.method === "POST"){
        const {collection_id, restaurant_id} = req.body;
        if(collection_id && restaurant_id){
            const d = await client.query(`SELECT * FROM clrestaurants WHERE collection_id = $1 AND restaurant_id = $2`, [collection_id, restaurant_id]);
            const a = d.rows;
            if(a.length != 0){
                return res.status(200).json({
                    success: true,
                    msg: "Restaurant already in this collection"

                });
            }
            const data = await client.query(`INSERT INTO clrestaurants (collection_id, restaurant_id) VALUES ($1,$2) RETURNING*`, [collection_id, restaurant_id]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(201).json({
                    success: true,
                    data: arr
                });
            }
            else{
                return res.status(500).json({
                    success: false,
                    msg: "Internal Server Error"
                });
            }
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "Missing required fields"
            });
        }
    }
    else if(req.method === "DELETE"){
        const {collection_id,restaurant_id} = req.params;
        if(collection_id && restaurant_id){
            const data = await client.query(`DELETE FROM clrestaurants WHERE collection_id=$1 and restaurant_id=$2 RETURNING*`, [collection_id,restaurant_id]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(200).json({
                    success: true,
                    data: arr
                });
            }
            else{
                return res.status(404).json({
                    success: false,
                    msg: "Collection not found"
                });
            }
        }
        else{
            return res.status(400).json({
                success: false,
                msg: "Missing required fields"
            });
        }
    }
}
