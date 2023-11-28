import React from "react";
import '../App.css'
import Carousel from "./Carousel";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";






const Body = () => {

  
 

    // axios.get('http://localhost:8080/books')
    //     .then(response=>{
    //       setBooks(response.data);
    //     })
    //     .catch(error=>{console.error('loding error',error);})
    

    return(

        <>
        <body className='center'>
            <div className='body-container'>

              <div className='bcontainer'>
              
              <Carousel/>

              </div>
              
            </div>
            
            
          </body>
        
        </>
    );
}

export default Body;