import reslogo from "./../../assets/restaurant-logo.png";
import React, { useEffect, useState } from 'react';
import Drawer from "Components/Drawer";
var _=require('lodash');

const RestaurantCardInfo = ({data}) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	var res_hours = data.hours;
	var result = _.groupBy(res_hours,'opening_time')
	var keys = Object.keys(result);
	var res = [];

	for(var i=0;i<keys.length;i++){
		var d = []
		for(var j=0;j<result[keys[i]].length;j++){
			d.push(result[keys[i]][j].day);
		}
		res.push({
			opening_time: keys[i],
			closing_time: result[keys[i]][0].closing_time,
			days: d
		})
	}
	const handleDrawer= () => {
        setIsDrawerOpen(!isDrawerOpen);
    }
	
	const modify12HourFormat = (time) => {
		var t = time.split(':');
		var hours = parseInt(t[0]);
		var minutes = parseInt(t[1]);
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		hours = hours < 10 ? '0'+hours : hours;
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

    return(
        <div className="flex mb-4 mr-4 bg-white rounded-lg border shadow-md sm:px-12 dark:bg-gray-800 dark:border-gray-700">
			<div className="flex-none w-60 relative">
				<img src={reslogo} alt="" className="absolute inset-0 w-full h-full object-cover" />
  			</div>
			<div className="flex-auto p-6">
				<div className="flex flex-wrap">
					<h1 className="flex-auto text-xl font-semibold">{data.name}</h1>
					<div className="w-full flex-none text-sm font-medium text-gray-500 mt-0">Restaurant</div>
				</div>
				<div className="mb-2 mt-2">
					<div className="text-sm font-medium text-gray-500">
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
									<tr className="text-center">
										<th scope="col" className="px-5 py-1">Day</th>
										<th scope="col" className="px-5 py-1">Opening Time</th>
										<th scope="col" className="px-5 py-1">Closing Time</th>
									</tr>
								</thead>
								<tbody>
									{
										res.map((item, index) => {
											return (
											<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center" key={index}>
												<td scope="row" className="px-5 py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.days.length>1 ? item.days[0] + " - " + item.days[item.days.length-1] : item.days[0]}</td>
												<td className="px-5 py-1">{modify12HourFormat(item.opening_time)}</td>
												<td className="px-5 py-1">{modify12HourFormat(item.closing_time)}</td>
											</tr>
											)
										})
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="flex space-x-3 mb-4 text-sm font-medium">
					<div className="flex-auto flex space-x-3">
						<button onClick={handleDrawer} className="lg:w-full flex items-center justify-center w-9 h-9 rounded-md bg-gray-800 hover:bg-gray-700 text-white" type="submit">Add to Collection</button>
					</div>
				</div>
			</div>
			<Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} addToCollection={true} restaurant_id={data.id}></Drawer>
        </div>
    );
}

export default RestaurantCardInfo;