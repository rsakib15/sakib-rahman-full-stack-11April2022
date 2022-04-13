import React, { useEffect, useState } from 'react';
import collectionLogo from '../../assets/collections.png';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import axios from 'axios';
import { BASEURL } from 'constants/ServerData';
import ReactModal from 'react-modal';


const CollectionCard = ({collection, getAllData}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [newName, setNewName] = useState(collection.name);
    const [newDescription, setNewDescription] = useState(collection.description);

    const handleCollectionEdit = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.put(`${BASEURL}/api/collections/${collection.id}`, {
            name: newName,
            description: newDescription
        }).then(res => {
            if (res?.status === 200) {
                setShowEdit(false);
                getAllData();
            } else {
                alert('Server Error');
            }
        }).catch(err => alert('Server Error'));
    }
    const handleModal= () => {
        setNewName(collection.name);
        setNewDescription(collection.description);
        setShowEdit(!showEdit);
    }
    const handleCloseModal = () => {
        setShowEdit(false);
    }
    const handleNameChange = (e) => {
        setNewName(e);
    }
    const handleDescChange = (e) => {
        setNewDescription(e);
    }

    const handleDelete = (e) => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.delete(`${BASEURL}/api/collections/${collection.id}`)
            .then(res => {
                if (res?.status === 200) {
                    alert('Collection Deleted');
                    getAllData();
                } else {
                    alert('Server Error');
                }
            })
    }


    return (
        <div className="flex flex-wrap mb-2">
            <div className="w-full p-0">
                <div className="bg-white border-transparent rounded-lg shadow-lg">
                    <div class="bg-white rounded-lg border shadow-md px-10 dark:bg-gray-800 dark:border-gray-700">
                        <ul role="list" class="">
                            <li class="py-4">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0">
                                        <img class="w-12 border-2 h-12 rounded-full" src={collectionLogo} alt="Neil image"/>
                                                </div>
                                                <div class="flex-1 min-w-0 cursor-pointer">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{collection.name.length>20 ? collection.name.substring(0,20)+"..." : collection.name}</p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">{collection.description}</p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold rounded space-x-2">
                                                    <div className=' text-base font-semibold text-gray-900 dark:text-white rounded bg-gray-800  p-2 cursor-pointer' onClick={() => handleModal()}>
                                                        <PencilAltIcon className="h-5 w-5 mx-2 text-white"  />
                                                    </div>
                                                    <div className=' text-base font-semibold text-gray-900 dark:text-white rounded bg-orange-800 p-2 cursor-pointer' onClick={(e) => handleDelete(collection.id)}>
                                                        <TrashIcon className="h-5 w-5 mx-2 text-white"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    
                        <ReactModal
                            isOpen={showEdit}
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
                                    <input id="nameField" className="flex items-center h-12 px-4 w-96 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" value={newName} onChange={(e)=>handleNameChange(e.target.value)} />
                                    <label className="font-semibold text-xs mt-3" htmlFor="descriptionField">Description</label>
                                    <textarea id="descriptionField" className="flex items-center h-36 px-4 w-96 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="text" value={newDescription} onChange={(e)=>handleDescChange(e.target.value)}/>
                                    <div className="flex mt-6 justify-center text-xs space-x-2">
                                        <button className="flex items-center justify-center w-1/2 h-12 px-6  bg-gray-800 rounded font-semibold text-sm text-white hover:bg-gray-700" onClick={()=>handleCollectionEdit()}>Edit</button>
                                        <button className="flex items-center justify-center w-1/2 h-12 px-6  bg-orange-800 rounded font-semibold text-sm text-white hover:bg-orange-700" onClick={()=>handleCloseModal()}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </ReactModal>
                    </div>
    )
    }

export default CollectionCard;