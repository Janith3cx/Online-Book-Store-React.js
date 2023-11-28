import React, { useEffect,  useRef, useState } from 'react';
import '../App.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { Input } from "@mui/joy";
import { Button, FormGroup ,Image, Form, Alert, ModalFooter, ModalBody, ModalHeader, CloseButton } from "react-bootstrap";
import jbookstorelogo from '../assets/images/jbookstorelogo.png'
import searchalt from '../assets/svgs/searchalt.svg'
import cart1 from '../assets/svgs/cart1.svg'
import home from '../assets/svgs/home.svg'
import search720 from '../assets/svgs/search720.svg'
import search7201 from '../assets/svgs/search7201.svg'
import cart720 from '../assets/svgs/cart720.svg'
import graterthan from '../assets/svgs/graterthan.svg'



const Checkout = ({props}) => {

  const {id} = useParams();
  const [checkoutUser,setCheckoutUser] = useState(null);
  const [userIDFromDatabase,setUserIDFromDatabase] = useState(null);
  const token = localStorage.getItem('token');
  const [checkoutItems,setCheckoutItem] = useState([]);

  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const [query,setQuery] = useState('');
  const [headBooks,setHeadBooks] = useState([]);
  const inputRef = useRef(null);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show,setShow] = useState(false);
  const [cartItems,setCartItems] = useState(null);

  const [firstName,setFirstName] = useState ("");
  const [lastName,setLastName] = useState ("");
  const [address,setAddress] = useState ("");
  const [city,setCity] = useState ("");
  const [postalCode,setPostalCode] = useState ("");
  const [email,setEmail] = useState("");
  const [firstNameValid,setFirstNameValid] = useState ("");
  const [lastNameValid,setLastNameValid] = useState ("");
  const [addressValid,setAddressValid] = useState ("");
  const [cityValid,setCityValid] = useState ("");
  const [postalCodeValid,setPostalCodeValid] = useState ("");
  const [emailValid,setEmailValid] = useState("");
  const [submitMessage,setSubmitMessage] = useState("");
  const [error, setError] = useState(null);
  const [shippingItems,setShippingItem] = useState();



  useEffect(()=>{

    const cartData = async()=>{
      try {
        
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8080/cartitem/user/${username}`);
  

        if(response.status==200){

            setCartItems(response.data);
            setCheckoutItem(response.data);
        }

      } catch (error) {
        console.error('Error fetching cart data:', error);
    }
    }

    cartData();
},[cartItems,checkoutItems])


  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      

      setHeadBooks([]);
      
    }
  };

  const handleOnChange=(e)=>{

    const inputValue = e.target.value;

    setQuery(inputValue);

    if (!inputValue) {
      setHeadBooks([]);
    }

      const suggestBooks= async () =>{
        try {
        const response = await axios.get(`http://localhost:8080/search?query=${query}`);
  
          if(response.status===200){
  
            setHeadBooks(response.data);
          }
        } catch (error) {
          console.error('Error fetching suggestions', error);
        }
      }
  
      if(inputValue){
        suggestBooks();
      }
      
    
   
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        
        setHeadBooks([]); 
      }

    };
  
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    
  }, []);



  
  const handleMenu = () =>{



    setOpenMenu(!openMenu);
  }





    const [isFormVisible, setIsFormVisible] = useState(false);

  
      
      const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
      };
    
     
      const cartButtonRef = useRef(null);
    
      useEffect(() => {
        
        const handleClickOutside = (event) => {
          if (
            cartButtonRef.current && !cartButtonRef.current.contains(event.target) && isFormVisible) {
            setIsFormVisible(false); 
          }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [isFormVisible]);
          



      const isUserLoggedIn = !!localStorage.getItem('token');



  //   useEffect(()=>{
      
  //     const cartData = async()=>{
  //       try {
  //         const username = localStorage.getItem('username');
  //         const response = await axios.get(`http://localhost:8080/id/${username}`);
        
  //         if(response.status==200){
          
  //             setCheckoutUser(response.data);
              
  //         }
        
  //       } catch (error) {
  //         console.error('Error fetching cart data:', error);
  //     }
  //     }
    
  //     cartData();
  // },[checkoutUser])


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        
        setHeadBooks([]); 
      }

    };
  
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    
  }, []);




  const navigate = useNavigate();
  
  const handleSearch = () => {
    navigate(`/books/search/${query}`);
  };

    

     const handleSearchBar = () =>{

      if(openSearch===true){
        setOpenSearch(false);
      }else{
        setOpenSearch(true);
      }
    } 


     const usernameByLocal = localStorage.getItem('username');

  // console.log("username : ",usernameByLocal);

  useEffect(()=>{
    const loadUserId = async () =>{
      try {
        const response = await axios.get(`http://localhost:8080/id/${usernameByLocal}`)
        const user = response.data;
        if(response.status === 200){
          setUserIDFromDatabase(user.id);
          setCheckoutUser(response.data);
          
        }
        
      } catch (error) {
        console.error('Error load user id:', error);
      }
        
        
    }
    loadUserId();
  },[userIDFromDatabase,checkoutUser]);

    const handleSubmitDetails = async (e) =>{
      e.preventDefault()

      if (!cartItems || cartItems.length === 0) {
        console.log("No items in the cart.");
        return;
      }


      const shippingDetails = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
        postal_code: postalCode
      }


       console.log("username : ",firstName,lastName,address,city, email,postalCode);

     
     
        try {
          if(firstName !=='' || lastName !=='' || address !=='' || city !=='' || email !=='' || postalCode !==''){
          const response = await axios.post("http://localhost:8080/shipping",shippingDetails);

          if(response.status === 201){

            setFirstName("");
            setLastName("");
            setAddress("");
            setCity("");
            setPostalCode("");
    
            setSubmitMessage("Your details successfully, we'll contact you soon");
    
            setTimeout(() => {
              setSubmitMessage('');
            }, 6000);
    
            console.log("form submited");
    
             await axios.get("http://localhost:8080/shipping")
            .then(shippingResponse=>{
              setShippingItem(shippingResponse.data);
    
              console.log("shipping item get success")
            })
            .catch(error => {
              console.error('Error shipping items not found:', error);
            });
    
            // const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
            
    
            // const bookDetails = cartItems.map(item => ({
            //       bookId: item.bookid.id,
            //       quantity: item.quantity,
                  
            //     }));
    
                // const orderdetails = {
                //   quantity: totalQuantity,
                //   subTotal: totalSubTotal,
                //   bookDetails, // An array of objects containing bookId, quantity, and subTotal
                //   shippingOrder: { id: shippingItems },
                //   user: { id: userIDFromDatabase }
                // };
    
            // const orderResponse = await axios.post("http://localhost:8080/orderdetails",orderdetails)
    
            // if(orderResponse.status === 201){
    
            //   console.log("order details submited");
            // }

            }

          }else{
            setError(" All input fields are required ");
            setTimeout(() => {
              setError(null);
          }, 2000);
          }
        } catch (error) {
          console.error('cart items posting error :', error);
        }
       

        
  

     
      
    }

    // console.log("checkout items",checkoutItems);

    const calculateTotal = () => {
      let total = 0;
    
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach((item) => {
          total += item.unitPrice * item.quantity;
        });
      }
    
      return total;
    };

    let shipping = 500;



    const handleEmail =(e) =>{
      const value = e.target.value;
      setEmail(value);
      
    }

    const handleFirstName =(e) =>{
      const value = e.target.value;

      setFirstName(value);
      
    }

    const handleLastName =(e) =>{
      const value = e.target.value;

      setLastName(value);
      
    }
     

    const handleAddress =(e) =>{
      const value = e.target.value;

      setAddress(value);
     
    }
     
    const cities = ["Anuradhapura",
      "Colombo",
      "Jaffna",
      "Kandy",
      "Galle",
      "Mannar",
      "Chavakachcheri",
      "Vavuniya",
      "Sri Jayewardenepura Kotte",
      "Dehiwela-Mount Lavinia",
      "Nuwara Eliya",
      "Polonnaruwa",
      "Point Pedro",
      "Valvettithurai",
      "Kurunegala",
      "Ratnapura",
      "Badulla",
      "Bandarawela",
      "Happutalle",
      "Trincomalee",
      "Kinniya",
      "Batticaloa",
      "Eravur",
      "Kattankudy",
      "Ampara",
      "Kalmunai",
      "Akkaraipattu",
      "Embilipitiya",
      "Kegalle",
      "Balangoda",
      "Matale",
      "Dambulla",
      "Kalutata",
      "Matara",
      "Hambantota",
      "Chilaw",
      "Kuliyapitiya",
      "Gampaha",
      "Negombo",
      "Homagama"];

      
