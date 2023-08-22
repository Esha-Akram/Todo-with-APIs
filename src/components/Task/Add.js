import { useState } from "react";
import './Add.css';
function Add() {
    const [task, setTask] = useState("");
    return (
        <div id="add">
            <div className="container">
                <h1>Add Task</h1>
                <p>Set your daily goals</p>
                <form className="form-group">
                    <input type="text" name="task" id="task" value={task} onChange={event => setTask(event.target.value)} placeholder="e.g Study React"/>
                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default Add;