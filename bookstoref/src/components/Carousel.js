import React from "react";
import '../App.css';
import { useState , useEffect} from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import BookHolder from "./BookHolder";
import { Link} from "react-router-dom";
import Bookpreview from "../pages/Bookpreview";
import { CartContext } from "../CartContext";





const Carousel = ()=> {

  const [books1, setBooks1] = useState(null);
  const [books2, setBooks2] = useState(null);
  const [books3, setBooks3] = useState(null);
  const [books4, setBooks4] = useState(null);
  const [books5, setBooks5] = useState(null);
  


  useEffect(() =>{

      const loadData = async () => {
        

        try {
          for(let x=1;x<6;x++){
            const response = await axios.get(`http://localhost:8080/books/category/${x}`);

            if(x==1 &&response.status === 200){
              setBooks1(response.data);
            }

            if(x==2 &&response.status === 200){
              setBooks2(response.data);
            }


            if(x==3 &&response.status === 200){
              setBooks3(response.data);
            }

            if(x==4 &&response.status === 200){
              setBooks4(response.data);
            }

            if(x==5 &&response.status === 200){
              setBooks5(response.data);
            }



          }
          

         
        } catch (error) {
          console.error('Error Found No Books',error);
        }
      
         
       
          
      };

      loadData();
         



  }, []);
  

  var settings = {
    infinite:true,
    speed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1700,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
         
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [selectedItem,setSelectedItem] = useState(null);
  

  

    return (
        <>

        <div className="xtras"></div>
        <div className="carousel" >
           
            <div className="slide" >
              

            {
                  books1 ? (
                    (
                      
                      <div>
                      <Slider {...settings}>
                        
                        {books1.map((book) => (
                          <>
                            <div key={book.id} className="slider-in">
                              <BookHolder book={book}/>
                            </div>

              
                            </>
                        ))} 
                        
                        </Slider>
                        
                        </div>
                        
                    )
                  ) : 'No Books'
                        
                }
                
            </div>
            
        </div>

          <div className="xtra"></div>

        <div className="carousel">
                    
            <div className="slide">

            {
                  books2 ? (
                    (
                      
                      <div>
                      <Slider {...settings}>
                        
                        {books2.map((book) => (
                          <>
                            
                            <div key={book.id} className="slider-in">
                              <BookHolder book={book}/>
                            </div>

                            </>
                        ))} 
                        
                        </Slider>
                        
                        </div>
                        
                    )
                  ) : 'No Books'
                        
                }
      

            </div>
                    
        </div>

        <div className="xtra"></div>

        <div className="carousel">
                    
            <div className="slide">
                
            {
                  books3 ? (
                    (
                      
                      <div>
                      <Slider {...settings}>
                        
                        {books3.map((book) => (
                          <>
                            
                            <div key={book.id} className="slider-in">
                              <BookHolder book={book}/>
                            </div>

                            </>
                        ))} 
                        
                        </Slider>
                        
                        </div>
                        
                    )
                  ) : 'No Books'
                        
                }
           
        
               
            </div>
                
        </div>

        <div className="xtra"></div>

          <div className="carousel">
                    
            <div className="slide">
                
            {
                  books4 ? (
                    (
                      
                      <div>
                      <Slider {...settings}>
                        
                        {books4.map((book) => (
                          <>
                            
                            <div key={book.id} className="slider-in">
                              <BookHolder book={book}/>
                            </div>

                            </>
                        ))} 
                        
                        </Slider>
                        
                        </div>
                        
                    )
                  ) : 'No Books'
                        
                }
           
            
                
            </div>
            
          </div>

          <div className="xtra"></div>

          <div className="carousel">
                    
            <div className="slide">
                
            {
                  books5 ? (
                    (
                      
                      <div>
                      <Slider {...settings}>
                        
                        {books5.map((book) => (
                          <>
                            
                            <div key={book.id} className="slider-in">
                              <BookHolder book={book}/>
                            </div>


                            </>
                        ))} 
                        
                        </Slider>
                        
                        </div>
                        
                    )
                  ) : 'No Books'
                        
                }
           
            
                
            </div>
            
          </div>

          <div className="xtrae"></div>
    </>
    );

}
export default Carousel;