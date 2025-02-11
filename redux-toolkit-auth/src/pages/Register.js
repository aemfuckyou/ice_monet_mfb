import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";

import {register} from "../app/store/auth";
import {clearMessage} from "../app/store/message";
import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
    const [success, setSuccess] = useState(false);

    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    },[dispatch]);

    const handleRegister = (formValues) => {
        const {username, email, password} = formValues;

        setSuccess(false);

        dispatch(register({username, email, password}))
            .unwrap()
            .then(() => {
                setSuccess(true);
            }).catch(() => {
                setSuccess(false);
        });
    };
    return (
        <div className="col-md-12 signup-form">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"/>
                <RegisterForm onSubmit={handleRegister} />
                {message && (
                    <div className="form-group">
                        <div className={success ? "alert alert-success" : "alert alert-danger"} role="alert">
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Register;
