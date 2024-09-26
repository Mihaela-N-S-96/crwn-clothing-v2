import {Fragment, useContext} from 'react';
import {Outlet, Link} from "react-router-dom";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
// import './navigation.styles.scss';
import {NavigationComponent, LogoContainer, NavLink, NavLinks} from './navigation.styles.jsx'

import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';

const Navigation = () => {
  const {currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);
  
 

    return (
      <Fragment>
        <NavigationComponent>
          <LogoContainer to='/'>
            <CrwnLogo className='logo'/>
          </LogoContainer>
          <NavLinks >
            <NavLink to="/shop">
                    SHOP
            </NavLink>
            {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : ( 
              <NavLink yarn to="/auth"> 
                    SIGN IN
            </NavLink>
            )}
            <CartIcon/>
          </NavLinks>
          { isCartOpen && <CardDropdown/>}
    
        </NavigationComponent>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;