const sortedCities = cities.slice().sort();


    const handleCity =(e) =>{
      const value = e.target.value;

      setCity(value);
      
    }
     

    const handlePostalCode =(e) =>{
      const value = e.target.value;

      setPostalCode(value);
      
    }
     

    
     
     
    return(

      <>
      <div className='checkout'>
       

        <div className='pagehead'>
                
              
            <div className='Top-Line'>

                  <div className='phone'>
                    <p className='topline-text'>Call Us for Web Orders :</p>
                    <a href='#' className='link'> +94342048778657</a>
                  </div>

                  <div className='head-email'>
                    <p className='topline-text'>Email :</p>
                    <a href='#' className='link'>bookstore@gmail.com</a>
                  </div>

                  {token? (
                    <>
                    <div className='logout'>
                      <p onClick={logout} >Log Out</p>
                    </div>
                  </>
                  ):(
                    <>
                    <div className='login'>
                      <a href={'/log-reg'} className='link'>Login/Register</a>
                    </div>
                  
                  </>
                  )}

                  
                  
                  
                  </div>
                  
                  {/* header */}
                  
                  
                  <div className={openMenu? 'nav-bar-close.open':'nav-bar-open'} onClick={handleMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                  </div>
                  
                  <div className={openMenu ? 'nav-bar-close':''} onClick={handleMenu}>
                  <span className="span1"></span>
                  <span className="span2"></span>
                  </div>
                  
                  <header className='Homepage-header'>
                  <div className='head'>
                  <div className="home-logo-button">
                        <Link to='/'><img src={jbookstorelogo} className='Homepage-logo' alt='logo'></img></Link>
                        <h2 className="shopname">JBOOKSHOP</h2>
                  
                  
                  
                  
                        <div className='home-button'>
                          <Link to={'/'}><button className='homebutton-in'><Image className='home-icon' src={home} alt=''/></button></Link>
                        </div>
                  </div>
                    <Form className='Searchbar'>
                        <div className="search-input-butt-cart">
                          <div className="mcheck-cart">

                          <Link to={"/Addtocart"}><Image className="mcart" src={cart720} alt="cart"></Image></Link>
                              <Image onClick={handleSearchBar} className="msearchicon" src={search7201} alt="search"></Image>
                          </div>


                          <div className={openSearch ? 'msearchbar isopen' : 'msearchbar'}>
                              <input ref={inputRef} onChange={handleOnChange} value={query} className="minput" placeholder="Search" type="search"></input>
                              <Link to={`/books/search/${query}`}><button onClick={handleSearch} className="msearch"><Image src={search720} alt=""></Image></button></Link>
                          </div>


                  
                      <div className="searchcom">
                      <Input onKeyDown={handleKeyDown} inputRef={inputRef} value={query} onChange={handleOnChange} className='Search-input' type='search' placeholder='Search' />

                        {query?(
                              <Link to={`/books/search/${query}`}><Button onClick={handleSearch} className='Search-button'><Image className='Search-icon' src={searchalt} alt='search'></Image></Button></Link>
                        ):(
                          <Button onClick={handleSearch} className='Search-button'><Image className='Search-icon' src={searchalt} alt='search'></Image></Button>
                        )}

                      </div>
                      </div>
                      <div>
                        
                        <div className="sugform">
                        
                          {headBooks.length>0 && (
                            (
                              <>
                              {headBooks.map((headbook)=>(
                                <Link className="inputquaeries" to={`/books/${headbook.id}`} >
                                
                                    <div className= "sugformholder"> 
                              
                                    <div className="book-ti-auth">
                                        <Image className="sugimages" src={`data:image/png;base64,${headbook.image}`} alt=""/>
                              
                                        <div className="word-ti-auth">
                                          <p className="bo-ti">{headbook.title}</p>
                                          <p className="bo-auth">{headbook.author.authorName}</p>
                                        </div>
                                    </div>
                              
                                    </div>
                              
                                  </Link>

                              ))}

                              </>
                            )
                          )}
                        </div>
                      </div>
                              
                      <div className='check-cart'>
                              
                        <Button ref={cartButtonRef} onClick={toggleFormVisibility}className='cart'><Image className='cart-icon' src={cart1} alt='cart'></Image></Button>
                      </div>  
                      <div className="cartform-header">
                      {isFormVisible && (

                            <Form  className="cartformbody" >
                            <ModalHeader>
                                <h1>Cart Items</h1>
                                <div className="modalclose">
                                  <CloseButton onClick={toggleFormVisibility} />
                                </div>
                              </ModalHeader>
                            <Form className="headform" >
                      
                      
                              {calculateTotal()>0?

                              <>
                              <ModalBody>
                              
                              {isUserLoggedIn && (
                                <div>
                                 {cartItems.map((item) => (
                                
                                   <div key={item.id} className="cart-item">
                                  
                                     <Link to={`/books/${item.id}`}>
                                     <Image
                                       className="cart-item-image"
                                       src={`data:image/png;base64,${item.bookid.image}`}
                                       alt={item.title}
                                     />
                                     </Link>
                                     <Link className="cart-item-details-li" to={`/books/${item.id}`}>
                                     <div className="cart-item-details">
                                       <p>{item.title}</p>
                                       <p>Price: Rs{item.unitPrice}</p>
                                       <p>Quantity: {item.quantity}</p>
                                
                                       <p>Subtotal: Rs{item.unitPrice * item.quantity}</p>
                                     </div>
                                     </Link>
                                   </div>

                                 ))}
                                </div>
                              )}

                                
                                <div>
                                
                                </div>
                                
                                
                              </ModalBody>
                                
                              </>:<>
                                <h3>No Products</h3>
                                
                              </>

                              }

                            </Form>
                            
                            <ModalFooter className="formfooter">
                            <p className="carttotal">Cart Total: Rs: {calculateTotal()}.00</p>
                                <Link to={"/Addtocart"}>
                                  <div className="">
                                    <Button className="cartveiwbutton">View Your Cart</Button>
                                  </div>
                                </Link>
                              </ModalFooter>
                            </Form>

                            
                      )}

                      </div>  
                            
                            
                    </Form>
                            
                            
                  </div>
                  <div className='categorybar'>
                  <div className="mlog-reg">
                        <div className={openMenu ? 'mlog-regin isopen' : 'log-reg'}>
                          {token ? (
                            <div className='mlogout'>
                              <p onClick={logout}>Log Out</p>
                            </div>
                          ) : (
                            <div className='mlogin'>
                              <Link to={'/log-reg'} className='mlink'><p>Login/Register</p></Link>

                            </div>
                          )}
                        </div>
                      </div>  
                    <ul className={openMenu ? 'categorybar ul isopen' : ''}>
                          
                      <Link className="flex-fill" to={`/books/category/${1}`}><li className="flex-fill"><span>fantasy</span></li></Link>
                      <Link className="flex-fill" to={`/books/category/${2}`}><li className="flex-fill"><span>horror</span></li></Link>
                      <Link className="flex-fill" to={`/books/category/${3}`}><li className="flex-fill"><span>mystery</span></li></Link>
                      <Link className="flex-fill" to={`/books/category/${4}`}><li className="flex-fill"><span>romance</span></li></Link>
                      <Link className="flex-fill" to={`/books/category/${5}`}><li className="flex-fill"><span>science fiction</span></li></Link>
                    </ul>
                          
                          
                  </div>
                          
                  </header>
      
             

        </div>

        <div className='checkoutbody'>
        
            <div className="checkoutcontent">
              
                  {checkoutItems && checkoutItems.length > 0 && (
                  <div className='checkout-submit-form-button'>
                    <div className="checkoutsubmit">
                    <div className="checkoutformgroup">
                    <FormGroup >
                      <div className="checkoutform">
                            <Form id="checkout-form" onSubmit={handleSubmitDetails} >
    
                                <div className="checkoutemail">
                                  <p className='check-form-input-names'>*email</p>
                                <Input className="input-1" value={usernameByLocal && checkoutUser?.email || 'Email'} onChange={handleEmail}></Input>
                                </div>
    
                                <div className="firstlast">
                                <div className="checkoutfirst">
                                  <p className='check-form-input-names'>*fisrt name</p>
                                    <Input value={firstName} onChange={handleFirstName} className="input-2"></Input>
                                </div>
                                
                               
                                <div className="checkoutlast">
                                  <p className='check-form-input-names'>*last name</p>
                                    <Input value={lastName} onChange={handleLastName} className="input-3" ></Input>
                                </div>
    
                                </div>
                      
                                <div className="checkoutaddress">
                                  <p className='check-form-input-names'>*address</p>
                                    <Input value={address} onChange={handleAddress} className="input-4" ></Input>
                                </div>
                                <div className="checkoutcity">
                                  <p className='check-form-input-names'>*city</p>
                                  <select value={city} onChange={handleCity} className="city-selector">
                                    <option value="" disabled>
                                      Select City
                                    </option>
                                    {sortedCities.map((city) => (
                                      <option key={city} value={city}>
                                        {city}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                    
                                <div className="checkoutpostal">
                                  <p className='check-form-input-names'>*postal code</p>
                                    <Input value={postalCode} onChange={handlePostalCode} className="input-6" ></Input>
                                </div>  
                    
                                {error && <Alert className="ckeout-alert" variant="danger">{error}</Alert>}   
                                {submitMessage && <Alert className="ckeout-alert" variant="success" onClose={()=>setSubmitMessage('')}>{submitMessage}</Alert>}  
                            </Form>
                            </div>
                        </FormGroup>
                      </div>
    
                    </div>
                    <div className='chechout-outer'>
                    <div className='checkout-item-outer'>
                        <div className='checkout-item'>
                          {checkoutItems.map((item) => (
                            <li key={item.id}>
                              <img src={`data:image/png;base64,${item.bookid.image}`} alt={item.title} />
                              <h5>{item.bookid.title}</h5>
                              <p>Price: Rs:{item.bookid.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Total Cost: Rs:{item.bookid.price * item.bookid.quantity}</p>
                            </li>
                          ))}

                        </div>
                          
                      <div className='checkout-details'>

                      <div className='checkout-details-1'>
                        <h5 className='details-header'>total price </h5>
                        <h5 className='details-body-1'> rs: {calculateTotal()}</h5>
                      </div>

                      <div className='checkout-details-2'>
                        <h5 className='details-header'>shipping </h5>
                        <h5 className='details-body-2'>rs: {shipping}</h5>
                      </div>

                      <div className='checkout-details-3'>
                        <h5 className='details-header'>total </h5>
                        <h5 className='details-body-3'>rs: {calculateTotal()+shipping}</h5>
                      </div>
                        <Button className='cartitem-submit-button' type='submit' form="checkout-form">proceed to payment</Button>
                      </div>
                    </div>
                    </div>
                  </div>
                  )}

                  {(!checkoutItems || checkoutItems.length === 0) && (
                    <div className='continuecheckoutcover'>
                    <div className='continuecheckout'>
                      <h4 className='checkoutempty'>No Items</h4>
                      <Link className='continueshopping' to={'/'}><h2>Continue Shopping<Image className='graterthan1' src={graterthan}></Image><Image className='graterthan2' src={graterthan}></Image></h2></Link>
                    </div>
                  </div>
                  )}

                
   
            </div>

        </div>  


         <div className='pagefoot'>

          <Footer/>

        </div> 

          

      </div>
      </>
    );
}
export default Checkout;