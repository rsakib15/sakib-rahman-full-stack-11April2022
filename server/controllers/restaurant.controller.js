const client = require("../../config/db");
var _ = require('lodash');

function processQueryData(queryData) {
    var result = _(queryData).groupBy('id').map(function(restaurant, id) {
        return {
            id: id,
            name: restaurant[0].name,
            hours: restaurant.map(function(restaurant) {
                return {
                    day: restaurant.day,
                    opening_time: restaurant.opening_time,
                    closing_time: restaurant.closing_time
                }
            })
        };
    }).value();

    return result;
}

exports.restaurantController = async(req, res) => {
    const {id} = req.params;
    if (id) {
        const  data = await client.query(`SELECT restaurants.id, restaurants.name, hours.day, 
        hours.opening_time, hours.closing_time FROM restaurants,hours WHERE 
        hours.restaurant_id=restaurants.id AND restaurants.id = $1;`, [id]);
        const arr = data.rows;
        if (arr.length !=  0) {
            return res.status(200).json({
                success: true,
                data: processQueryData(arr)
            });
        }
        
    }
    else{
        const data = await client.query(`SELECT restaurants.id, restaurants.name, hours.day, 
        hours.opening_time, hours.closing_time FROM restaurants, hours WHERE hours.restaurant_id=restaurants.id;`);
        const arr = data.rows;
    
        if (arr.length != 0) {
            return res.status(200).json({
                success: true,
                data: processQueryData(arr)
            });
        }
        else{
            return res.status(404).json({
                success: false,
                msg: "Restaurant not found"
            });
        }
    }
}

exports.restaurantSearchController = async(req, res) => {
    const {name} = req.params;
    if (name) {
        const n = name.toLowerCase();
        const data = await client.query(`SELECT restaurants.id, restaurants.name, hours.day, 
        hours.opening_time, hours.closing_time FROM restaurants,hours WHERE 
        hours.restaurant_id=restaurants.id AND lower(restaurants.name) LIKE '%${n}%';`);
        const arr = data.rows;
        if (arr.length  !=  0) {
            return  res.status(200).json({
                success: true,
                data: processQueryData(arr)
            });
        }
        else{
            return res.status(200).json({
                success: true,
                msg: "No Restaurant found",
                data: []
            });
        }
        
    }else{
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields"
        });
    }
}


exports.restaurantOpenTimeController = async(req, res) => {
    const {time} = req.params;
    if(time){
        const data =  await client.query(`SELECT restaurants.id, restaurants.name, hours.day, 
            hours.opening_time, hours.closing_time FROM  restaurants,hours WHERE hours.restaurant_id=restaurants.id 
            AND hours.opening_time = $1`, [time]
        );
        const arr =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(200).json({
                success: true,
                data: processQueryData(arr)
            });
        }
        else{
            return res.status(200).json({
                success: true,
                msg: "No Restaurant found in this opening time",
                data: []
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields"
        });
    }
}

exports.restaurantNameTimeController = async(req, res) => {
    const {name, time} = req.params;
    if(name && time){
        const n = name.toLowerCase();
        const  data  =  await client.query(`SELECT restaurants.id, restaurants.name, hours.day, 
            hours.opening_time, hours.closing_time FROM  restaurants,hours WHERE hours.restaurant_id=restaurants.id 
            AND hours.opening_time = '${time}' AND lower(restaurants.name) LIKE '%${n}%';`);
        const  arr  =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(200).json({
                success: true,
                data: processQueryData(arr)
            });
        }
        else{
            return res.status(200).json({
                success: true,
                msg: "No Restaurant found in this name and opening time",
                data: []
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            msg: "Please fill all the fields"
        });
    }
}
