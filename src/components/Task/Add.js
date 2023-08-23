import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Add.css';
import { Add_URL } from '../apiUrl/API_URL';
import Swal from 'sweetalert2';
import swal from 'sweetalert';

function Add() {
    const [task, setTask] = useState("");
    const [discription, setDiscription] = useState("");
    const userToken = localStorage.getItem('userToken');
    const Navigate = useNavigate();

    function add() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "title": task,
            "description": discription
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${Add_URL}/addtask`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    Swal.fire(
                        'Great',
                        'Task Added Succesfully!',
                        'success'
                    )
                    Navigate("/view");
                }
                else {
                    swal("Error!", result.error.message, "error");
                }

            })
            .catch(error => {
                console.log('error', error.message)
                swal(error.message, "Internet Server Down...");
            });
    }

    return (
        <div id="add">
            <div className="container">
                <h1>Add Task</h1>
                <p>Set your daily goals</p>
                <div className="form-group">
                    <input type="text" name="task" id="task" value={task} onChange={event => setTask(event.target.value)} placeholder="e.g Study React" />
                    <input type="text" name="discription" id="discription" value={discription} onChange={event => setDiscription(event.target.value)} placeholder="Discription" />
                    <button onClick={add}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Add;