const client = require("../../config/db");

exports.collectionController = async(req, res) => {
    if(req.method === "GET"){
        const {id} = req.params;
        if(id){
            const data = await client.query(`SELECT * FROM collections WHERE id = $1;`, [id]);
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
            const data = await client.query(`SELECT * FROM collections;`);
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
    }
    else if(req.method === "POST"){
        const {name, description} = req.body;
        if(name && description){
            const data = await client.query(`INSERT INTO collections (name, description) VALUES ($1, $2) RETURNING*`, [name, description]);
            const arr = data.rows;
            if(arr.length != 0){
                return res.status(201).json({
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


