import React from 'react';
import { Link } from 'react-router-dom';

const Forbiden = () => {
    return (
        <div>
            <h1>Forbider page</h1>
            <Link className='text-blue-500 hover:underline' to={'/'}>Go to Home page</Link>
        </div>
    );
};

export default Forbiden;