import React, {useCallback, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Navigate, useNavigate} from 'react-router-dom';


import {login} from "../app/store/auth";
import {clearMessage} from "../app/store/message";
import LoginForm from "../components/auth/LoginForm";

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
            console.error("Login-Fehler:", error);
            setLoading(false);
        }
    }, [dispatch, navigate]);


if (isLoggedIn) {
    return <Navigate to="/profile" />;

}
return (
    <div className="col-md-12 login-form">
        <div className="card card-container">
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile avatar"
            className="profile-img-card"
            />
            <LoginForm onSubmit={handleLogin} loading={loading} />
            <div className="form-group">
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            </div>
        </div>
    </div>
);
};
export default Login;
