import { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Background from "../background/Background.js"
import FormItem from "../form/FormItem.js";
import {setCurr, isNotConnected} from '../users/user.js';
import "./Login.css"
import FormBottom from '../form/FormBottom.js';

function Login({users, setCurrentUser, currentUser}) {
    const password = useRef();
    const username = useRef();

    function tryLogin(e) {
        let flag1 = validateValue(regexes.username, username.val ? username.val : "", "username", "Username is invalid");
        let flag2 = validateValue(regexes.password, password.val ? password.val : "", "password", "Password is invalid");
        if (flag1 && flag2) {
            let isValid = false;
            for (const [, user] of Object.entries(users)) {
                if (username.val === user.username && password.val === user.password) {
                    isValid = true;
                }
            };
            // login
            if (isValid) {
                const user = users[username.val];
                setCurr(user, setCurrentUser);
                navigate('/messages');
            } else {
                setErrors(prevState => ({
                    ...prevState,
                    "password": "Password is wrong"
                }));
            }
        }
        e.preventDefault();
    }

    const regexes = {
        password: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'),
        username: new RegExp('^[a-zA-Z0-9]{6,}$')
    };

    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        if (!isNotConnected(currentUser)) {
            navigate('/messages');
        }
    }, [currentUser, navigate]);

    function validateValue(regex, value, field, error) {
        let flag = regex.test(value);
        if (!flag) {
            setErrors(prevState => ({
                ...prevState,
                [field]: error
            }));
            return false;
        } else {
            setErrors(prevState => ({
                ...prevState,
                [field]: ""
            }));
        }

        if (field === "username") {
            let exists = false;
            for (const [, user] of Object.entries(users)) {
                if (value === user.username) {
                    exists = true;
                }
            };


            if (!exists) {
                setErrors(prevState => ({
                    ...prevState,
                    [field]: "Username does not exists"
                }));
                return false;
            }
        }
        return true;
    }

    function checkField(e, regex, field, error) {
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

    return (
        <>
            <Background />
            <form className="row g-3">
                <FormItem type="text" labelText="User Name:" inputText="Enter your username" error={errors.username}
                    onChange={(e) => username.val = e.target.value} tooltip="Username must be at least 6 chars, only letters and digits"
                    onKeyUp={(e) => checkField(e, regexes.username, "username", "Username is invalid")} />
                <FormItem type="password" labelText="Password:" inputText="Enter your password" error={errors.password}
                    onChange={(e) => password.val = e.target.value} tooltip="Password must be at least 8 chars and include uppercase and lowercase letters, digits and special character"
                    onKeyUp={(e) => checkField(e, regexes.password, "password", "Password is invalid")} />
                <FormBottom button="Login" subComment="Not registed?" sufComment="to register" link="/register" onSubmit={tryLogin} />
            </form>
        </>
    );
}

export default Login;
