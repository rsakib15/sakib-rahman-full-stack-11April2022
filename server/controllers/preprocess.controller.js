const client = require("../../config/db");
const moment = require('moment');

function isNumber(char) {
    if (typeof char !== 'string') {
      return false;
    }
  
    if (char.trim() === '') {
      return false;
    }
  
    return !isNaN(char);
}

function processTime(time) {
    time = time.split('-');
    let start = moment(time[0].trim(),'hh:mm a').format('LT');
    let end = moment(time[1].trim(),'hh:mm a').format('LT');
    return [start.toString(),end.toString()];
}

exports.restaurantController = (req, res) => {
    console.log("On restaurantController");

    var daylist = ["Sun","Mon","Tues","Weds","Thurs","Fri","Sat"];
    client.query(`SELECT * FROM restaurants`, (err, result) => {
        for(let i = 0; i < result.rows.length; i++) {
            let schedule = result.rows[i].hours.split("/");
            for(let j=0; j<schedule.length;j++){
                let str = schedule[j].trim();
                let k = 0,day="";
                while(true){
                    if(!isNumber(str[k])){
                        day = day + str[k];
                        k++;
                    }else{
                        break;
                    }
                }
                day=day.trim();
                time = processTime(str.substring(k).trim());
            
                if(day.includes("-")){
                    let dayrange = day.split("-");
                    let start = daylist.indexOf(dayrange[0].trim());
                    let end = daylist.indexOf(dayrange[1].trim());

                    if(start > end){
                        d = daylist.slice(start,daylist.length).concat(daylist.slice(0,end+1));
                    }else{
                        d= daylist.slice(start,end+1);
                    }
                }else if(day.includes(",")){
                    d = day.split(",");
                }else{
                    d = [day];
                }

                for(let k=0; k<d.length;k++){
                    let day = d[k];
                    let start = time[0];
                    let end = time[1];

                    client.query(`INSERT INTO hours (day, opening_time, closing_time, restaurant_id) VALUES ($1, $2, $3, $4)`, [day,start,end,result.rows[i].id], (err, result) => {
                        if(err){    
                            console.log(err);
                        }
                    });
                }
            }
        }
    });
}
