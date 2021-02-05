import React, { useState, use } from 'react';
import Button from '@material-ui/core/Button';
import { auth, provider } from '../../firebase/firebase.js';

import './Login.css';

const Login = ({ setUser }) => {

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                console.log("RESULT ====>  ",result.user._lat)
                setUser(result.user)
             })
            .catch(error => alert(error.message));
   };

   return (
        <div className = 'login'>
            <div className = 'login__logo'>
                <img style = {{height: '200px', boxShadow: '0 0 10px #FFF', borderRadius: '6px'}} 
                     src = "https://cdn.vox-cdn.com/thumbor/QuS2QKQys3HhosKiV-2IuKhphbo=/39x0:3111x2048/1400x1050/filters:focal(39x0:3111x2048):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/49901753/netflixlogo.0.0.png"
                     alt = 'Netflix-logo'
                />
                
                <img style = {{height: '70px', paddingTop : '80px'}}
                    //  src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Logo_Netflix.png"
                     src = "https://www.androidpolice.com/wp-content/uploads/2015/02/nexus2cee_Netflix_Logo_Digital-Video-e1424532515143.png"
                     alt="Netflix Logo" 
                />
            </div> 

            <Button type = 'submit' onClick = {signIn}> 
                Sign In    
            </Button>       
        </div>
    )
}

export default Login;