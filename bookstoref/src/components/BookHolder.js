import React, { useEffect, useState } from "react";
import '../App.css';
import cart1 from '../assets/svgs/cart1.svg'
import { FormGroup, Form, Button , Image , Alert} from "react-bootstrap";
import { Link , useNavigate , Navigate} from "react-router-dom";
import axios from "axios";
import cutred from '../assets/svgs/cutred.svg'
import addedmarkgeen from '../assets/svgs/addedmarkgeen.svg'






const BookHolder = ({book}) => {

  //  console.log(book)
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [addmessage, setAddMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [userIDFromDatabase,setUserIDFromDatabase] = useState(null);
    const [cart,setCart] = useState(null);
    const [cartItem,setCartItem] = useState(null);
    const [cartId,setCartId] = useState(null);
    const [cartIdFromDatabase,setCartIdFromDatabase ] = useState(null);


    const handleMouseEnter = () => {
        setIsVisible(true);
    };
    
    const handleMouseLeave =() =>{
        setIsVisible(false);
    };

    // const {cart, dispatch} = useContext(CartContext);
    
    const [lastId, setLastId] = useState(0);
    

        
    useEffect(()=>{

        const cartData = async()=>{
          try {
            const response = await axios.get("http://localhost:8080/cartitem")

            if(response.status==200){

                setCartItem(response.data);
                
            }

          } catch (error) {
            console.error('Error fetching cart data:', error);
        }
        }

        cartData();
    },[])

    const username = localStorage.getItem('username'); 
      
    // console.log('cart item :', cartItem);

    useEffect(() => {
      const loadUserIdAndCart = async () => {
        try {
          const userResponse = await axios.get(`http://localhost:8080/id/${username}`);
        
          if (userResponse.status === 200 ) {
            const user = userResponse.data;
            
            setUserIDFromDatabase(user.id);
        
            // console.log('user:', user.id);
            
           
          }
        } catch (error) {
          console.error('Error loading user ID and cart:', error);
        }
      };
    
      loadUserIdAndCart();
    }, [username]);

    if (token) {
      console.log('JWT:', token);
    } else {
      console.log('No JWT found in localStorage');
    }

    // console.log('user:', user?.id);
    // console.log('user from database:', userIDFromDatabase);
    // console.log('user localstorage :', localStorage.getItem('username'));

    const handleAddButton = async () => {

      
      
       

        if(cartItem && cartItem.length ===0 ){

          await axios.post("http://localhost:8080/reset")
          .then(response => {
                        
            console.log('reseted successfully');
   
          })
          .catch(error => {
            console.error('Error reseted item:', error);
          });
        }

  
  
        if (book.quantity != 0) {

          console.log('user from database:', userIDFromDatabase);

          const cartItemInCart = cartItem && cartItem.find((item) => item.bookid.id === book.id && item.user && item.user.id === userIDFromDatabase);
          

          // console.log("user id in cart is equals ",userIdInCart.user.id);

          if (cartItemInCart) {
            const newQuantity = cartItemInCart.quantity + 1;
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
  
              setAddMessage('Added to the cart');
              setTimeout(() => {
              setAddMessage('');
              }, 1500);
          } else {
        
          
              const newCartItem = {
                bookid: { id: book.id },
                quantity: 1,
                unitPrice: book.price,
                subtotal: 0, 
                user:{id:userIDFromDatabase}
              };
           
              
      
            await axios.post('http://localhost:8080/cartitem', newCartItem)
              .then(response => {
                setCartItem([...cartItem, response.data]);
                console.log('Item added to the cart successfully');
              })
              .catch(error => {
                console.error('Error adding item to the cart:', error);
              });
  
              setAddMessage('Added to the cart');
              setTimeout(() => {
              setAddMessage('');
              }, 1500);
          }
        } else {
          setMessage('Out Of Stock');
          setTimeout(() => {
            setMessage('');
          }, 1500);
        }
      



      
        }
        
       

    
    const [isVisibleBookPreview,setIsVisibleBookPreview] = useState(false);
   

    

  
   
    return(
        <>
        
        <div className="content">
        <Link className="flex-fill" key={book.id} to={`/books/${book.id}`}>
            <FormGroup className="holder">
                <div className="formset">
                    <div className="inner-div">
                        <Form onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className='form'>
                            <Image className="holder-image" src={`data:image/png;base64,${book.image}`} alt="image" onError={() =>console.log("Image Loading Error")}></Image>
                            
                        </Form>
                    </div>
                        <div className="text">
                            <div>

                                <h5>{book.title}</h5>
                                <h6>{book.author.authorName}</h6>
                                <h6>Rs:{book.price}.00</h6>
                                <h6 className="b-pre-des">{book.isbnNumber}</h6>
                                <h6 className="b-pre-des">{book.description}</h6>
                                <h6 style={{ textTransform: 'capitalize' }}>{book.category.name}</h6>
                                <h6 style={{ textTransform: 'capitalize' }} className="b-pre-des">{book.subcategory.name}</h6>

                                
                            </div>
                            
                        </div>
                </div>

                 
            </FormGroup>
            </Link>
              {token? (
                 <>
                <div className="inner-button">
                <Button onClick={handleAddButton} className="inner-cart"><Image className="inner-carticon" src={cart1} alt=""></Image></Button>
                </div>
               
                {message && <Alert className="added-alert" variant="danger" onClose={()=>setMessage('')}><Image className="alert-img" src={cutred}></Image>{message}</Alert>}
                {addmessage && <Alert className="added-alert" variant="success" onClose={()=>setAddMessage('')}><Image className="alert-img" src={addedmarkgeen}></Image>{addmessage}</Alert>}
                </>
                  
              ):(
                <div className="inner-button">
                  <Link to={"/log-reg"}><Button className="inner-cart"><Image className="inner-carticon" src={cart1} alt=""></Image></Button></Link>
                </div>

              )}
                
                        
        </div>

        
        </>

       
        
        
    
    )
}

export default BookHolder;