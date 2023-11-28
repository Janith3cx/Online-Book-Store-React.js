import React from "react";
import graterthan from '../assets/svgs/graterthan.svg'
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

const DetailsSubmitted = () =>{


    return(

        <>
            <div className="detailsubmit">
                <h1 className="detailsubmit-text">your details added successfully we'll contact you soon. </h1>
        
                <div className="continuecheckout">
                    
                    <Link className='continueshopping' to={'/'}><h2>Continue Shopping<Image className='graterthan1' src={graterthan}></Image><Image className='graterthan2' src={graterthan}></Image></h2></Link>
        
                </div>

            </div>
        </>
    )

}
export default DetailsSubmitted;