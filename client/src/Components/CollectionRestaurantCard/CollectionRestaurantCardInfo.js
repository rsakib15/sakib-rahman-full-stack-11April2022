import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import { BASEURL } from "../../constants/ServerData";

const CollectionRestaurantCardInfo = ({key, data, collection}) => {
    console.log(key)
    const handleDelete = (e) => {
        axios.delete(`${BASEURL}/api/collections/${collection.id}/${data[0].restaurant_id}`)
            .then(res => {
                if (res?.status === 200) {
                    alert('Deleted');
                    
                } else {
                    alert('Server Error');
                }
            }
        ).catch(err => {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            alert('You are not logged in');
            navigate('/login');
        });
    }
    return(
        <div className="flex bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 p-3">
				<div className="flex-auto">
					<div className="flex flex-wrap">
						<h1 id={data[0].id} className="flex-auto text-xl font-semibold">{data[0].name}</h1>
                        <div>
                            <TrashIcon className="cursor-pointer text-gray-500 w-6 h-6" onClick={() => handleDelete(data[0].restaurant_id)} />
                        </div>
					</div>
				</div>
			</div>
    );
}

export default CollectionRestaurantCardInfo;