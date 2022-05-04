// default

//inverted

//google sign in

import '../button/button.styles.scss'
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}
const Button = ({children, buttonType, ...otherProps}) =>{
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES}`} >
                {children}
        </button>
    )
}

export default Button;