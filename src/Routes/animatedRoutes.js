import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Registor from '../pages/RegistorUser/Registor';
import Login from '../pages/LoginUser/Login';
import View from '../pages/Dashboard/View';
import Add from '../pages/AddTask/Add';
import { AuthRoute } from './Auth';
import { Start } from '../pages/GetStart/Start';
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/">
                    <Route index element={<Start />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/registor" element={<Registor />} />
                    <Route element={<AuthRoute />}>
                        <Route path="/view" element={<View />} />
                        <Route path="/add" element={<Add />} />
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;