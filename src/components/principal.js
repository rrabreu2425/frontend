import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, GoogleAuthProvider, signInWithPopup } from '../config/firebase';
import GetInfoAPI from './GetInfoAPI'
function Login() {

    const [userLoged, setUserLoged] = useState(false || window.localStorage.getItem('auth') === 'true')
    const[token, setToken]=useState('')
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                window.localStorage.setItem('auth', 'true')
                setUserLoged(true)
                setToken(currentUser.accessToken)
            }

        })

    }, [])


    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider).then((userCredentials) => {
                const user = userCredentials.user;
                if (userCredentials) {
                    window.localStorage.setItem('auth', 'true')
                    setUserLoged(true)
                    setToken(userCredentials._tokenResponse.idToken)
                }
            })
        } catch (error) {
            console.error('Error during login:', error);
        }
    }


    const handleLogout = async () => {
        try {
            await signOut(auth).then(() => {
                window.localStorage.setItem('auth', 'false')
            })
            setUserLoged(false)
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }

    return (
        <div>
            {userLoged ? (<div>
                <h1>User Loged</h1>
                <button onClick={handleLogout}>LogOut</button>
                <GetInfoAPI idToken={token}/>
            </div>) :
                (<button onClick={handleGoogleLogin}>Sign in with Google</button>)}
        </div>
    );
};

export default Login;