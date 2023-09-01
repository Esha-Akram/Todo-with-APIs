import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Registor from '../pages/User/Registor';
import Login from '../pages/User/Login';
import View from '../pages/Task/View';
import Add from '../pages/Task/Add';
import { AuthRoute } from '../routes/Auth';
import { Start } from '../pages/User/Start';
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