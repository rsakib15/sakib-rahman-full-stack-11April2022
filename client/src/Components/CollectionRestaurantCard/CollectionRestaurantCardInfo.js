
const CollectionRestaurantCardInfo = ({key, data}) => {
    return(
        <div className="flex bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 p-3">
				<div className="flex-auto">
					<div className="flex flex-wrap">
						<h1 id={data[0].id} className="flex-auto text-xl font-semibold">{data[0].name}</h1>
					</div>
					<div className="flex items-baseline">
					<div className="text-sm font-medium text-gray-500 w-full">
						<div className="relative overflow-x-auto">
                        <div>
							<p>{data.length>1 ? data[0].day + " - " + data[data.length-1].day : data[0].day } : 
                             {data.length>1 ? " " + data[0].opening_time + " - " + data[data.length-1].closing_time : " " + data[0].opening_time}</p>
							</div>
						</div>
					</div>
				</div>
				</div>
			</div>
    );
}

export default CollectionRestaurantCardInfo;