import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup } from "../config/firebase"; // Import from firebase.js
import imgBackground from '../img/imgLogin.jpeg'
import '../css/login.css'
const Login = () => {
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider).then((userCredentials) => {
                if (userCredentials) {
                    navigate("/patients")
                }
            })
        } catch (error) {
            console.error("Error during Google login:", error);
        }
    };
    return (
        <>
            <div className="Container">
                <div className="ImgLogin">
                  <img src={imgBackground} width="100%" height="100%"/>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", width: "250px", flexDirection: "row" }}>
                    <button className="btn btn-primary" onClick={handleGoogleLogin}>Login</button>
                </div>
            </div>
        </>
    )
}
export default Login