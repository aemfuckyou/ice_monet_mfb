import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import './App.css';

import Login from "./pages/Login";
import Profile from "./pages/Profile";


function App() {
    return (
        <Router>
            <div>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/login" /> } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
