import React from "react";
import '../App.css'
import instagram from '../assets/svgs/instagram.svg'
import facebook from '../assets/svgs/facebook.svg'
import twitter from '../assets/svgs/twitter.svg'
import linkedin from '../assets/svgs/linkedin.svg'
import {Image} from 'react-bootstrap'



const Footer = () => {


    return (

      <>
        <footer className='footer'>
          <div className="footer-in">
                <div className='footertext'>
                
                  <div className='footer-con1'>
                    <ul className='ful'>
                        <h4 className='fli1'>Categories</h4>
                        <li className='fli'><a href='#'className='footerlink'>fantasy</a></li>
                        <li className='fli'><a href='#'className='footerlink'>horror</a></li>
                        <li className='fli'><a href='#'className='footerlink'>mystery</a></li>
                        <li className='fli'><a href='#'className='footerlink'>romance</a></li>
                        <li className='fli'><a href='#'className='footerlink'>science fiction</a></li>
                      </ul>
                  </div>
                    
                  <div className='footer-con2'>
                    <ul className='ful'>
                        <h4 className='fli1'>quick links</h4>
                        <li className='fli'><a href='/'className='footerlink'>home</a></li>
                        <li className='fli'><a href='#'className='footerlink'>shopping cart</a></li>
                        <li className='fli'><a href='#'className='footerlink'>checkouts</a></li>
                      </ul>
                  </div>   
                    
                  <div className='footer-con3'>
                    <ul className='ful'>
                      <h4 className='fli1'>infomation</h4>
                      <li className='fli'><a href='#'className='footerlink'>shipping and return policy</a></li>
                      <li className='fli'><a href='#'className='footerlink'>privacy and cookies policy</a></li>
                      <li className='fli'><a href='#'className='footerlink'>terms & conditions</a></li>
                      <li className='fli'><a href='#'className='footerlink'>payment policy</a></li>
                      <li className='fli'><a href='#'className='footerlink'>coupon t&c</a></li>
                    </ul>
                  </div>
                    
                  <div className='footer-con4'> 
                      <ul className='ful'>
                        <h4 className='fli1'>contact details</h4>
                        <li className='fli'><a href='#'className='footerlink'>panadura,kalutara</a></li>
                        <li className='fli'><a href='#'className='footerlink'>+94342048778657</a></li>
                        <li className='fli'><a href='#'className='footerlink'>bookstore@gmail.com</a></li>
                      </ul>
                  </div>
                    

                  
                </div>
                  
                <div className='footercontent'>

                      <h4 className='follow'>follow us on</h4>
                      
                    <div className='footericons'>

                      <a href='#'><Image className="face" src={facebook}></Image></a>
                      <a href='#'><Image className="insta" src={instagram}></Image></a>
                      <a href='#'><Image className="twit" src={twitter}></Image></a>
                      <a href='#'><Image className="lin" src={linkedin}></Image></a>
                    
                    </div>

                    
                  </div>

                    
          </div>   
        </footer>
        <div className="dfooter">
            <div className='coppy-right'>
              <p className='coppyright'>©Coppyright - 2023 JBOOKSHOP</p>
            </div>
        </div>
      </>
    );
}

export default Footer;