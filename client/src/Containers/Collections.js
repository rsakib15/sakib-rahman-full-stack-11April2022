import React, { useEffect, useState } from 'react';
import collectionLogo from '../assets/collections.png';

const Collections = (props) => {
	return(
        <div className="mcontainer ">
			<div className="flex flex-wrap">
                <div className="w-full">
                    <div>
                        <h2 class="mb-4 text-2xl text-gray-600 font-bold md:text-3xl">Collections</h2>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full p-0">
                            <div className="bg-white border-transparent rounded-lg shadow-lg">
                                <div class="bg-white rounded-lg border shadow-md px-10 dark:bg-gray-800 dark:border-gray-700">
                                    <ul role="list" class="">
                                        <li class="py-4">
                                            <div class="flex items-center space-x-4">
                                                <div class="flex-shrink-0">
                                                    <img class="w-12 border-2 h-12 rounded-full" src={collectionLogo} alt="Neil image"/>
                                                </div>
                                                <div class="flex-1 min-w-0">
                                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                Neil Sims
                                                    </p>
                                                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">SEARCH_EMAIL</p>
                                                </div>
                                                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                    SEARCH_AMOUNT
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default Collections;