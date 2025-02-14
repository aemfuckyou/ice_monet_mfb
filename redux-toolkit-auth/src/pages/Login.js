import React, {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';


import {login} from "../app/store/auth";
import {clearMessage} from "../app/store/message";
import LoginForm from "../components/auth/LoginForm";
import '@shoelace-style/shoelace/dist/themes/light.css'; // Shoelace CSS
import '../assets/styles/main.scss';
import SlAlert from '@shoelace-style/shoelace/dist/react/alert';


const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector((state) => state.auth);
    const {message} = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const handleLogin = useCallback(async (formValues) => {
        const {username, password} = formValues;
        try {
            setLoading(true);
            // @ts-ignore
            await dispatch(login({username, password})).unwrap();
            navigate("/profile", {replace: true});
        } catch (error) {
            setLoading(false);
        }
    }, [dispatch, navigate]);


if (isLoggedIn) {
    return <Navigate to="/profile" />;

}
return (
    <div className={"login-page"}>
    <sl-card class="form-container">
     <h2 className="login-title">Login</h2>
            <LoginForm onSubmit={handleLogin} loading={loading} />
            <div className="form-group">
                 <SlAlert className="alert alert-danger" role="alert">
                    {message}
                </SlAlert>
            </div>
        </sl-card>
    </div>

);
};
export default Login;
