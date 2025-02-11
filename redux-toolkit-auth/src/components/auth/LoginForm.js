import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";


const LoginForm = ({onSubmit, loading}) => {
    const initialValues = {
       username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });


    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({errors, touched}) =>
            <Form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text" className={`form-control ${errors.username && touched.username ? "is-invalid" : ""}`} />
                    <ErrorMessage name="username" component="div" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}/>
                    <ErrorMessage name="password" component="div" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={loading}>
                         {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                        <span>Login</span>
                    </button>
                </div>
            </Form>
            }
        </Formik>
    );
};

export default LoginForm;
