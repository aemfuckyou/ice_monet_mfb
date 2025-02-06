import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";


const RegisterForm = ({onSubmit}) => {
    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "The user name needs to be at least 3 characters long")
            .max(20,"The user name should not be longer than 20 characters")
            .required("Username is required"),
        email: Yup.string().email("Please enter a valid email address").required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .max(40, "The password should not be longer than 40 characters long")
            .required("Password is required"),
    });

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({errors, touched}) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text" className={`form-control ${errors.username && touched.username ? "is-invalid" : ""}`}/>
                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}/>
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}/>
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default RegisterForm;
