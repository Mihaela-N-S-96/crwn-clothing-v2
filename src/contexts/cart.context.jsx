import {createContext , useState, useEffect} from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
   const existingCartItem = cartItems.find(
       (cartItem) => cartItem.id===productToAdd.id
       );
    // if found, increment quatity

    if(existingCartItem) 
        { return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        { ...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        );
    }
    //return new array modified cartItems/ new cart item
     return [...cartItems, { ...productToAdd, quantity: 1 }];
    
} 

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find if cartItems contains productToAdd
   const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id===cartItemToRemove.id
    );

    //if quantity ===1
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
    }


        return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ... cartItem, quantity: cartItem.quantity - 1}
        : cartItem
        );
  
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id != cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}, 
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    total: 0,
    cartTotal: () => {},
})


export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItem] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, cartTotal] = useState(0);

    useEffect( () => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
         setCartCount(newCartCount);
    }, [cartItems])

    useEffect( () => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        cartTotal(newCartTotal);
       
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems, productToAdd));

    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItem(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) =>{
        setCartItem(clearCartItem(cartItems, cartItemToClear));
    }

       const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount,total, removeItemToCart, clearItemFromCart}

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>)
}