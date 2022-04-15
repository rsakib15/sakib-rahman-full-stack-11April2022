import React, { useEffect, useState } from 'react';
import Navbar from "Components/Navbar";
import RestaurantCard from "Components/RestaurantCard";
import TimePicker from "Components/TimePicker";
import Pagination from 'Components/Pagination';
import { BASEURL } from 'constants/ServerData';
import axios from 'axios';
import '../Styles/App.css';
import SearchBox from 'Components/SearchBox';

const App = (props) => {
	const [name, setName] = useState("");
	const [time, setTime] = useState("");
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
  	const [postsPerPage] = useState(10);
	  
	const getAllData = async () => {
        try {
			setIsLoading(true);
			setName("");
			setTime("");
            await axios.get(`${BASEURL}/api/restaurants/`)
                .then(res => {
                    if (res?.status === 200) {
						setIsLoading(false);
                        setRestaurants(res.data.data);
                    } else {
                        alert('Server Error');
                    }
                })
                .catch(errr => alert('Server Error'));
        } catch (error) {
            alert('server error')
        }
    };

	const getDataByName = async () => {
		try {
			setIsLoading(true);
			setTime("");
			await axios.get(`${BASEURL}/api/search/${name}`)
				.then(res => {
					if (res?.status === 200) {
						setIsLoading(false);
						setRestaurants(res.data.data);
					} else {
						alert('Error in server');
					}
				})
		} catch (error) {
			alert('server error')
		}
	};

	const getDataByTime = async () => {
		try {
			setIsLoading(true);
			setName("");
			await axios.get(`${BASEURL}/api/open/${time}`)
				.then(res => {
					if (res?.status === 200) {
						setIsLoading(false);
						setRestaurants(res.data.data);
					} else {
						alert('Error in server');
					}
				})
		} catch (error) {
			alert('server error')
		}
	};

	const getDataByNameAndTime = async () => {
		try {
			setIsLoading(true);
			await axios.get(`${BASEURL}/api/search/${name}/${time}`)
				.then(res => {
					if (res?.status === 200) {
						setIsLoading(false);
						setRestaurants(res.data.data);
					} else {
						alert('Error in server');
					}
				}
			);
		} catch (error) {
			alert('server error')
		}
	};
	const indexOfLastPost = currentPage * postsPerPage;
  	const indexOfFirstPost = indexOfLastPost - postsPerPage;
  	const currentPosts = restaurants.slice(indexOfFirstPost, indexOfLastPost);
	const paginateFront = () => setCurrentPage(currentPage + 1);
  	const paginateBack = () => setCurrentPage(currentPage - 1);

	useEffect(() => {	
		setCurrentPage(1);
		if(name && !time) getDataByName();
		else if(!name && time) getDataByTime();
		else if(name && time) getDataByNameAndTime();
		else getAllData();
	}, []);

	const handleSearch = () => {
		setCurrentPage(1);
		if(name && !time && name.trim().length > 0) getDataByName();
		else if(!name && time && time.trim().length > 0) getDataByTime();
		else if(name && time && name.trim().length > 0 && time.trim().length > 0) getDataByNameAndTime();
		else{
			handleReset()
		}
	};

	const handleReset = () => {
		setCurrentPage(1);
		setName("");
		setTime("");
		getAllData();
	};

	const handleSearchBoxChange = (e) => {
		setName(e);
	};
	const handleTimeChange = (e) => {
		setTime(e);
	};

	return(
		<div>
			<div className="mcontainer ">
				<div className="flex flex-wrap">
					{
						isLoading ? <div className="w-full lg:w-3/4"><div className="text-center">Loading...</div></div> : restaurants.length > 0 ?
						<div className="w-full lg:w-3/4">
							<div>
								<h2 className="mb-4 text-2xl text-gray-600 font-bold md:text-3xl">Restaurants</h2>
							</div>
							<RestaurantCard restaurants={currentPosts} /> 
							<Pagination
							postsPerPage={postsPerPage}
							totalPosts={restaurants.length}
							paginateBack={paginateBack}
							paginateFront={paginateFront}
							currentPage={currentPage}
							/>
						</div>: <div className="w-full lg:w-3/4"><div className="text-center">No results found</div></div>
					}
					<div className="w-full lg:w-1/4">
						<SearchBox name={name} onChange={handleSearchBoxChange}/>
						<TimePicker time={time} onChange={handleTimeChange}/>
						<div className="flex-auto flex space-x-3 mt-5">
							<button className="lg:w-1/2 flex items-center justify-center w-9 h-9 rounded-md bg-black text-white" onClick={()=>handleSearch()}>SEARCH</button>
							<button className="lg:w-1/2 flex items-center justify-center w-9 h-9 rounded-md bg-slate-100 text-black" onClick={()=>handleReset()}>RESET</button>
						</div>

					</div>
				</div>
			</div>
		</div>
	
	);
}

export default App;