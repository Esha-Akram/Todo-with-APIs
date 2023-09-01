import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Registor from '../pages/Registor/Registor';
import Login from '../pages/Login/Login';
import View from '../pages/View/View';
import Add from '../pages/Add/Add';
import { AuthRoute } from './Auth';
import { Start } from '../pages/Start/Start';
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