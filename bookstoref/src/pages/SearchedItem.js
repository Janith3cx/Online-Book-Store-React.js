import React, { useEffect, useState } from "react";
import '../App.css'
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Form, FormGroup, Image } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";



const SearchedItem = ()=>{

    const [sugBooks,setSugBooks] = useState([]);
    const{query} = useParams();


    useEffect(()=>{

        const suggestedBooks = async ()=>{

            try {
                const response = await axios.get(`http://localhost:8080/search?query=${query}`);
          
                  if(response.status===200){
          
                    setSugBooks(response.data);
                  }
                } catch (error) {
                  console.error('Error fetching suggestions:', error);
                }
        
    
        }
        
        suggestedBooks();

    },[query])

    

    return(
    <>
        
    <div>
        <Header/>
        
    </div>  
            <div className="searchedholder">
            { sugBooks.length === 0 ? (
                <div className="gobacksearched">
                <h3 className="booksnotfound">No books found for your search query.</h3>
                <div className="gobacklink">
                    <Link className="gobackli" to={'/'}><Button className="searched-more-butt" variant="dark">Search More</Button></Link>
                </div>
                
                </div>
                    
            ) : (
                    sugBooks.map((book) => (
                        <Link className="searched-pre" to={`/books/${book.id}`}>
                          <FormGroup className="searched-holder">
                           <div className="searched-formset">
                            <div className="searched-inner-div">
                             <Form className='searched-form'>
                               <div key={book.id}>
                                   <Image className="searched-holder-image" src={`data:image/png;base64,${book.image}`} alt=""/>
                                   <div className="searched-text">
                           
                                       <h5>{book.title}</h5>
                                       <h6>{book.author.authorName}</h6>
                                       <h6>Rs:{book.price}.00</h6>
                                       <h6>{book.isbnNumber}</h6>
                                       <h6>{book.description}</h6>
                                       <h6 style={{ textTransform: 'capitalize' }}>{book.category.name}</h6>
                                       <h6 style={{ textTransform: 'capitalize' }} className="des">{book.subcategory.name}</h6>
                                   </div>
                               </div>
                              </Form>
                             </div>
                            </div>
                          </FormGroup>
                        </Link>
                    ))

                )
               }
            
            
            
            
            </div>

            <div className="">

            </div>
        
        <div>
               <Footer/>
        
        </div>  
    </>
    );
}
export default SearchedItem;