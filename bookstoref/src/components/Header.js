import React, { useEffect, useRef, useState } from "react"
import '../App.css'
import { Image, Form, FormGroup, Button, Table, ModalFooter, Modal, ModalBody, ModalHeader, CloseButton } from 'react-bootstrap'
import jbookstorelogo from '../assets/images/jbookstorelogo.png'
import searchalt from '../assets/svgs/searchalt.svg'
import order from '../assets/svgs/order.svg'
import cart1 from '../assets/svgs/cart1.svg'
import home from '../assets/svgs/home.svg'
import search720 from '../assets/svgs/search720.svg'
import search7201 from '../assets/svgs/search7201.svg'
import check720 from '../assets/svgs/check720.svg'
import cart720 from '../assets/svgs/cart720.svg'
import { Input } from '@mui/joy';
import { Link, NavLink, Route, Routes ,useHistory, useNavigate} from 'react-router-dom'
import axios from "axios"
import Cart from "./Cart"
import { useCart } from "../CartContext"




const Header = () => {

  const [query,setQuery] = useState('');
  const [headBooks,setHeadBooks] = useState([]);
  const inputRef = useRef(null);
  const [cartItems,setCartItems] = useState(null);
  const token = localStorage.getItem('token');


  useEffect(()=>{

    const cartData = async()=>{
      try {
        
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8080/cartitem/user/${username}`);
  

        if(response.status==200){

            setCartItems(response.data);
            
        }

      } catch (error) {
        console.error('Error fetching cart data:', error);
    }
    }

    cartData();
},[cartItems])


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

  const navigate = useNavigate();
  
  const handleSearch = () => {
    navigate(`/books/search/${query}`);
  };

  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  
  const handleMenu = () =>{



    setOpenMenu(!openMenu);
  }

  const handleSearchBar = () =>{

    if(openSearch===true){
      setOpenSearch(false);
    }else{
      setOpenSearch(true);
    }
  }

    const [show,setShow] = useState(false);
    const handleShow = () =>{
      
      if(show===true){
        setShow(false);
      }else{
        setShow(true);
      }
     
    
    }
    
    const calculateTotal = () => {
      let total = 0;
    
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach((item) => {
          total += item.unitPrice * item.quantity;
        });
      }
    
      return total;
    };
    

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
          

      const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        
        console.log("logged out username : ",localStorage.getItem('username'));
      };


      const isUserLoggedIn = !!localStorage.getItem('token');


      // const [isSticky, setSticky] = useState(false);

      // useEffect(() => {
      //   const handleScroll = () => {
      //     setSticky(window.scrollY > 0);
      //   };
    
      //   // Attach the scroll event listener
      //   window.addEventListener('scroll', handleScroll);
    
      //   // Remove the event listener when the component is unmounted
      //   return () => {
      //     window.removeEventListener('scroll', handleScroll);
      //   };
      // }, []);



    return(

        <>
        {/* top of haeder */}

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
                      <Input onKeyDown={handleKeyDown} ref={inputRef} onChange={handleOnChange} value={query} className='Search-input' type='search' placeholder='Search' />
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
        
        
        </>
    );
}
export default Header;