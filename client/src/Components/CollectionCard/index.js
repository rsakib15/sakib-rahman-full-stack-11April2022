import React, { useEffect, useState } from 'react';
import collectionLogo from '../../assets/collections.png';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline'


const CollectionCard = ({collection}) => {
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
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white rounded bg-gray-800  p-2">
                                                    <TrashIcon className="h-6 w-6 cursor-pointer mx-2 text-white" />
                                                </div>
                                    
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
    );
};

export default CollectionCard;