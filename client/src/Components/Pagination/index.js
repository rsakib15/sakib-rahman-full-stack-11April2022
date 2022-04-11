import React from "react";

export default function Pagination({
	postsPerPage,
	totalPosts,
	paginateFront,
	paginateBack,
	currentPage,
}) {
	const showError= () =>{
		console.log("showError");
	}
	return (
		<div className='py-2'>
			<div className="flex justify-center">
				<p className='text-sm text-gray-700'>
					Showing 
					<span className='font-medium'> {currentPage * postsPerPage - 10 + 1}  </span>
					 to 
					<span className='font-medium'> {currentPage * postsPerPage} </span>
					 of
					<span className='font-medium'> {totalPosts} </span>
					 results
				</p>
			</div>
			
			<div className="flex justify-center mt-5">
				<nav className='relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
					<a onClick={() => { currentPage!=1? paginateBack():showError()}} href='#'className='relative inline-flex items-center  py-4 w-24 text-center justify-center rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'><span>Previous</span></a>
					<a onClick={() => { paginateFront();}} href='#' className='relative inline-flex items-center  py-4 w-24 text-center justify-center rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'><span>Next</span></a>
				</nav>
			</div>
		</div>
	);
}