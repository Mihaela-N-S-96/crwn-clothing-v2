import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component';
import {EmptyMessage, CardDropdownContainer, CartItems} from './card-dropdown.styles';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

const CardDropdown = () => {
const {cartItems} = useContext(CartContext);
const navigate = useNavigate();

const goToCheckoutHandler = () => {
    navigate('/checkout');
}
return (
    <CardDropdownContainer>
        <CartItems>
            {
                cartItems.length ?  ( cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}  />
                    ) )) : (
                        <EmptyMessage>your cart is empty </EmptyMessage>
                    )
            }
         
        </CartItems>
        <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>

    </CardDropdownContainer>
)
}

export default CardDropdown;