import React, { useEffect, useState } from 'react';

const TimePicker = ({time, onChange}) =>{
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ap, setAP] = useState("");


    useEffect(() => {
        if(time){
            const l = time.split(":");
            setHour(l[0]);
            setMinute(l[1].split(" ")[0]);
            setAP(l[1].split(" ")[1]);
        }
        else{
            setHour("");
            setMinute("");
            setAP("");
        }
    }, [time]);


    const handleChange = (e) => {
        if(e.target.id=="hour"){
            onChange(`${e.target.value}:${minute} ${ap}`);
            setHour(e.target.value);
        }
        else if(e.target.id=="minute"){
            setMinute(e.target.value);
            onChange(`${hour}:${e.target.value} ${ap}`);
        }
        else if(e.target.id=="ap"){
            setAP(e.target.value);
            onChange(`${hour}:${minute} ${e.target.value}`);
        }
    };


    return (
        <div className="container mx-auto justify-center">
            <div className="flex flex-wrap mb-2 w-full">
                <div className="w-full">
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <div className="text-lg">
                                Opening Time
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inline-flex text-lg border rounded-md shadow-lg w-full justify-center">
                <select name="hour" id="hour" className="outline-none appearance-none bg-transparent text-center px-4 py-2" onChange={handleChange} value={hour}>
                    <option value="0">Hour</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                <span className="px-4 py-2">:</span>
                <select name="minute" id="minute" className="outline-none appearance-none bg-transparent text-center px-4 py-2" onChange={handleChange} value={minute}>
                    <option value="0">Minute</option>
                    <option value="00">00</option>
                    <option value="05">05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                </select>
                <select name="ap" id="ap" className="outline-none appearance-none text-center px-4 py-0" onChange={handleChange} value={ap}>
                    <option value="0">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
        </div>
    )
}

export default TimePicker;