import React from 'react';
import Button from '@material-ui/core/Button';
//
//import { auth, provider } from './../../firebase/firebase.js'
// import { useStateValue } from './../../stateProvider/StateProvider.js';
// import { actionTypes } from './../../stateProvider/reducer.js';

import './Login.css';

const Login = () => {

    //const [state, dispatch] = useStateValue();

//     const signIn = () => {
//         //Sign In
//         auth.signInWithPopup(provider)
//             .then(result => {
//                 dispatch({
//                     type: actionTypes.SET_USER,
//                     user: result.user,
//                 })
//              })
//             .catch(error => alert(error.message));
//    };

    return (
        <div className = 'login'>
            <div className = 'login__logo'>
                <img style = {{height: '240px', boxShadow: '0 0 18px #FFF'}} src = "https://cdn.vox-cdn.com/thumbor/QuS2QKQys3HhosKiV-2IuKhphbo=/39x0:3111x2048/1400x1050/filters:focal(39x0:3111x2048):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png"/>
                <img style = {{height: '50px', paddingTop : '40px'}}src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
                     alt="Netflix Logo" 
                />
            </div> 

            <Button type = 'submit'>
             {/* onClick = {signIn}> */}
                Sign In    
            </Button>       
        </div>
    )
}

export default Login;