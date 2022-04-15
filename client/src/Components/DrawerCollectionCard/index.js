import { useEffect, useState } from "react";
import axios from 'axios';
import { BASEURL } from 'constants/ServerData';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const DrawerCollectionCard = ({restaurant_id}) => {
    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getAllCollection = () => {
        setIsLoading(true);
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get(`${BASEURL}/api/collections/`)
            .then(res => {
                if (res.status === 200) {
                    setCollection(res.data.data);
                    setIsLoading(false);
                    console.log("Collection",collection);
                } else {
                    alert('Server Error');
                }
            })
            .catch(err => {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                alert('You are not logged in');
                navigate('/login');
            });
    };

    const handleAddCollection = (collection_id) => {
        console.log("Add Collection");
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post(`${BASEURL}/api/clrestaurants/`, {
            'restaurant_id': restaurant_id,
            'collection_id': collection_id
        }).then(res => {

            if (res.status === 201) {
                alert("Add Collection Success");
                
            } 
            else if (res.status === 200) {
                alert(res.data.msg);
            }
            else {
                alert('Server Error');
            }
        }).catch(err => {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            alert('You are not logged in');
            navigate('/login');
        });
    };

    useEffect (() => {
        if(localStorage.getItem('token')){
            getAllCollection();
        }
    }, []);

    return (
        <div>
			<div className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full p-8">
                <div>
                    <div className="flex justify-between items-center">
                        <div className=''>
                            <h3 className="font-bold text-red-800 text-lg">Collections</h3>
                        </div>
                    </div>
                </div>
                {
                   localStorage.getItem('token') ? collection.length===0 ? <div className="flex mt-32 text-center justify-center items-center">
                        <div className=''>
                            <h3 className="text-2xl font-bold text-red-800">No Collections Found</h3>
                        </div></div>: 
                                
                                collection.map((collection, index) => {
                                return (
                                        <div className="flex flex-wrap w-full">
                                        <div className="bg-white border-transparent rounded-lg shadow-lg w-full">
                                            <div className="bg-white rounded-lg border shadow-md px-5 dark:bg-gray-800 dark:border-gray-700">
                                            <ul role="list">
                                                <li className="py-2">
                                                    <div className="flex flex-wrap items-center justify-between ">
                                                        <div className="flex-1 min-w-0 cursor-pointer">
                                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{collection.name}</p>
                                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{collection.description}</p>
                                                        </div>
                                                        <div onClick={()=>handleAddCollection(collection.id)}>
                                                            <button class="flex items-center justify-center w-14 h-9 rounded-md bg-gray-800 hover:bg-gray-700 text-white" type="submit">
                                                                Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                )
                        }): <div className="flex text-center justify-center items-center">
                            <div className=''>
                                You are not logged in. Please <Link to="/login" className='text-blue-600'>Login  </Link> to continue
                            </div>
                        </div>
                    
                }  
            </div>
			
		</div>
    );
}

export default DrawerCollectionCard;