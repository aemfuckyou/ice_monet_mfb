import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import '../../assets/styles/main.scss'
import SlInput from '@shoelace-style/shoelace/dist/react/input';
import SlButton from '@shoelace-style/shoelace/dist/react/button';
import SlAlert from '@shoelace-style/shoelace/dist/react/alert';





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
                    <SlInput name="username" placeholder="Username" type="text" className={`form-control ${errors.username && touched.username ? "is-invalid" : ""}`} />
                    <SlAlert variant="primary" name="username" component="div" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                    <SlInput name="password" placeholder="Password" type="password" className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}/>
                    <SlAlert variant="primary" name="password" component="div" className="invalid-feedback"/>
                </div>
                <div className="form-group">
                    <SlButton variant="primary" className="login-btn" type="submit" disabled={loading}>
                         {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                        <span>Login</span>
                    </SlButton>
                </div>
            </Form>
            }
        </Formik>
    );
};

export default LoginForm;
