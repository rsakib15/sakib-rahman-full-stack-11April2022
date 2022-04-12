import reslogo from "./../../assets/restaurant-logo.png";

var _=require('lodash');

const RestaurantCardInfo = ({data}) => {
	var daylist = ["Sun","Mon","Tues","Weds","Thurs","Fri","Sat"];
	var today = new Date();
	var res_hours = data.hours;
	var res_hours_today = _.groupBy(res_hours,'opening_time')
	var result = _.groupBy(res_hours,'opening_time')
	console.log(result)


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
	console.log(res);


    return(
        <div className="flex mb-4 mr-4 shadow-lg">
			<div className="flex-none w-60 relative">
				<img src={reslogo} alt="" className="absolute inset-0 w-full h-full object-cover" />
  			</div>
			<form className="flex-auto p-6">
				<div className="flex flex-wrap">
					<h1 className="flex-auto text-xl font-semibold">{data.name}</h1>
					<div className="text-xl font-semibold text-gray-500">
						{
							daylist[today]==data.opening_time < Date.now() ? <span className="text-rose-500">Closed</span> : data.closing_time > Date.now() ? <span className="text-green-800">Open</span> : <span className="text-rose-500">Closed</span>
						}
					</div>
					<div className="w-full flex-none text-sm font-medium text-gray-500 mt-0">Restaurant</div>
				</div>
				<div className="flex items-baseline mt-4 mb-6">
					<div className="text-sm font-medium text-gray-500">
						<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
							<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-10 py-1">Day</th>
										<th scope="col" className="px-10 py-1">Opening Time</th>
										<th scope="col" className="px-10 py-1">Closing Time</th>
									</tr>
								</thead>
								<tbody>
									{
										res.map((item, index) => {
											return (
											<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
												<td scope="row" className="px-14 py-1 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.days.length>1 ? item.days[0] + " - " + item.days[item.days.length-1] : item.days[0]}</td>
												<td className="px-14 py-1">{item.opening_time}</td>
												<td className="px-14 py-1">{item.closing_time}</td>
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
						<button className="lg:w-1/2 flex items-center justify-center w-9 h-9 rounded-md bg-black text-white" type="submit">Add to Collection</button>
						<button className="lg:w-1/2 flex items-center justify-center w-9 h-9 rounded-md bg-slate-100 text-black" type="submit">Show Hours</button>
					</div>
				</div>
			</form>
        </div>
    );
}

export default RestaurantCardInfo;