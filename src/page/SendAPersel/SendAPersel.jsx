import React from 'react';
import { useForm } from 'react-hook-form';

const SendAPersel = () => {
    const {register,handleSubmit,formState:{errror}} =useForm()
    return (
        <div>
            <h1>Send parcel</h1>
            <form action="">
                <div className="">
                    <div className="">
                        
                    </div>
                    <div className=""></div>
                </div>
                <div className="">
                    <div className=""></div>
                    <div className=""></div>
                </div>
            </form>
        </div>
    );
};

export default SendAPersel;