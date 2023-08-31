import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Add.css';
import { Add_URL } from '../../components/apiUrl/API_URL';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import useFetch from "../../components/usefetch";

function Add() {
    const [task, setTask] = useState("");
    const [discription, setDiscription] = useState("");
    const userToken = localStorage.getItem('userToken');
    const Navigate = useNavigate();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `JWT ${userToken}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "title": task,
            "description": discription
        }),
        redirect: 'follow'
    };

    const { fetchApi, isLoading } = useFetch(`${Add_URL}/addtask`, requestOptions);

    function add() {
        fetchApi()
            .then(result => {
                if (result.success === true) {
                    Swal.fire(
                        'Added',
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
            <div id="loading-overlay" className={isLoading ? 'active' : ''}>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        </div>
    )
}

export default Add;