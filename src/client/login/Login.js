import { useRef, useState, } from 'react';
import { useNavigate } from "react-router-dom";
import FormItem from "../form/FormItem.js";
import "./Login.css"
import FormBottom from '../form/FormBottom.js';
import { fetchWithToken } from '../tokenManager/tokenManager.js';
import socketManager from '../socketManager/socketManager.js';

function Login() {
    const password = useRef();
    const username = useRef();

    const regexes = {
        password: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'),
        username: new RegExp('^[a-zA-Z0-9]{6,}$')
    };

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        serverError: "",
    });

    let navigate = useNavigate();
    let socket;

    function validateValue(regex, value, field, error) {
        let flag = regex.test(value);
        if (!flag) {
            if(value === ""){
                setErrors(prevState => ({
                    ...prevState,
                    [field]: ""
                }));
            }else{
                setErrors(prevState => ({
                    ...prevState,
                    [field]: error
                }));
            }
        } else {
            setErrors(prevState => ({
                ...prevState,
                [field]: ""
            }));
        }
        return flag;
    }

    function checkField(e, regex, field, error) {
        if (e.target.value === "") {
            if (e.target.classList) {
                e.target.classList.remove('error');
            }
            setErrors(prevState => ({
                ...prevState,
                [field]: ""
            }));
        } else {
            if (!validateValue(regex, e.target.value, field, error)) {
                if (e.target.classList) {
                    e.target.classList.add('error');
                }
            } else {
                if (e.target.classList) {
                    e.target.classList.remove('error');
                }
            }
        }
    }

    async function tryLogin() {
        let flag1 = validateValue(regexes.username, username.val ? username.val : "", "username", "Username is invalid");
        let flag2 = validateValue(regexes.password, password.val ? password.val : "", "password", "Password is invalid");
        if (flag1 && flag2) {
            let user = {
                username: username.val,
                password: password.val,
            }
            try {
                const req = {
                    path: 'Tokens',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                };
                const response = await fetchWithToken(req);
                if (response.status === 404) {
                    setErrors(prevState => ({
                        ...prevState,
                        serverError: "Username or Password are incorrent"
                    }));
                } else {
                    const token = await response.text();
                    localStorage.setItem('currentUser', JSON.stringify({username: username.val, token: token}));
                    
                    // Establish socket connection
                    socketManager.connect();
                    // Add event listener for the "newMsg" event
                    socketManager.addNewMsgListener();                    
                    // Send the 'login' event
                    socketManager.socket.emit("login", { username });

                    navigate('/messages');
                }
            } catch (error) {
                console.log("Failed to send request: ", error);
            }
        }
    }

    return (
        <>
            <form className="row g-3">
                <FormItem
                    type="text"
                    labelText="User Name:"
                    inputText="Enter your username"
                    onChange={(e) => username.val = e.target.value} tooltip="Username must be at least 6 chars, only letters and digits"
                    onKeyUp={(e) => checkField(e, regexes.username, "username", "Username is invalid")}
                    error={errors.username}
                />
                <FormItem
                    type="password"
                    labelText="Password:"
                    inputText="Enter your password"
                    error={errors.password}
                    onChange={(e) => password.val = e.target.value} tooltip="Password must be at least 8 chars and include uppercase and lowercase letters, digits and special character"
                    onKeyUp={(e) => checkField(e, regexes.password, "password", "Password is invalid")}
                />
                {errors.serverError && <div className="col-12 error-message text-center">{errors.serverError}</div>}
                <FormBottom
                    button="Login"
                    subComment="Not registed?"
                    sufComment="to register"
                    link="/register"
                    onSubmit={(e) => {e.preventDefault(); tryLogin()}}
                />
            </form>
        </>
    );
}

export default Login;
