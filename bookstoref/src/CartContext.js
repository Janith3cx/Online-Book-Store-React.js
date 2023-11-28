import axios from "axios";
import { useContext } from "react";
import { createContext,useReducer, useEffect, useState } from "react";



export const CartContext = createContext();


const cartReducer = (state = { cart: [] }, action) => {

  const { dispatch } = action;
  

  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex((item) => item.id === action.payload.id);

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };

  } else {

    
    axios.post('http://localhost:8080/cartitem/', action.payload)
    .then(response => {
      
      dispatch({ type: 'UPDATE_CART', payload: response.data });
    })
    .catch(error => {
      console.error('Error adding item to cart:', error);
      return state;
    });
    
  }
  
  break;


  case 'UPDATE_QUANTITY':
    axios.put(`http://localhost:8080/cartitem/${action.payload.id}`, { quantity: action.payload.quantity })
      .then(response => {
        // Update the state with the response data
        dispatch({ type: 'UPDATE_CART', payload: response.data });
      })
      .catch(error => {
        console.error('Error updating item quantity:', error);
      });
    break;

    case 'REMOVE_FROM_CART':
  axios.delete(`http://localhost:8080/cartitem/${action.payload.id}`)
    .then(response => {
      // Update the state with the response data
      dispatch({ type: 'UPDATE_CART', payload: response.data });
    })
    .catch(error => {
      console.error('Error removing item from cart:', error);
    });
  break;
  }
};

export default cartReducer;


export function CartProvider({children}){

  const [cart, dispatch] = useReducer(cartReducer, []);
  
  useEffect(() => {
    axios.get('http://localhost:8080/cartitem')
      .then(response => {
        // Update the cart state with the fetched data
        dispatch({ type: 'INITIALIZE_CART', payload: response.data });
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  return (
    <CartContext.Provider
      value={{cart, dispatch }}
    >
      {children}
    </CartContext.Provider>
  );
      
}

export const useCart = () => {
  return useContext(CartContext);
};
