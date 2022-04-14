import CollectionRestaurantCardInfo from "./CollectionRestaurantCardInfo";

import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from '../../constants/ServerData';
var _=require('lodash');

const CollectionRestaurantCard = ({collection}) => {
	const [restaurants, setRestaurants] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const getAllData = async () => {
        try {
            setIsLoading(true);
            setRestaurants([]);
            await axios.get(`${BASEURL}/api/collections/${collection.id}`)
                .then(res => {
                    if (res?.status === 200) {
                        setIsLoading(false);
                        if(res.data.data.length > 0){
                            var d = _(res.data.data).groupBy('restaurant_id').value();
                            setRestaurants(d);
                        }
                        else{
                            setRestaurants([]);
                        }
                    } else {
                        alert('Server Error');
                    }
                })
        } catch (error) {
            alert('server error')
        }
    };

    useEffect(() => {
        getAllData();
    }, []);
	return(
		<div>
			<div className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full p-8">
                <div className="flex justify-between items-center">
                    <div className=''>
                        <h3 className="font-bold text-red-800 text-lg">{collection.name}</h3>
                        <p className="text-gray-600 text-sm">{collection.description}</p>
                    </div>
                    <div className=''>
                        <p className="text-gray-600 text-sm">Total Restaurant: {Object.entries(restaurants).length}</p>
                    </div>
                </div>
                {
					Object.entries(restaurants).map(([key, value]) => {
						return(
							<CollectionRestaurantCardInfo key={key} data={value} />
						)
					})
				}
            </div>
			
		</div>
	)
}

export default CollectionRestaurantCard;