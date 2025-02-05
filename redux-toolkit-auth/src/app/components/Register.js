import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = () => {
    const [success, setSuccess] = useState(false);

    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };
const validationSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            "len",
            "The username must be between 3 and 20 characters",
            (val) =>
                val && val.toString().length >= 3 && val.toString().length <= 20
        )
    .required("This field is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("This field is required"),
    password: Yup.string()
        .test(
            "len",
            "The password must be between 6 and 40 characters",
            (val) =>
                val && val.toString().length >= 6 && val.toString().length <= 40
        )
    .required("This field is required"),
});

const handleRegister = (formValue) => {
    const { username, email, password } = formValue;

    setSuccess(false);

    dispatch(register({ username, email, password }))
        .unwrap()
    .then(() => {
        setSuccess(true);
    }).catch(() =>{
        setSuccess(false);
    });
};
return (
    <div className="col-md-12 signup-form">
        <div className="card card-container">
            <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
            />
            <Formik initialValues={initialValues} onSubmit={handleRegister} validationSchema={validationSchema}>
                {({errors, touched}) => (
                    <Form>
                        {!success && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Field
                                        name="username"
                                        type="text"
                                        className={
                                        "form-control" +
                                            (errors.username && touched.username
                                            ? " is-invalid"
                                            : "")
                                        }
                                        />
                                    <ErrorMessage
                                        name="username"
                                        component="div"
                                        className="invalid-feedback"
                                        />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                    name="email"
                                    type="email"
                                    className={
                                        "form-control" +
                                        (errors.email && touched.email
                                        ? " is-invalid"
                                        : "")
                                    }/>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                        />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={
                                        "form-control" +
                                            (errors.password && touched.password ? " is-invalid"
                                            : "")
                                        }
                                        />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                        />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
        {message && (
            <div className="form-group">
                <div
                    className={
                    success ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                    >
                    {message}
                </div>
            </div>
        )}
    </div>
);
};
export default Register;
