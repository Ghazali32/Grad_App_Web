import React from 'react';

const NoDataCard = ({ data }) => {
    return (
        <div className="flex justify-center items-center p-8 w-full">
            <h6 className="text-lg font-bold text-primary-500">
                {data}
            </h6>
        </div>
    );
};

export default NoDataCard;
