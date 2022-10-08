import '../App.css'
import { useState } from 'react';
import { useNavigate  } from "react-router-dom";
const axios = require('axios');


export default function Login(props) {

    const [value, setValue] = useState("");

    let navigate = useNavigate ();

    let login = () => {
        //check with databse if username and password are correct
        //create a key to ensure for login
        navigate(`/${value}`)
        // console.log('push')
    }

    return (
        <div className="LoginPage">
            <div className="LoginPanel">
                <div id='tittle'>Money Manager INC.</div>

                <div className="usernameInput">
                    <i className="fa-solid fa-user"></i>
                    <input value={value} onChange={(e) => { setValue(e.target.value) }} type='text'></input>
                </div>
                <div className="passwordInput">
                    <i className="fa-solid fa-key"></i>
                    <input type='password'></input>
                </div>
                <button id='logInBtn' onClick={login}>Log In</button>
            </div>
        </div>
    )

}