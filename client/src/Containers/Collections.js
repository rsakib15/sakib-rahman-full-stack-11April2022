import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASEURL } from 'constants/ServerData';
import axios from 'axios';
import CollectionCard from 'Components/CollectionCard';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'
import ReactModal from 'react-modal';

const Collections = (props) => {
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [collectionDescription, setCollectionDescription] = useState("");
    const navigate = useNavigate();


    const getAllData = async () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        try {
            setIsLoading(true);
            await axios.get(`${BASEURL}/api/collections/`)
                .then(res => {
                    if (res?.status === 200) {
                        setIsLoading(false);
                        setCollections(res.data.data);
                        console.log(Collections);
                    } else {
                        alert('Server Error');
                    }
                })
                .catch(errr => alert('Server Error'));
        } catch (error) {
            alert('server error')
        }
    };

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllData();
        }
        
        
    }, []);

    const handleModal= () => {
        setShowModal(!showModal);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleNameChange = (e) => {
        setCollectionName(e);
    }

    const handleDescChange = (e) => {
        setCollectionDescription(e);
    }


    const handleCreateCollection = () => {
        if(collectionName === "" || collectionDescription === ""){
            alert("Please fill all the fields");
            setShowModal(false);
            setCollectionName("");
            setCollectionDescription("");
            return;
        }else{
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.post(`${BASEURL}/api/collections/`, {
                name: collectionName,
                description: collectionDescription
            })
            .then(res => {
                console.log(res.status);
                if(res.status === 200){
                    setShowModal(false);
                    setCollectionName("");
                    setCollectionDescription("");
                    getAllData();
                }else if(res.status === 401){
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    navigate('/login');
                }
                else{
                    alert('Server Error');
                }
            })
            .catch(err => {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                navigate('/login');
            });
        }
    }

	return(
        <div className="mcontainer ">
			<div className="flex flex-wrap">
                {
                    localStorage.getItem('token') ? <div className="w-full">
                    <div className="flex flex-wrap space-x-reverse justify-between">
                        <h2 class="mb-4 text-2xl text-gray-600 font-bold md:text-3xl">Collections</h2>
                        <button onClick={() => handleModal()} className="lg:w-1/6 flex items-center justify-center w-8 h-8 rounded-md bg-gray-800 text-white p-5" type="submit">
                            <PlusCircleIcon className="h-6 w-6 cursor-pointer mx-2 text-white" />Add New
                        </button>
                    </div>
                    {
                        collections.length===0 ? <div className="flex mt-32 text-center justify-center items-center">
                        <div className=''>
                            <h3 className="text-2xl font-bold text-red-800">No Collections Found</h3>
                        </div>
                        </div>:
                        collections.map((collection, index) => {
                            return <CollectionCard collection={collection} key={index} getAllData={getAllData} />
                        })
                    }
                    
                </div>: <div className="flex  h-screen w-screen text-center justify-center items-center">
                    <div className=''>
                     You are not logged in. Please <Link to="/login" className='text-blue-600'>Login</Link> or <Link to="/register" className='text-blue-600'>Register</Link> to continue
                    </div>
                </div>
                }
                
            </div>
            <div>
            <ReactModal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                ariaHideApp={false}
                style={{
                    content: {
                        top: '15%',
                        left: '34%',
                        right: '34%',
                        bottom: '15%',
                    },
                    overlay:{
                        backgroundColor: 'rgba(0,0,0,0.5)'
                    }
                }}
            >
                <div className="flex flex-col items-center justify-center mt-8 text-gray-700">
                    <div className="flex flex-wrap space-x-reverse justify-between">
                        <h2 class="mb-4 text-2xl text-gray-600 font-bold md:text-3xl">Create new collection</h2>
                    </div>
                    <div className="flex flex-col justify-center bg-white rounded ">
                        <label className="font-semibold text-xs" htmlFor="nameField">Name</label>
                        <input id="nameField" className="flex items-center h-12 px-4 w-96 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" onChange={(e)=>handleNameChange(e.target.value)} />
                        <label className="font-semibold text-xs mt-3" htmlFor="descriptionField">Description</label>
                        <textarea id="descriptionField" className="flex items-center h-36 px-4 w-96 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" onChange={(e)=>handleDescChange(e.target.value)}/>
                        <div className="flex mt-6 justify-center text-xs space-x-2">
                            <button className="flex items-center justify-center w-1/2 h-12 px-6  bg-gray-800 rounded font-semibold text-sm text-white hover:bg-gray-700" onClick={()=>handleCreateCollection()}>Create</button>
                            <button className="flex items-center justify-center w-1/2 h-12 px-6  bg-orange-800 rounded font-semibold text-sm text-white hover:bg-orange-700" onClick={()=>handleCloseModal()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </ReactModal>
           
            
        </div>
        </div>
	);
}

export default Collections;