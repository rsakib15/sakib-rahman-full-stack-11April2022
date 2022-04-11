import RestaurantCardInfo from "./RestaurantCardInfo";
const RestaurantCard = (data) => {
	const { restaurants } = data;
	return(
		<div>
			{
				restaurants.map((item, index) => {
					return <RestaurantCardInfo key={index} data={item} />
				})
			}
		</div>	
	);
}

export default RestaurantCard;