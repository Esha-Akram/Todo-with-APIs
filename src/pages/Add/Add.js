import { useState } from "react";
import './styleComponents/Add.css';
import { motion } from "framer-motion";
import useCustomeHook from "../../traits/apiFunctions";

function Add() {

   const {Add, isLoading, task, discription, setTask, setDiscription } = useCustomeHook();

    return (
        <motion.div id="add"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
            <div className="container">
                <h1>Add Task</h1>
                <p>Set your daily goals</p>
                <div className="form-group">
                    <input type="text" name="task" id="task" value={task}
                        onChange={event => setTask(event.target.value)} placeholder="e.g Study React" />
                    <input type="text" name="discription" id="discription" value={discription}
                        onChange={event => setDiscription(event.target.value)} placeholder="Discription" />
                    <button onClick={() => Add()}>Save</button>
                </div>
            </div>
            <div id="loading-overlay" className={isLoading ? 'active' : ''}>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        </motion.div>
    )
}

export default Add;