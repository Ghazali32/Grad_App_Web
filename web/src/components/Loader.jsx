import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-full w-full p-4">
            <BiLoaderAlt className="animate-spin text-primary-500 text-4xl" />
        </div>
    );
};

export default Loader;
