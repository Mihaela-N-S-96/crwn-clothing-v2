import {useState, useContext} from 'react';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component.jsx'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';



import '../sign-up-form/sign-up-form.styles.scss'
const defaultFormFields ={
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
    event.preventDefault();

    if(password != confirmPassword) {
        alert("your password does not match");
        return;
    }

    try{
            const {user} = await createAuthUserWithEmailAndPassword( email, password);
        
           
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();


        }catch(error){
            console.log(error);
            if(error.code === 'auth/weak-password') {
                alert('your password is to weak! Pleas enter at least 6 characters!');
            }
            if(error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            }else{
                console.log('user creation encounted an error', error);
            }
            console.log("user error");
    }
    }

    const handleChange = (event) =>{
         const {name, value} = event.target;

         setFormFields({...formFields, [name]: value});
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an acount?</h2>
            <span>
                Sign Up with your email and pass</span>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                   label = "Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput
                    label = "Emil" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput
                    label = "Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput
                    label = "Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                    <Button type="submit" >Sign Up</Button>
                </form>
            
        </div>
    )
}

export default SignUpForm;