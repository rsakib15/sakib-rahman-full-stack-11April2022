import React, { useEffect, useState } from 'react';

const SearchBox = ({ onChange, name }) => {
    const [text, setText] = useState("");

    const search = (event) => {
        setText(event.target.value);
        onChange(text);
    }

    return (
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
                    <label htmlFor="search" className="form-label inline-block mb-2 text-gray-700 text-lg">Search</label>
                    <input
                        type="search"
                        className=" form-control block w-full px-3 py-2.5 text-base font-normal text-gray-700 bg-white 
                            bg-clip-padding border border-solid border-gray-300 transition ease-in-out
                            -m-0 focus:text-gray-800 focus:bg-white focus:border-gray-800 focus:outline-none"
                        id="searchbox"
                        name="searchbox"
                        placeholder="Type Restaurant Name"
                        onChange={(e) => { onChange(e.target.value) }}
                        value={name}
                    />
                </div>
            </div>
    );

}

export default SearchBox;