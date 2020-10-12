import React from 'react';
import Button from '@material-ui/core/Button';
import { auth, provider } from './../../firebase/firebase.js'
// import { useStateValue } from './../../stateProvider/StateProvider.js';
// import { actionTypes } from './../../stateProvider/reducer.js';

import './Login.css';

const Login = () => {

    const [state, dispatch] = useStateValue();

    const signIn = () => {
        //Sign In
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
             })
            .catch(error => alert(error.message));
    };

    return (
        <div className = 'login'>
            <div className = 'login__logo' style = {{ height: "10px"}} >
                <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1024px-Facebook_f_logo_%282019%29.svg.png" alt = "facebook logo"/>
                <img src = "https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt = '' />
            </div> 

            <Button type = 'submit' onClick = {signIn}>
                Sign In    
            </Button>       
        </div>
    )
}

export default Login;