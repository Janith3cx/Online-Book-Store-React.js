import React, { useContext, useEffect, useState } from "react";
import '../App.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer'
import { Alert, Button, Image } from "react-bootstrap";
import addedmarkgeen from '../assets/svgs/addedmarkgeen.svg'








const Bookpreview =()=>{

  const {id} = useParams();

  // const cartItem = useContext(CartContext);
 
  // const productQuantity = cartItem.getProductQuantity(id);
    // console.log(cartItem);
  const [cartItem,setCartItem] = useState(null);
  const [cartBook,setCartBook] = useState(null);
  const [cartQuantity,setCartQuantity] = useState(1);
  const [userIDFromDatabase,setUserIDFromDatabase] = useState(null);
  const token = localStorage.getItem('token');
  const [message, setMessage] = useState('');
  const [addmessage, setAddMessage] = useState('');
  const [checkQunatity,setCheckQunatity] = useState(null);
  const navigate = useNavigate();


  console.log(id);

    useEffect( ()=>{
      const loadBook = async () =>{

        try {
         const response = await axios.get(`http://localhost:8080/books/${id}`)
        
         console.log(response.price); 
         console.log(response.data); 
         if(response.status === 200){
          setCartBook(response.data);

         }
        } catch (error) {
          console.errore(error);
        }
      }
      loadBook();

    },[id]);
  
    const [isVisibleCheckout,setIsVisibleCheckout] = useState(false);

  
    useEffect(()=>{

      const cartData = async()=>{
        try {
          const response = await axios.get("http://localhost:8080/cartitem")

          if(response.status==200){

              setCartItem(response.data);
              console.log("qunatity ",response.data);
          }

        } catch (error) {
          console.error('Error fetching cart data:', error);
      }
      }

      cartData();
  },[cartItem])

 
  const usernameByLocal = localStorage.getItem('username');

  // console.log("username : ",usernameByLocal);

  useEffect(()=>{
    const loadUserId = async () =>{
      try {
        const response = await axios.get(`http://localhost:8080/id/${usernameByLocal}`)
        const user = response.data;
        if(response.status === 200){
          setUserIDFromDatabase(user.id);
        }
        
      } catch (error) {
        console.error('Error load user id:', error);
      }
        
        
    }
    loadUserId();
  },[]);


  // console.log("user id from database : ",userIDFromDatabase.id);


    const handleAddButton= async ()=>{

      if (!cartItem) {
        return;
      }
      
      if(cartItem.length ===0 ){

        await axios.post("http://localhost:8080/reset")
        .then(response => {
                      
          console.log('reseted successfully');
 
        })
        .catch(error => {
          console.error('Error reseted item:', error);
        });
      }
     
        
         

        const cartItemInCart = cartItem.find((item) => item.bookid.id === cartBook.id  && item.user && item.user.id === userIDFromDatabase);
    

        if (cartItemInCart) {
          const newQuantity = cartItemInCart.quantity + cartQuantity;
          const newSubtotal = cartItemInCart.unitPrice * newQuantity;
    
          await axios.patch(`http://localhost:8080/quantity/${cartItemInCart.id}`, { quantity: newQuantity })
            .then(response => {
              const updatedCart = cartItem.map(item => {
                if (item.id === cartItemInCart.id) {
                  return { ...item, quantity: newQuantity };
                }
                return item;
              });
              setCartItem(updatedCart);

              setAddMessage('Added to the cart');
              setTimeout(() => {
              setAddMessage('');
              }, 1500);
              
              console.log('Item quantity updated successfully');
            })
            .catch(error => {
              console.error('Error updating item quantity:', error);
            });
    
          await axios.patch(`http://localhost:8080/subtotal/${cartItemInCart.id}`, { subTotal: newSubtotal })
            .then(response => {
              console.log('Item subtotal updated successfully');
            })
            .catch(error => {
              console.error('Error updating item subtotal:', error);
            });

            
        } else {
      
          const newCartItem = {
            bookid: { id: cartBook.id },
            quantity: 1,
            unitPrice: cartBook.price,
            subtotal: 0, 
            user:{id:userIDFromDatabase}
          };
    
          await axios.post('http://localhost:8080/cartitem', newCartItem)
            .then(response => {
              setCartItem([...cartItem, response.data]);

              setAddMessage('Added to the cart');
              setTimeout(() => {
              setAddMessage('');
              }, 1500);

              console.log('Item added to the cart successfully');
            })
            .catch(error => {
              console.error('Error adding item to the cart:', error);
            });

        }
      
      

  };


      const handleBuyButton = async () =>{

       handleAddButton();

       navigate('/Addtocart')

      }

        const removeOneFromCart = () =>{
          let qty = cartQuantity;

          if(qty >1){
            setCartQuantity(qty-=1);
          }
          
        }

        const addOneToCart = () =>{
          let qty = cartQuantity;

          if(cartBook.quantity>qty){

            setCartQuantity(qty+=1);
          }
          
        }
        

      return (
        <>
          <div>

            <Header/>
          </div>

          
          {cartBook ? (

           
              <div className="bookpreview">
              <div className="bprev">
                <img className="previewimage" src={`data:image/png;base64,${cartBook.image}`} alt=""></img>
                
                
                
            
              </div>
              {/* {cartItem?( */}
                <div className="book-pre-de-button">
                    <div className="bookpre-details">
                      <h5>{cartBook.title}</h5>
                      <h6>Rs:{cartBook.price}.00</h6>
                      
                      <h5>information</h5>
                      <h6>Author : {cartBook.author.authorName}</h6>
                      <h6>isbn number : {cartBook.isbnNumber}</h6>
                        <div className="bookpre-description">
                          <h6>description : </h6>
                          <h6 className="bookpre-description-inner"> {cartBook.description}</h6>
                        </div>
                      <h6 style={{ textTransform: 'capitalize' }} className="des">category : {cartBook.category.name}</h6>
                      <h6 style={{ textTransform: 'capitalize' }} className="des">subcategory : {cartBook.subcategory.name}</h6>
                    </div>

                      <div className="prevbuttonset">
                      
                        {token?(

                          <div className="btset-out">
                          <div className="btset">
                            <Button className="btset-in" onClick={removeOneFromCart}>-</Button>
                            <p className="bookpre-quantity">{cartQuantity}</p>
                            <Button className="btset-in" onClick={addOneToCart}>+</Button>
                          </div>
  
                        <div className="bt">
                          <Button className="bt-in-1" onClick={handleAddButton}>Add To Cart</Button>
                        </div>
                        <div className="bt">
                          <Button className="bt-in-2" onClick={handleBuyButton}>Buy Now</Button>
  
                        </div>
                        
                        </div>
                        
                        
                        ):(
                          <div className="btset-out">
                          <div className="btset">
                          <Link to={'/log-reg'}><Button className="btset-2">-</Button></Link>
                            <p className="bookpre-quantity-2">{cartQuantity}</p>
                            <Link to={'/log-reg'}><Button className="btset-2" >+</Button></Link>
                          </div>
  
                          <div className="bt">
                          <Link to={'/log-reg'}><Button className="bt-1" >Add To Cart</Button></Link>
                          </div>
                          <div className="bt">
                            <Link to={'/log-reg'}><Button className="bt-2" >Buy Now</Button></Link>
  
                          </div>
                          </div>
                        )}
                        
                      </div>



                {/* ):""}  */}
                {addmessage && <Alert className="bookpre-added-alert" variant="success" onClose={()=>setAddMessage('')}><Image className="bookpre-alert-img" src={addedmarkgeen}></Image>{addmessage}</Alert>}
                </div>
               
              </div>

            
              
            
            ):("")}
     

          <div>

            <Footer/>
          </div>
        </>
      );


}
export default Bookpreview;